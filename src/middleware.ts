import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('auth_token')?.value
  const { pathname } = request.nextUrl

  const publicRoutes = ['/login', '/register', '/']
  const isPublicRoute = publicRoutes.some(path => pathname === path || (path !== '/' && pathname.startsWith(path)))

  // If the user is authenticated and tries to access a public route, redirect to dashboard
  if (authToken && isPublicRoute && pathname !== '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // If the user is not authenticated and tries to access a protected route, redirect to login
  if (!authToken && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
