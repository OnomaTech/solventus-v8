# Current Authentication Issues & Solutions

## Current State

The system has two separate authentication flows:
1. Client Login (`/login`)
2. Admin Login (`/admin/login`)

Both are functional but have specific issues that need addressing.

## Immediate Issues

### 1. Admin Access to Client Dashboard
**Problem:**
- Admin users can't access client dashboard despite having permissions
- Role checking is too restrictive in DashboardLayout

**Solution:**
```typescript
// In AuthContext.tsx
const checkClientAccess = async (userId: string) => {
  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('role, permissions')
      .eq('id', userId)
      .single()

    if (error) throw error

    // Allow access if:
    // 1. User is a client OR
    // 2. User is admin with client_dashboard permission
    return profile?.role === 'client' || 
           (profile?.role === 'admin' && profile?.permissions?.includes('client_dashboard'))
  } catch (error) {
    console.error('Error checking access:', error)
    return false
  }
}
```

### 2. Session Management
**Problem:**
- Sessions don't refresh properly
- No proper handling of token expiration
- Duplicate sessions possible

**Solution:**
```typescript
// In supabase.ts
const REFRESH_THRESHOLD = 5 * 60 * 1000 // 5 minutes

export const setupSessionRefresh = () => {
  let refreshTimeout: NodeJS.Timeout

  const scheduleRefresh = (expiresAt: number) => {
    const timeUntilRefresh = expiresAt - REFRESH_THRESHOLD - Date.now()
    
    if (timeUntilRefresh <= 0) {
      supabase.auth.refreshSession()
      return
    }

    refreshTimeout = setTimeout(() => {
      supabase.auth.refreshSession()
    }, timeUntilRefresh)
  }

  supabase.auth.onAuthStateChange((event, session) => {
    clearTimeout(refreshTimeout)
    if (session?.expires_at) {
      scheduleRefresh(session.expires_at * 1000)
    }
  })
}
```

### 3. Error Handling
**Problem:**
- Generic error messages
- No proper error tracking
- Missing error boundaries

**Solution:**
```typescript
// In types/auth.ts
export enum AuthErrorCode {
  INVALID_CREDENTIALS = 'auth/invalid-credentials',
  SESSION_EXPIRED = 'auth/session-expired',
  NETWORK_ERROR = 'auth/network-error',
  PERMISSION_DENIED = 'auth/permission-denied'
}

export const AUTH_ERROR_MESSAGES = {
  [AuthErrorCode.INVALID_CREDENTIALS]: 'Invalid email or password',
  [AuthErrorCode.SESSION_EXPIRED]: 'Your session has expired. Please sign in again.',
  [AuthErrorCode.NETWORK_ERROR]: 'Unable to connect to the server. Please check your internet connection.',
  [AuthErrorCode.PERMISSION_DENIED]: 'You do not have permission to access this resource.'
}

// In components/ErrorBoundary.tsx
export class AuthErrorBoundary extends React.Component {
  state = { hasError: false, error: null }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    // Log to error tracking service
    console.error('Auth Error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <AuthErrorFallback error={this.state.error} />
    }
    return this.props.children
  }
}
```

### 4. Security Headers
**Problem:**
- Missing security headers
- CSRF vulnerability
- No CSP implementation

**Solution:**
```typescript
// In next.config.js
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()'
  }
]

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  }
}
```

## Required Changes

### 1. Database Updates
```sql
-- Add session tracking
ALTER TABLE profiles
ADD COLUMN current_session_id UUID,
ADD COLUMN last_active TIMESTAMP WITH TIME ZONE;

-- Add login tracking
CREATE TABLE login_tracking (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    session_id UUID,
    ip_address TEXT,
    user_agent TEXT,
    login_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    logout_time TIMESTAMP WITH TIME ZONE
);
```

### 2. Middleware Updates
```typescript
// In middleware.ts
export function middleware(request: NextRequest) {
  // Check for valid session
  const session = request.cookies.get('sb-access-token')
  if (!session) {
    return redirectToLogin(request)
  }

  // Rate limiting
  const ip = request.ip ?? 'unknown'
  const rateLimitResult = checkRateLimit(ip)
  if (!rateLimitResult.allowed) {
    return new Response('Too Many Requests', { status: 429 })
  }

  // Add security headers
  const response = NextResponse.next()
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  
  return response
}
```

### 3. Auth Context Updates
```typescript
// In AuthContext.tsx
interface AuthState {
  user: User | null;
  loading: boolean;
  isClient: boolean;
  permissions: string[];
  lastActive: Date | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    isClient: false,
    permissions: [],
    lastActive: null
  })

  // Add activity tracking
  useEffect(() => {
    if (state.user) {
      const updateActivity = async () => {
        await supabase
          .from('profiles')
          .update({ last_active: new Date().toISOString() })
          .eq('id', state.user.id)
      }

      const activityInterval = setInterval(updateActivity, 5 * 60 * 1000)
      return () => clearInterval(activityInterval)
    }
  }, [state.user])

  // ... rest of the provider implementation
}
```

## Next Steps

1. Implement Database Changes
   - [ ] Add new columns to profiles table
   - [ ] Create login tracking table
   - [ ] Add indexes for performance

2. Update Auth Logic
   - [ ] Implement session refresh
   - [ ] Add activity tracking
   - [ ] Improve error handling

3. Security Enhancements
   - [ ] Add security headers
   - [ ] Implement rate limiting
   - [ ] Add audit logging

4. Testing
   - [ ] Test admin access to client dashboard
   - [ ] Verify session management
   - [ ] Check error handling
   - [ ] Validate security measures

## Timeline

### Phase 1 (Immediate)
- Fix admin access to client dashboard
- Implement basic session refresh
- Add basic error handling

### Phase 2 (This Week)
- Add security headers
- Implement rate limiting
- Add activity tracking

### Phase 3 (Next Week)
- Complete database updates
- Add audit logging
- Enhance error handling
- Add comprehensive testing
