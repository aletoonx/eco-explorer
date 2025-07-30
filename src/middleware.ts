import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const sessionToken = request.cookies.get('firebase-session')

  const protectedRoutes = ['/dashboard', '/map', '/animals', '/foundations']
  const publicRoutes = ['/login', '/register', '/']

  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  const isPublicRoute = publicRoutes.includes(pathname)

  if (isProtectedRoute && !sessionToken) {
    // Si intenta acceder a una ruta protegida sin sesión, redirigir a login
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  if (isPublicRoute && sessionToken) {
    // Si tiene sesión e intenta acceder a login, register o la landing, redirigir al dashboard
    const dashboardUrl = new URL('/dashboard', request.url)
    return NextResponse.redirect(dashboardUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
