/**
 * ============================================================================
 * PROPRIETARY EMAIL UTILITY
 * Copyright © 2025 DeLorenzo Property Group Pty Ltd. All Rights Reserved.
 * Sustano Pro™ - Registered Trademark - Licensed Software
 * ============================================================================
 */

const { Resend } = require('resend');

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Email templates
const templates = {
  emailVerification: (data) => ({
    subject: 'Welcome to Sustano Pro - Verify Your Email',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification - Sustano Pro</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Sustano Pro</h1>
            <p>ICV Platform - Revolutionary Property Intelligence</p>
          </div>
          <div class="content">
            <h2>Welcome ${data.firstName}!</h2>
            <p>Thank you for registering with Sustano Pro. To complete your registration and start using our revolutionary property valuation platform, please verify your email address.</p>
            <p>Click the button below to verify your email:</p>
            <a href="${data.verificationUrl}" class="button">Verify Email Address</a>
            <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
            <p><a href="${data.verificationUrl}">${data.verificationUrl}</a></p>
            <p>This verification link will expire in 24 hours.</p>
            <p>If you didn't create an account with Sustano Pro, please ignore this email.</p>
          </div>
          <div class="footer">
            <p>© 2025 DeLorenzo Property Group Pty Ltd. All Rights Reserved.</p>
            <p>Patent Pending • IP Protected • Trademark © • Copyright Protected</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Welcome ${data.firstName}!
      
      Thank you for registering with Sustano Pro. To complete your registration and start using our revolutionary property valuation platform, please verify your email address.
      
      Click this link to verify your email: ${data.verificationUrl}
      
      This verification link will expire in 24 hours.
      
      If you didn't create an account with Sustano Pro, please ignore this email.
      
      © 2025 DeLorenzo Property Group Pty Ltd. All Rights Reserved.
    `
  }),

  passwordReset: (data) => ({
    subject: 'Sustano Pro - Password Reset Request',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset - Sustano Pro</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
          .warning { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Sustano Pro</h1>
            <p>ICV Platform - Revolutionary Property Intelligence</p>
          </div>
          <div class="content">
            <h2>Password Reset Request</h2>
            <p>Hello ${data.firstName},</p>
            <p>We received a request to reset your password for your Sustano Pro account.</p>
            <p>Click the button below to reset your password:</p>
            <a href="${data.resetUrl}" class="button">Reset Password</a>
            <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
            <p><a href="${data.resetUrl}">${data.resetUrl}</a></p>
            <div class="warning">
              <strong>Important:</strong> This password reset link will expire in 10 minutes for security reasons.
            </div>
            <p>If you didn't request a password reset, please ignore this email. Your password will remain unchanged.</p>
            <p>For security reasons, we recommend using a strong password with a combination of letters, numbers, and special characters.</p>
          </div>
          <div class="footer">
            <p>© 2025 DeLorenzo Property Group Pty Ltd. All Rights Reserved.</p>
            <p>Patent Pending • IP Protected • Trademark © • Copyright Protected</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Password Reset Request
      
      Hello ${data.firstName},
      
      We received a request to reset your password for your Sustano Pro account.
      
      Click this link to reset your password: ${data.resetUrl}
      
      This password reset link will expire in 10 minutes for security reasons.
      
      If you didn't request a password reset, please ignore this email. Your password will remain unchanged.
      
      For security reasons, we recommend using a strong password with a combination of letters, numbers, and special characters.
      
      © 2025 DeLorenzo Property Group Pty Ltd. All Rights Reserved.
    `
  }),

  welcome: (data) => ({
    subject: 'Welcome to Sustano Pro - Your Account is Ready!',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome - Sustano Pro</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
          .feature { background: white; padding: 15px; margin: 10px 0; border-radius: 5px; border-left: 4px solid #667eea; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Sustano Pro</h1>
            <p>ICV Platform - Revolutionary Property Intelligence</p>
          </div>
          <div class="content">
            <h2>Welcome to Sustano Pro, ${data.firstName}!</h2>
            <p>Your account has been successfully created and verified. You now have access to our revolutionary property valuation platform.</p>
            
            <h3>What you can do with Sustano Pro:</h3>
            <div class="feature">
              <strong>🌱 ESG Integration:</strong> Comprehensive sustainability scoring for properties
            </div>
            <div class="feature">
              <strong>📊 AI Analytics:</strong> Advanced property valuation with machine learning
            </div>
            <div class="feature">
              <strong>⚡ Blockchain Ready:</strong> Secure, transparent property transactions
            </div>
            <div class="feature">
              <strong>🏆 Patent Protected:</strong> Industry-leading intellectual property
            </div>
            
            <p>Ready to get started? Log in to your dashboard and begin your first property valuation.</p>
            <a href="${process.env.FRONTEND_URL}/dashboard" class="button">Access Dashboard</a>
            
            <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
          </div>
          <div class="footer">
            <p>© 2025 DeLorenzo Property Group Pty Ltd. All Rights Reserved.</p>
            <p>Patent Pending • IP Protected • Trademark © • Copyright Protected</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Welcome to Sustano Pro, ${data.firstName}!
      
      Your account has been successfully created and verified. You now have access to our revolutionary property valuation platform.
      
      What you can do with Sustano Pro:
      • ESG Integration: Comprehensive sustainability scoring for properties
      • AI Analytics: Advanced property valuation with machine learning
      • Blockchain Ready: Secure, transparent property transactions
      • Patent Protected: Industry-leading intellectual property
      
      Ready to get started? Log in to your dashboard and begin your first property valuation.
      
      Dashboard: ${process.env.FRONTEND_URL}/dashboard
      
      If you have any questions or need assistance, please don't hesitate to contact our support team.
      
      © 2025 DeLorenzo Property Group Pty Ltd. All Rights Reserved.
    `
  })
};

// Send email function
const sendEmail = async ({ to, subject, template, data }) => {
  try {
    // Get template
    const emailTemplate = templates[template];
    if (!emailTemplate) {
      throw new Error(`Email template '${template}' not found`);
    }
    
    // Generate email content
    const emailContent = emailTemplate(data);
    
    // Send email using Resend
    const result = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Sustano Pro <noreply@sustanopro.com>',
      to: [to],
      subject: subject || emailContent.subject,
      html: emailContent.html,
      text: emailContent.text
    });
    
    console.log('Email sent successfully:', result.data?.id);
    return result;
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
};

// Test email configuration
const testEmailConfig = async () => {
  try {
    // Test Resend API key by sending a test email
    const result = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Sustano Pro <noreply@sustanopro.com>',
      to: ['test@example.com'],
      subject: 'Test Email - Sustano Pro',
      html: '<p>This is a test email to verify Resend configuration.</p>'
    });
    
    console.log('✅ Resend configuration is valid');
    return true;
  } catch (error) {
    console.error('❌ Resend configuration error:', error);
    return false;
  }
};

module.exports = {
  sendEmail,
  testEmailConfig,
  templates
};
