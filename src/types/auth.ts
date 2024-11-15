import { AuthError, User } from '@supabase/supabase-js'

export type UserRole = 'admin' | 'client'

export interface UserProfile {
  id: string
  email: string
  role: UserRole
  permissions: string[]
  first_name?: string
  last_name?: string
  avatar_url?: string
  last_login?: string
  failed_attempts?: number
  account_locked?: boolean
  lock_expires_at?: string
}

export interface AuthState {
  user: User | null
  profile: UserProfile | null
  loading: boolean
  isClient: boolean
  permissions: string[]
  error: AuthError | null
}

export enum AuthErrorCode {
  INVALID_CREDENTIALS = 'auth/invalid-credentials',
  SESSION_EXPIRED = 'auth/session-expired',
  NETWORK_ERROR = 'auth/network-error',
  PERMISSION_DENIED = 'auth/permission-denied',
  ACCOUNT_LOCKED = 'auth/account-locked',
  RATE_LIMITED = 'auth/rate-limited'
}

export const AUTH_ERROR_MESSAGES = {
  [AuthErrorCode.INVALID_CREDENTIALS]: 'Invalid email or password',
  [AuthErrorCode.SESSION_EXPIRED]: 'Your session has expired. Please sign in again.',
  [AuthErrorCode.NETWORK_ERROR]: 'Unable to connect to the server. Please check your internet connection.',
  [AuthErrorCode.PERMISSION_DENIED]: 'You do not have permission to access this resource.',
  [AuthErrorCode.ACCOUNT_LOCKED]: 'Your account has been temporarily locked due to too many failed attempts.',
  [AuthErrorCode.RATE_LIMITED]: 'Too many login attempts. Please try again later.'
}

export interface AuthContextType {
  user: User | null
  profile: UserProfile | null
  loading: boolean
  isClient: boolean
  permissions: string[]
  error: AuthError | null
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>
  signOut: () => Promise<void>
  hasPermission: (permission: string) => boolean
  clearError: () => void
}

// Required permissions for different features
export const PERMISSIONS = {
  CLIENT_DASHBOARD: 'client_dashboard',
  VIEW_PROFILE: 'view_profile',
  EDIT_PROFILE: 'edit_profile',
  VIEW_DOCUMENTS: 'view_documents',
  UPLOAD_DOCUMENTS: 'upload_documents',
  VIEW_MESSAGES: 'view_messages',
  SEND_MESSAGES: 'send_messages'
} as const

// Default permissions for each role
export const DEFAULT_PERMISSIONS: Record<UserRole, string[]> = {
  client: [
    PERMISSIONS.CLIENT_DASHBOARD,
    PERMISSIONS.VIEW_PROFILE,
    PERMISSIONS.EDIT_PROFILE,
    PERMISSIONS.VIEW_DOCUMENTS,
    PERMISSIONS.UPLOAD_DOCUMENTS,
    PERMISSIONS.VIEW_MESSAGES,
    PERMISSIONS.SEND_MESSAGES
  ],
  admin: [
    PERMISSIONS.CLIENT_DASHBOARD,
    PERMISSIONS.VIEW_PROFILE,
    PERMISSIONS.EDIT_PROFILE,
    PERMISSIONS.VIEW_DOCUMENTS,
    PERMISSIONS.UPLOAD_DOCUMENTS,
    PERMISSIONS.VIEW_MESSAGES,
    PERMISSIONS.SEND_MESSAGES
  ]
}

// Helper function to check if a user has a specific permission
export function checkPermission(userPermissions: string[], requiredPermission: string): boolean {
  return userPermissions.includes(requiredPermission)
}

// Helper function to get default permissions for a role
export function getDefaultPermissions(role: UserRole): string[] {
  return DEFAULT_PERMISSIONS[role] || []
}

// Helper function to format auth errors
export function formatAuthError(error: AuthError | Error): AuthError {
  if ('code' in error && '__isAuthError' in error) return error as AuthError

  // Create a proper AuthError object
  const authError: AuthError = {
    name: error.name,
    message: error.message,
    status: 500,
    code: AuthErrorCode.NETWORK_ERROR,
    __isAuthError: true
  }

  // Map specific error messages to appropriate codes
  if (error.message.includes('network')) {
    authError.code = AuthErrorCode.NETWORK_ERROR
    authError.message = AUTH_ERROR_MESSAGES[AuthErrorCode.NETWORK_ERROR]
  } else if (error.message.includes('permission')) {
    authError.code = AuthErrorCode.PERMISSION_DENIED
    authError.message = AUTH_ERROR_MESSAGES[AuthErrorCode.PERMISSION_DENIED]
  } else if (error.message.includes('locked')) {
    authError.code = AuthErrorCode.ACCOUNT_LOCKED
    authError.message = AUTH_ERROR_MESSAGES[AuthErrorCode.ACCOUNT_LOCKED]
  } else if (error.message.includes('rate')) {
    authError.code = AuthErrorCode.RATE_LIMITED
    authError.message = AUTH_ERROR_MESSAGES[AuthErrorCode.RATE_LIMITED]
  }

  return authError
}
