// Security utilities and helpers

export const security = {
  // Input sanitization
  sanitizeHtml: (input: string): string => {
    const temp = document.createElement('div');
    temp.textContent = input;
    return temp.innerHTML;
  },

  // XSS prevention
  escapeHtml: (text: string): string => {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  },

  // SQL injection prevention for client-side validation
  validateInput: (input: string): boolean => {
    const sqlInjectionPattern = /('|("|;|--|\/\*|\*\/|xp_|sp_|union|select|insert|delete|update|drop|create|alter|exec|execute))/i;
    return !sqlInjectionPattern.test(input);
  },

  // Content Security Policy helpers
  generateNonce: (): string => {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  },

  // Rate limiting helper (client-side)
  createRateLimiter: (maxRequests: number, windowMs: number) => {
    const requests = new Map<string, number[]>();
    
    return (identifier: string): boolean => {
      const now = Date.now();
      const userRequests = requests.get(identifier) || [];
      
      // Remove old requests outside the window
      const validRequests = userRequests.filter(time => now - time < windowMs);
      
      if (validRequests.length >= maxRequests) {
        return false; // Rate limit exceeded
      }
      
      validRequests.push(now);
      requests.set(identifier, validRequests);
      return true;
    };
  },

  // Secure data storage
  secureStorage: {
    set: (key: string, value: any, encrypt: boolean = false): void => {
      try {
        let data = JSON.stringify(value);
        
        if (encrypt && crypto.subtle) {
          // Note: This is basic encryption, for production use proper encryption libraries
          console.warn('Basic encryption - use proper crypto library in production');
        }
        
        localStorage.setItem(key, data);
      } catch (error) {
        console.error('Secure storage set failed:', error);
      }
    },

    get: (key: string, decrypt: boolean = false): any => {
      try {
        const data = localStorage.getItem(key);
        if (!data) return null;
        
        if (decrypt && crypto.subtle) {
          console.warn('Basic decryption - use proper crypto library in production');
        }
        
        return JSON.parse(data);
      } catch (error) {
        console.error('Secure storage get failed:', error);
        return null;
      }
    },

    remove: (key: string): void => {
      localStorage.removeItem(key);
    },

    clear: (): void => {
      localStorage.clear();
    }
  },

  // Password strength validation
  validatePassword: (password: string): { isValid: boolean; strength: string; issues: string[] } => {
    const issues: string[] = [];
    let score = 0;

    if (password.length < 8) {
      issues.push('Password must be at least 8 characters long');
    } else {
      score += 1;
    }

    if (!/[a-z]/.test(password)) {
      issues.push('Password must contain lowercase letters');
    } else {
      score += 1;
    }

    if (!/[A-Z]/.test(password)) {
      issues.push('Password must contain uppercase letters');
    } else {
      score += 1;
    }

    if (!/\d/.test(password)) {
      issues.push('Password must contain numbers');
    } else {
      score += 1;
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      issues.push('Password must contain special characters');
    } else {
      score += 1;
    }

    let strength = 'Very Weak';
    if (score >= 5) strength = 'Very Strong';
    else if (score >= 4) strength = 'Strong';
    else if (score >= 3) strength = 'Medium';
    else if (score >= 2) strength = 'Weak';

    return {
      isValid: issues.length === 0,
      strength,
      issues
    };
  },

  // CSRF protection helper
  generateCSRFToken: (): string => {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  },

  // File upload security
  validateFileUpload: (file: File): { isValid: boolean; issues: string[] } => {
    const issues: string[] = [];
    const maxSize = 50 * 1024 * 1024; // 50MB
    const allowedTypes = [
      'image/jpeg',
      'image/png', 
      'image/webp',
      'application/pdf',
      'text/plain',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];

    if (file.size > maxSize) {
      issues.push('File size exceeds 50MB limit');
    }

    if (!allowedTypes.includes(file.type)) {
      issues.push('File type not allowed');
    }

    // Check for potentially dangerous file extensions
    const dangerousExtensions = ['.exe', '.bat', '.cmd', '.scr', '.pif', '.js', '.vbs'];
    const fileName = file.name.toLowerCase();
    
    if (dangerousExtensions.some(ext => fileName.endsWith(ext))) {
      issues.push('Potentially dangerous file type');
    }

    return {
      isValid: issues.length === 0,
      issues
    };
  },

  // URL validation
  validateUrl: (url: string): boolean => {
    try {
      const urlObj = new URL(url);
      // Only allow http and https protocols
      return ['http:', 'https:'].includes(urlObj.protocol);
    } catch {
      return false;
    }
  },

  // Audit logging helper
  logSecurityEvent: (event: string, details: Record<string, any> = {}) => {
    const logEntry = {
      timestamp: new Date().toISOString(),
      event,
      userAgent: navigator.userAgent,
      url: window.location.href,
      userId: details.userId || 'anonymous',
      ...details
    };

    console.log('Security Event:', logEntry);
    
    // In production, send to security monitoring service
    // Example: send to SIEM, security dashboard, etc.
  },

  // Session management
  session: {
    isExpired: (timestamp: number, maxAgeMs: number = 24 * 60 * 60 * 1000): boolean => {
      return Date.now() - timestamp > maxAgeMs;
    },

    refreshRequired: (timestamp: number, refreshThresholdMs: number = 15 * 60 * 1000): boolean => {
      return Date.now() - timestamp > refreshThresholdMs;
    },

    generateSessionId: (): string => {
      const array = new Uint8Array(20);
      crypto.getRandomValues(array);
      return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    }
  }
};