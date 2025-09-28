/**
 * ============================================================================
 * PROPRIETARY AUTHENTICATION ROUTES
 * Copyright © 2025 DeLorenzo Property Group Pty Ltd. All Rights Reserved.
 * Sustano Pro™ - Registered Trademark - Licensed Software
 * ============================================================================
 */

const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { generateToken, generateRefreshToken, verifyRefreshToken } = require('../middleware/auth');
const { sendEmail } = require('../utils/email');

const router = express.Router();

// Validation middleware
const validateSignup = [
  body('firstName')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('First name must be between 1 and 50 characters'),
  body('lastName')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Last name must be between 1 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number'),
  body('company')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Company name must be between 1 and 100 characters'),
  body('phone')
    .optional()
    .custom((value) => {
      if (!value || value.trim() === '') return true; // Allow empty phone
      // Basic phone validation - just check it's not too short or too long
      if (value.length < 7 || value.length > 20) {
        throw new Error('Phone number must be between 7 and 20 characters');
      }
      return true;
    })
];

const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

const validatePasswordReset = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address')
];

const validatePasswordUpdate = [
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number')
];

// Helper function to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors.array()
    });
  }
  next();
};

// @route   POST /api/auth/signup
// @desc    Register a new user
// @access  Public
router.post('/signup', validateSignup, handleValidationErrors, async (req, res) => {
  try {
    const { firstName, lastName, email, password, company, phone } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'User already exists',
        message: 'An account with this email address already exists'
      });
    }

    // Create new user
    const user = new User({
      firstName,
      lastName,
      email,
      password,
      company,
      phone
    });

    // Generate email verification token
    const verificationToken = user.generateEmailVerificationToken();
    await user.save();

    // Generate tokens
    const token = generateToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Add refresh token to user
    await user.addRefreshToken(refreshToken);

    // Send verification email (optional - can be done asynchronously)
    try {
      await sendEmail({
        to: user.email,
        subject: 'Welcome to Sustano Pro - Verify Your Email',
        template: 'emailVerification',
        data: {
          firstName: user.firstName,
          verificationToken,
          verificationUrl: `${process.env.FRONTEND_URL}/auth/verify-email?token=${verificationToken}`
        }
      });
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);
      // Don't fail the signup if email fails
    }

    // Remove sensitive data from response
    const userResponse = user.toObject();
    delete userResponse.password;
    delete userResponse.emailVerificationToken;
    delete userResponse.emailVerificationExpires;
    delete userResponse.passwordResetToken;
    delete userResponse.passwordResetExpires;
    delete userResponse.refreshTokens;

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: userResponse,
        token,
        refreshToken
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      error: 'Registration failed',
      message: 'An error occurred during registration'
    });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user and get token
// @access  Public
router.post('/login', validateLogin, handleValidationErrors, async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;

    // Find user with password
    const user = await User.findByEmailWithPassword(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials',
        message: 'Email or password is incorrect'
      });
    }

    // Check if account is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        error: 'Account deactivated',
        message: 'Your account has been deactivated. Please contact support.'
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials',
        message: 'Email or password is incorrect'
      });
    }

    // Update last login and login count
    user.lastLogin = new Date();
    user.loginCount += 1;
    await user.save();

    // Generate tokens
    const token = generateToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Add refresh token to user
    await user.addRefreshToken(refreshToken);

    // Remove sensitive data from response
    const userResponse = user.toObject();
    delete userResponse.password;
    delete userResponse.emailVerificationToken;
    delete userResponse.emailVerificationExpires;
    delete userResponse.passwordResetToken;
    delete userResponse.passwordResetExpires;
    delete userResponse.refreshTokens;

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: userResponse,
        token,
        refreshToken
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Login failed',
      message: 'An error occurred during login'
    });
  }
});

// @route   POST /api/auth/refresh
// @desc    Refresh access token
// @access  Public
router.post('/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        error: 'Refresh token required',
        message: 'Please provide a refresh token'
      });
    }

    // Verify refresh token
    const decoded = verifyRefreshToken(refreshToken);
    
    // Find user
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid refresh token',
        message: 'User not found'
      });
    }

    // Check if refresh token exists in user's tokens
    const tokenExists = user.refreshTokens.some(rt => rt.token === refreshToken);
    if (!tokenExists) {
      return res.status(401).json({
        success: false,
        error: 'Invalid refresh token',
        message: 'Refresh token not found'
      });
    }

    // Generate new tokens
    const newToken = generateToken(user._id);
    const newRefreshToken = generateRefreshToken(user._id);

    // Remove old refresh token and add new one
    await user.removeRefreshToken(refreshToken);
    await user.addRefreshToken(newRefreshToken);

    res.json({
      success: true,
      message: 'Token refreshed successfully',
      data: {
        token: newToken,
        refreshToken: newRefreshToken
      }
    });
  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(401).json({
      success: false,
      error: 'Token refresh failed',
      message: 'Invalid or expired refresh token'
    });
  }
});

// @route   POST /api/auth/logout
// @desc    Logout user (invalidate refresh token)
// @access  Private
router.post('/logout', async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (refreshToken) {
      // Find user by refresh token and remove it
      const user = await User.findOne({
        'refreshTokens.token': refreshToken
      });

      if (user) {
        await user.removeRefreshToken(refreshToken);
      }
    }

    res.json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      error: 'Logout failed',
      message: 'An error occurred during logout'
    });
  }
});

// @route   POST /api/auth/forgot-password
// @desc    Send password reset email
// @access  Public
router.post('/forgot-password', validatePasswordReset, handleValidationErrors, async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      // Don't reveal if email exists or not
      return res.json({
        success: true,
        message: 'If an account with that email exists, a password reset link has been sent'
      });
    }

    // Generate password reset token
    const resetToken = user.generatePasswordResetToken();
    await user.save();

    // Send password reset email
    try {
      await sendEmail({
        to: user.email,
        subject: 'Sustano Pro - Password Reset Request',
        template: 'passwordReset',
        data: {
          firstName: user.firstName,
          resetToken,
          resetUrl: `${process.env.FRONTEND_URL}/auth/reset-password?token=${resetToken}`
        }
      });
    } catch (emailError) {
      console.error('Failed to send password reset email:', emailError);
      return res.status(500).json({
        success: false,
        error: 'Email sending failed',
        message: 'Failed to send password reset email'
      });
    }

    res.json({
      success: true,
      message: 'If an account with that email exists, a password reset link has been sent'
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      error: 'Password reset failed',
      message: 'An error occurred while processing your request'
    });
  }
});

// @route   POST /api/auth/reset-password
// @desc    Reset password with token
// @access  Public
router.post('/reset-password', validatePasswordUpdate, handleValidationErrors, async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        error: 'Token required',
        message: 'Password reset token is required'
      });
    }

    // Find user by reset token
    const user = await User.findByPasswordResetToken(token);
    if (!user) {
      return res.status(400).json({
        success: false,
        error: 'Invalid or expired token',
        message: 'Password reset token is invalid or has expired'
      });
    }

    // Update password
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    res.json({
      success: true,
      message: 'Password reset successfully'
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      error: 'Password reset failed',
      message: 'An error occurred while resetting your password'
    });
  }
});

// @route   GET /api/auth/verify-email/:token
// @desc    Verify email address
// @access  Public
router.get('/verify-email/:token', async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findByEmailVerificationToken(token);
    if (!user) {
      return res.status(400).json({
        success: false,
        error: 'Invalid or expired token',
        message: 'Email verification token is invalid or has expired'
      });
    }

    // Mark email as verified
    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    res.json({
      success: true,
      message: 'Email verified successfully'
    });
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({
      success: false,
      error: 'Email verification failed',
      message: 'An error occurred while verifying your email'
    });
  }
});

module.exports = router;
