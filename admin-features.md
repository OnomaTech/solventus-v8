# Authentication System Documentation

## Overview

The application uses a dual authentication system to handle both admin and client users, with separate contexts and layouts for each type of user.

## Core Components

### Authentication Contexts
1. `AuthContext` (`src/contexts/AuthContext.tsx`)
   - Handles client-side authentication
   - Manages client dashboard access
   - Provides user state and auth methods
   - Uses client-side Supabase instance

2. `AdminAuthContext` (`src/contexts/AdminAuthContext.tsx`)
   - Handles admin-side authentication
   - Manages admin dashboard access
   - Uses admin-specific Supabase instance

### Supabase Instances
1. `supabase.ts` (Client)
   - Uses PKCE flow
   - Client-side cookie storage
   - Public API key

2. `adminSupabase.ts` (Admin)
   - Service role access
   - Admin-specific cookie storage
   - Service role API key

### Layouts
1. `DashboardLayout` (Client)
   - Basic auth protection
   - Redirects to login if not authenticated
   - Used for client dashboard

2. `AdminLayout` (Admin)
   - Admin role verification
   - Admin-specific navigation
   - Used for admin dashboard

### Database Schema

#### Profiles Table
```sql
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT NOT NULL,
    role user_role NOT NULL DEFAULT 'client'::user_role,
    permissions TEXT[] DEFAULT '{}',
    first_name TEXT,
    last_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(email)
);
```

## Current Issues & Tasks

### Login System Issues

#### Client Login (`/login`)
1. Error Handling
   - [ ] Improve error messages for network failures
   - [ ] Add rate limiting for failed attempts
   - [ ] Add password reset functionality
   - [ ] Add "Remember me" functionality

2. Session Management
   - [ ] Add proper session refresh mechanism
   - [ ] Handle token expiration gracefully
   - [ ] Add session timeout warning

3. Security
   - [ ] Add CSRF protection
   - [ ] Add brute force protection
   - [ ] Add IP-based rate limiting
   - [ ] Add audit logging for login attempts

#### Admin Login (`/admin/login`)
1. Error Handling
   - [ ] More specific error messages needed
   - [ ] Add password complexity validation
   - [ ] Add 2FA support
   - [ ] Add IP whitelist support

2. Session Management
   - [ ] Add shorter session timeouts for admin
   - [ ] Add session activity tracking
   - [ ] Add concurrent session handling

3. Security
   - [ ] Add admin-specific rate limiting
   - [ ] Add enhanced audit logging
   - [ ] Add security headers
   - [ ] Add admin action logging

### Authentication Flow Issues

1. Client Dashboard Access
   - [ ] Fix admin access to client dashboard
   - [ ] Add proper role checking
   - [ ] Add permission-based access control
   - [ ] Add proper error messages for access denial

2. Admin Dashboard Access
   - [ ] Add role verification middleware
   - [ ] Add permission checks for admin actions
   - [ ] Add audit logging for admin actions
   - [ ] Add activity monitoring

### Required Database Updates

1. Profiles Table
   - [ ] Add indexes for email and role columns
   - [ ] Add last_login timestamp
   - [ ] Add failed_attempts counter
   - [ ] Add account_locked boolean

2. New Tables Needed
   - [ ] Login_Attempts (for rate limiting)
   - [ ] Audit_Logs (for security tracking)
   - [ ] Sessions (for better session management)
   - [ ] Admin_Actions (for admin activity logging)

### Code Structure Issues

1. Client Authentication
   - [ ] Separate auth logic from UI components
   - [ ] Add proper TypeScript types
   - [ ] Add error boundaries
   - [ ] Add loading states

2. Admin Authentication
   - [ ] Improve code organization
   - [ ] Add proper type checking
   - [ ] Add error handling utilities
   - [ ] Add loading indicators

## File Structure
```
src/
├── contexts/
│   ├── AuthContext.tsx       # Client auth context
│   └── AdminAuthContext.tsx  # Admin auth context
├── components/
│   ├── DashboardLayout.tsx  # Client layout
│   └── admin/
│       └── AdminLayout.tsx  # Admin layout
├── lib/
│   ├── supabase.ts         # Client Supabase
│   └── adminSupabase.ts    # Admin Supabase
├── pages/
│   ├── login.tsx           # Client login
│   ├── dashboard.tsx       # Client dashboard
│   └── admin/
│       ├── login.tsx       # Admin login
│       └── index.tsx       # Admin dashboard
└── middleware.ts           # Route protection
```

## Immediate Action Items

1. Authentication
   - [ ] Fix admin access to client dashboard
   - [ ] Add proper session refresh
   - [ ] Add proper error handling
   - [ ] Add security headers

2. Authorization
   - [ ] Implement proper role checks
   - [ ] Add permission system
   - [ ] Add audit logging
   - [ ] Add rate limiting

3. Security
   - [ ] Add CSRF protection
   - [ ] Add brute force protection
   - [ ] Add proper password policies
   - [ ] Add 2FA support

4. User Experience
   - [ ] Add better loading states
   - [ ] Improve error messages
   - [ ] Add password reset flow
   - [ ] Add email verification

## Next Steps

1. Database Updates
   - Create new tables for audit logging
   - Add indexes for performance
   - Add constraints for data integrity

2. Security Enhancements
   - Implement rate limiting
   - Add security headers
   - Add IP-based restrictions
   - Add audit logging

3. Code Improvements
   - Add TypeScript types
   - Add error boundaries
   - Add loading states
   - Improve code organization

4. Testing
   - Add unit tests
   - Add integration tests
   - Add E2E tests
   - Add security tests
