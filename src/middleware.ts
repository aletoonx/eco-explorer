import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('auth_token')?.value
  const { pathname } = request.nextUrl

  // Pages that don't require authentication
  const publicRoutes = ['/login', '/register', '/']

  // If trying to access a public route, let them pass.
  // This prevents the redirect loop for already logged-in users.
  if (publicRoutes.includes(pathname)) {
    // But if they are logged in and try to go to login/register, send to dashboard
    if (authToken && (pathname === '/login' || pathname === '/register')) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    return NextResponse.next()
  }

  // Define protected routes
  const protectedRoutes = ['/dashboard', '/animals', '/foundations', '/map']
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  // If it's a protected route and there's no token, redirect to login
  if (isProtectedRoute && !authToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Otherwise, allow the request to proceed
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
