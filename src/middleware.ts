import { type NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/map", "/animals", "/foundations"];
const authRoutes = ["/login", "/register"];
const SESSION_COOKIE_NAME = "eco-explorer-session";

export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const { pathname } = request.nextUrl;

  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isAuthRoute = authRoutes.includes(pathname);
  const isPublicHome = pathname === '/';

  // 1. Si el usuario no está autenticado (no hay cookie)
  if (!sessionCookie) {
    // Y está intentando acceder a una ruta protegida, redirigir a login
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    // Si no, permitir el acceso a rutas públicas/auth
    return NextResponse.next();
  }

  // 2. Si el usuario SÍ está autenticado (hay cookie)
  // Y está intentando acceder a una ruta de autenticación (login/register) o a la home,
  // lo redirigimos a su panel de control.
  if (isAuthRoute || isPublicHome) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Si está autenticado y accede a cualquier otra ruta (protegida o no), se le permite el paso.
  // La validación real de la sesión se hará en el AppLayout del servidor.
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
