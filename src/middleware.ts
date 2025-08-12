import { type NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/map", "/animals", "/foundations"];
const authRoutes = ["/login", "/register"];
const SESSION_COOKIE_NAME = "eco-explorer-session";

export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME);
  const { pathname } = request.nextUrl;

  const isProtectedRoute = 
    protectedRoutes.some(route => pathname.startsWith(route));
  
  const isAuthRoute = authRoutes.includes(pathname);

  // Si intenta acceder a una ruta protegida y no tiene cookie, redirigir a login
  if (isProtectedRoute && !sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Si tiene cookie y visita una ruta de autenticación o la página de inicio, redirigir al dashboard
  if ((isAuthRoute || pathname === '/') && sessionCookie) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
