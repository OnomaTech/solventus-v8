import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Only check admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Don't check the admin login page itself
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next()
    }

    const token = request.cookies.get('auth-token')?.value
    if (!token) {
      // Redirect to admin login page if not authenticated
      const loginUrl = new URL('/admin/login', request.url)
      // Add the original URL as a redirect parameter
      loginUrl.searchParams.set('redirect', request.nextUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  // Only run middleware on admin routes
  matcher: ['/admin/:path*']
}
