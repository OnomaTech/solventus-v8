import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Public routes that don't require authentication
const publicPaths = new Set([
  '/',
  '/login',
  '/admin/login',
  '/about',
  '/contact',
  '/services',
  '/blog'
])

// Helper to check if a path is public
const isPublicPath = (path: string) => {
  return publicPaths.has(path) || 
    path.startsWith('/_next') || 
    path.startsWith('/static') || 
    path.startsWith('/api/') ||
    path.includes('.')
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow public paths
  if (isPublicPath(pathname)) {
    return NextResponse.next()
  }

  // Check for auth cookie
  const authCookie = request.cookies.get('sb-access-token')

  // If no auth cookie and trying to access protected route, redirect to login
  if (!authCookie) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(url)
  }

  // Allow access to protected routes if auth cookie exists
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
