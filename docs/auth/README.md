# Authentication System Documentation

## Overview

This directory contains documentation for the dual authentication system used in Solventus CRM. The system handles both client and admin users with separate authentication flows and security measures.

## Documentation Structure

1. [Schema](./schema.md)
   - Database tables and structure
   - SQL migrations and updates
   - RLS policies and permissions

2. [Flows](./flows.md)
   - Authentication flows
   - Security measures
   - Error handling
   - Session management

3. [Current Issues](./current-issues.md)
   - Known issues and solutions
   - Required changes
   - Implementation timeline
   - Testing requirements

## Quick Start

### Client Authentication
```typescript
// Using client auth
import { useAuth } from '../contexts/AuthContext'

function ClientComponent() {
  const { user, signIn, signOut } = useAuth()
  // ... component logic
}
```

### Admin Authentication
```typescript
// Using admin auth
import { useAdminAuth } from '../contexts/AdminAuthContext'

function AdminComponent() {
  const { user, signIn, signOut, isAdmin } = useAdminAuth()
  // ... component logic
}
```

## Current Status

### Working Features
- Basic client authentication
- Basic admin authentication
- Role-based access control
- Session management
- Login/logout functionality

### Known Issues
1. Admin Access to Client Dashboard
   - Admins can't access client dashboard
   - Role checking too restrictive

2. Session Management
   - No proper session refresh
   - Token expiration issues
   - Duplicate sessions possible

3. Security
   - Missing security headers
   - CSRF vulnerability
   - Basic error handling

## Immediate Tasks

### Phase 1 (Critical)
- [ ] Fix admin access to client dashboard
- [ ] Implement session refresh
- [ ] Add security headers

### Phase 2 (Important)
- [ ] Add rate limiting
- [ ] Improve error handling
- [ ] Add audit logging

### Phase 3 (Enhancement)
- [ ] Add 2FA support
- [ ] Implement passwordless auth
- [ ] Add device tracking

## Development Guidelines

### Adding New Features
1. Update schema if needed
2. Add necessary types
3. Implement changes
4. Add tests
5. Update documentation

### Security Considerations
1. Always use HTTPS
2. Implement proper validation
3. Use secure session storage
4. Add audit logging
5. Follow security best practices

### Testing Requirements
1. Unit tests for auth functions
2. Integration tests for flows
3. Security testing
4. Performance testing

## File Structure
```
auth/
├── README.md           # This file
├── schema.md          # Database schema
├── flows.md           # Auth flows
└── current-issues.md  # Known issues
```

## Related Files

### Core Authentication
- `src/contexts/AuthContext.tsx`
- `src/contexts/AdminAuthContext.tsx`
- `src/lib/supabase.ts`
- `src/lib/adminSupabase.ts`

### Components
- `src/components/DashboardLayout.tsx`
- `src/components/admin/AdminLayout.tsx`

### Pages
- `src/pages/login.tsx`
- `src/pages/admin/login.tsx`

### API Routes
- `src/pages/api/create-admin.ts`
- `src/pages/api/check-admin.ts`

### Scripts
- `scripts/setup-db.js`
- `scripts/create-admin.js`
- `scripts/update-admin-permissions.js`

## Contributing

1. Check current issues in `current-issues.md`
2. Follow security guidelines
3. Update documentation
4. Add tests
5. Submit PR

## Resources

1. [Supabase Auth Docs](https://supabase.io/docs/guides/auth)
2. [Next.js Auth Patterns](https://nextjs.org/docs/authentication)
3. [Security Best Practices](https://owasp.org/www-project-top-ten/)
4. [TypeScript Auth Patterns](https://typescript-auth-patterns.com)

## Support

For issues related to:
- Client Auth: Check `AuthContext.tsx`
- Admin Auth: Check `AdminAuthContext.tsx`
- Database: Check `schema.md`
- Security: Check `flows.md`

## Next Steps

1. Review `current-issues.md`
2. Implement critical fixes
3. Add security enhancements
4. Improve documentation
5. Add comprehensive testing
