import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('auth_token')?.value
  const { pathname } = request.nextUrl

  const publicRoutes = ['/login', '/register', '/']
  const isPublicRoute = publicRoutes.includes(pathname)

  // If it's a public route, let them through.
  if (isPublicRoute) {
    return NextResponse.next()
  }

  // If it's a protected route and there is no token, redirect to login.
  if (!authToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Otherwise, let them through to the protected route.
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
