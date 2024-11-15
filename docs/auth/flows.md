# Authentication Flows & Security Measures

## Authentication Flows

### Client Login Flow
1. User enters credentials at `/login`
2. Client-side validation
   - Email format check
   - Password minimum length
   - Required fields check
3. Submit to Supabase Auth
4. On success:
   - Check user role in profiles table
   - If client or admin, allow access
   - Store session in client cookies
   - Redirect to dashboard
5. On failure:
   - Log attempt in login_attempts table
   - Show appropriate error message
   - Increment failed attempts counter
   - Check for account lockout

### Admin Login Flow
1. Admin enters credentials at `/admin/login`
2. Enhanced validation
   - Email domain check
   - Strong password requirements
   - 2FA check (to be implemented)
3. Submit to Admin Supabase instance
4. On success:
   - Verify admin role
   - Store session in admin cookies
   - Log successful admin login
   - Redirect to admin dashboard
5. On failure:
   - Log attempt with IP address
   - Enhanced security checks
   - Stricter lockout policy
   - Alert on suspicious activity

### Session Management
1. Client Sessions
   - 24-hour expiry
   - Sliding window refresh
   - Single device policy
   - Secure cookie storage

2. Admin Sessions
   - 8-hour expiry
   - No automatic refresh
   - Device tracking
   - IP-based restrictions

## Security Measures

### Password Security
1. Requirements
   - Minimum 8 characters
   - Mix of uppercase and lowercase
   - Numbers and special characters
   - No common patterns
   - No reuse of last 5 passwords

2. Storage
   - Argon2 hashing
   - Salting per password
   - No plaintext storage
   - Regular rotation policy

### Rate Limiting
1. Login Attempts
   - 5 attempts per 15 minutes
   - Progressive delays
   - IP-based tracking
   - Account lockout after 5 fails

2. API Endpoints
   - 100 requests per minute
   - Token bucket algorithm
   - Per-user quotas
   - IP-based restrictions

### Session Security
1. Token Management
   - JWT with short expiry
   - Secure cookie flags
   - HTTP-only cookies
   - Same-site strict

2. Cookie Security
   - Encrypted contents
   - Secure flag required
   - Domain restrictions
   - Path limitations

### Audit Logging
1. Login Events
   - Success/failure status
   - IP address and location
   - Device information
   - Timestamp and duration

2. Admin Actions
   - Action type and target
   - Before/after state
   - Full context capture
   - Immutable logging

## Error Handling

### Client-Side Errors
```typescript
type LoginError = {
  code: string;
  message: string;
  action?: string;
}

const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: {
    code: 'auth/invalid-credentials',
    message: 'The email or password you entered is incorrect.',
    action: 'Please check your credentials and try again.'
  },
  ACCOUNT_LOCKED: {
    code: 'auth/account-locked',
    message: 'Your account has been temporarily locked.',
    action: 'Please try again in 30 minutes or contact support.'
  },
  RATE_LIMITED: {
    code: 'auth/too-many-requests',
    message: 'Too many login attempts.',
    action: 'Please wait before trying again.'
  }
};
```

### Server-Side Errors
```typescript
enum AuthErrorCode {
  INVALID_TOKEN = 'auth/invalid-token',
  SESSION_EXPIRED = 'auth/session-expired',
  INSUFFICIENT_PERMISSIONS = 'auth/insufficient-permissions',
  ROLE_MISMATCH = 'auth/role-mismatch'
}

interface AuthError {
  code: AuthErrorCode;
  message: string;
  details?: Record<string, any>;
  timestamp: string;
}
```

## Security Headers

```typescript
// Required Security Headers
const SECURITY_HEADERS = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Content-Security-Policy': `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval';
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: https:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
  `.replace(/\s+/g, ' ').trim(),
  'Permissions-Policy': `
    accelerometer=(),
    camera=(),
    geolocation=(),
    gyroscope=(),
    magnetometer=(),
    microphone=(),
    payment=(),
    usb=()
  `.replace(/\s+/g, ' ').trim()
};
```

## Implementation Checklist

### Immediate Tasks
- [ ] Implement rate limiting
- [ ] Add security headers
- [ ] Set up audit logging
- [ ] Add account lockout
- [ ] Implement password policies

### Short-term Tasks
- [ ] Add 2FA support
- [ ] Enhance session management
- [ ] Implement IP restrictions
- [ ] Add device tracking
- [ ] Set up security alerts

### Long-term Tasks
- [ ] Add SSO support
- [ ] Implement passwordless auth
- [ ] Add biometric authentication
- [ ] Set up fraud detection
- [ ] Add compliance reporting

## Testing Requirements

### Security Testing
1. Penetration Testing
   - SQL injection
   - XSS attacks
   - CSRF attacks
   - Session hijacking

2. Authentication Testing
   - Brute force attempts
   - Session management
   - Password policies
   - Token validation

3. Authorization Testing
   - Role-based access
   - Permission checks
   - Resource isolation
   - API security

### Monitoring
1. Real-time Alerts
   - Failed login attempts
   - Suspicious activities
   - System errors
   - Performance issues

2. Audit Reports
   - Login patterns
   - User activities
   - System access
   - Security events
