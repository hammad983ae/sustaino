# Sustano Pro Authentication Backend

A Node.js backend for the Sustano Pro property valuation platform with MongoDB and JWT authentication.

## Features

- 🔐 JWT-based authentication with refresh tokens
- 📧 Email verification and password reset
- 🛡️ Security middleware (helmet, rate limiting, CORS)
- 📊 User management and profile system
- 🎨 Email templates for notifications
- 🔒 Role-based access control
- 📱 Subscription management

## Quick Start

### Prerequisites

- Node.js 18+ 
- MongoDB 6+
- Resend account and API key

### Installation

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   # Server Configuration
   PORT=3001
   NODE_ENV=development
   
   # MongoDB Configuration
   MONGODB_URI=mongodb://localhost:27017/sustano-pro
   
   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
   JWT_EXPIRES_IN=7d
   JWT_REFRESH_EXPIRES_IN=30d
   
   # Email Configuration (Resend)
   RESEND_API_KEY=re_HpUdMD8J_B8BRK6RMc3wp7RbzjfzHBcjd
   EMAIL_FROM=noreply@sustanopro.com
   
   # Frontend URL
   FRONTEND_URL=http://localhost:8081
   ```

3. **Start MongoDB:**
   ```bash
   # Using Docker
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   
   # Or using local installation
   mongod
   ```

4. **Start the server:**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

The server will start on `http://localhost:3001`

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - User logout
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token
- `GET /api/auth/verify-email/:token` - Verify email address

### User Management

- `GET /api/user/profile` - Get current user profile
- `PUT /api/user/profile` - Update user profile
- `PUT /api/user/change-password` - Change password
- `POST /api/user/resend-verification` - Resend email verification
- `GET /api/user/stats` - Get user statistics
- `DELETE /api/user/account` - Delete user account

### Admin Routes

- `GET /api/user/admin/users` - Get all users (admin only)
- `PUT /api/user/admin/users/:id` - Update user (admin only)

## Database Schema

### User Model

```javascript
{
  firstName: String,
  lastName: String,
  email: String (unique),
  password: String (hashed),
  company: String,
  phone: String,
  isEmailVerified: Boolean,
  isActive: Boolean,
  role: String (user/admin/premium),
  subscription: {
    plan: String,
    status: String,
    startDate: Date,
    endDate: Date
  },
  preferences: {
    theme: String,
    notifications: Object
  },
  createdAt: Date,
  updatedAt: Date
}
```

## Security Features

- **Password Hashing**: bcrypt with configurable rounds
- **JWT Tokens**: Access and refresh token system
- **Rate Limiting**: Configurable request limits
- **CORS**: Cross-origin resource sharing protection
- **Helmet**: Security headers
- **Input Validation**: express-validator for request validation
- **Email Verification**: Required for account activation

## Email Templates

The system includes HTML email templates for:

- Email verification
- Password reset
- Welcome messages

Templates are located in `utils/email.js` and can be customized.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 3001 |
| `NODE_ENV` | Environment | development |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/sustano-pro |
| `JWT_SECRET` | JWT signing secret | Required |
| `JWT_EXPIRES_IN` | Access token expiry | 7d |
| `JWT_REFRESH_EXPIRES_IN` | Refresh token expiry | 30d |
| `RESEND_API_KEY` | Resend API key | Required |
| `EMAIL_FROM` | From email address | Required |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:8081 |
| `BCRYPT_ROUNDS` | Password hashing rounds | 12 |

## Development

### Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests

### Project Structure

```
backend/
├── models/          # MongoDB models
├── routes/          # API routes
├── middleware/      # Express middleware
├── utils/           # Utility functions
├── server.js        # Main server file
├── package.json     # Dependencies
└── README.md        # This file
```

## Production Deployment

1. **Set environment variables** for production
2. **Use a process manager** like PM2:
   ```bash
   npm install -g pm2
   pm2 start server.js --name "sustano-pro-backend"
   ```
3. **Set up reverse proxy** with Nginx
4. **Enable HTTPS** with SSL certificates
5. **Set up monitoring** and logging

## License

Proprietary - © 2025 DeLorenzo Property Group Pty Ltd. All Rights Reserved.

## Support

For technical support, contact the development team.
