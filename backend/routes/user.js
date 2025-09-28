/**
 * ============================================================================
 * PROPRIETARY USER ROUTES
 * Copyright © 2025 DeLorenzo Property Group Pty Ltd. All Rights Reserved.
 * Sustano Pro™ - Registered Trademark - Licensed Software
 * ============================================================================
 */

const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { requireRole, requireSubscription } = require('../middleware/auth');

const router = express.Router();

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

// @route   GET /api/user/profile
// @desc    Get current user profile
// @access  Private
router.get('/profile', async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password -refreshTokens');
    
    res.json({
      success: true,
      data: { user }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get profile',
      message: 'An error occurred while fetching your profile'
    });
  }
});

// @route   PUT /api/user/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', [
  body('firstName')
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('First name must be between 1 and 50 characters'),
  body('lastName')
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Last name must be between 1 and 50 characters'),
  body('company')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Company name must be between 1 and 100 characters'),
  body('phone')
    .optional()
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),
  handleValidationErrors
], async (req, res) => {
  try {
    const { firstName, lastName, company, phone, preferences } = req.body;
    
    const user = await User.findById(req.user._id);
    
    // Update allowed fields
    if (firstName !== undefined) user.firstName = firstName;
    if (lastName !== undefined) user.lastName = lastName;
    if (company !== undefined) user.company = company;
    if (phone !== undefined) user.phone = phone;
    if (preferences !== undefined) {
      user.preferences = { ...user.preferences, ...preferences };
    }
    
    await user.save();
    
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
      message: 'Profile updated successfully',
      data: { user: userResponse }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update profile',
      message: 'An error occurred while updating your profile'
    });
  }
});

// @route   PUT /api/user/change-password
// @desc    Change user password
// @access  Private
router.put('/change-password', [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 8 })
    .withMessage('New password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('New password must contain at least one lowercase letter, one uppercase letter, and one number'),
  handleValidationErrors
], async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    // Get user with password
    const user = await User.findById(req.user._id).select('+password');
    
    // Check current password
    const isCurrentPasswordValid = await user.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        success: false,
        error: 'Invalid current password',
        message: 'The current password you entered is incorrect'
      });
    }
    
    // Update password
    user.password = newPassword;
    await user.save();
    
    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to change password',
      message: 'An error occurred while changing your password'
    });
  }
});

// @route   POST /api/user/resend-verification
// @desc    Resend email verification
// @access  Private
router.post('/resend-verification', async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (user.isEmailVerified) {
      return res.status(400).json({
        success: false,
        error: 'Email already verified',
        message: 'Your email address is already verified'
      });
    }
    
    // Generate new verification token
    const verificationToken = user.generateEmailVerificationToken();
    await user.save();
    
    // Send verification email
    try {
      const { sendEmail } = require('../utils/email');
      await sendEmail({
        to: user.email,
        subject: 'Sustano Pro - Verify Your Email',
        template: 'emailVerification',
        data: {
          firstName: user.firstName,
          verificationToken,
          verificationUrl: `${process.env.FRONTEND_URL}/auth/verify-email?token=${verificationToken}`
        }
      });
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);
      return res.status(500).json({
        success: false,
        error: 'Email sending failed',
        message: 'Failed to send verification email'
      });
    }
    
    res.json({
      success: true,
      message: 'Verification email sent successfully'
    });
  } catch (error) {
    console.error('Resend verification error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to resend verification',
      message: 'An error occurred while sending the verification email'
    });
  }
});

// @route   GET /api/user/stats
// @desc    Get user statistics
// @access  Private
router.get('/stats', async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    const stats = {
      accountCreated: user.createdAt,
      lastLogin: user.lastLogin,
      loginCount: user.loginCount,
      emailVerified: user.isEmailVerified,
      subscription: user.subscription,
      role: user.role
    };
    
    res.json({
      success: true,
      data: { stats }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get statistics',
      message: 'An error occurred while fetching your statistics'
    });
  }
});

// @route   DELETE /api/user/account
// @desc    Delete user account
// @access  Private
router.delete('/account', [
  body('password')
    .notEmpty()
    .withMessage('Password is required to delete account'),
  handleValidationErrors
], async (req, res) => {
  try {
    const { password } = req.body;
    
    // Get user with password
    const user = await User.findById(req.user._id).select('+password');
    
    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        error: 'Invalid password',
        message: 'The password you entered is incorrect'
      });
    }
    
    // Delete user account
    await User.findByIdAndDelete(req.user._id);
    
    res.json({
      success: true,
      message: 'Account deleted successfully'
    });
  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete account',
      message: 'An error occurred while deleting your account'
    });
  }
});

// Admin routes
// @route   GET /api/user/admin/users
// @desc    Get all users (admin only)
// @access  Private (Admin)
router.get('/admin/users', requireRole('admin'), async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const users = await User.find()
      .select('-password -refreshTokens -emailVerificationToken -passwordResetToken')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await User.countDocuments();
    
    res.json({
      success: true,
      data: {
        users,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get users',
      message: 'An error occurred while fetching users'
    });
  }
});

// @route   PUT /api/user/admin/users/:id
// @desc    Update user (admin only)
// @access  Private (Admin)
router.put('/admin/users/:id', requireRole('admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { role, isActive, subscription } = req.body;
    
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
        message: 'The specified user does not exist'
      });
    }
    
    // Update allowed fields
    if (role !== undefined) user.role = role;
    if (isActive !== undefined) user.isActive = isActive;
    if (subscription !== undefined) {
      user.subscription = { ...user.subscription, ...subscription };
    }
    
    await user.save();
    
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
      message: 'User updated successfully',
      data: { user: userResponse }
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update user',
      message: 'An error occurred while updating the user'
    });
  }
});

module.exports = router;
