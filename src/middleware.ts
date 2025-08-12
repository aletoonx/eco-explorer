import { type NextRequest, NextResponse } from "next/server";
import { checkSession } from "@/lib/firebase";

const protectedRoutes = ["/dashboard", "/map", "/animals", "/foundations"];
const authRoutes = ["/login", "/register"];
const SESSION_COOKIE_NAME = "eco-explorer-session";

export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const { pathname } = request.nextUrl;

  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isAuthRoute = authRoutes.includes(pathname);
  const isPublicHome = pathname === '/';

  if (!sessionCookie) {
    // Si no hay sesión y trata de acceder a una ruta protegida, redirigir a login
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    // Permitir acceso a rutas públicas si no hay sesión
    return NextResponse.next();
  }

  // Si hay sesión, verificar que sea válida
  const decodedClaims = await checkSession(sessionCookie);

  if (!decodedClaims) {
      // Si la cookie es inválida, borrarla y redirigir a login
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete(SESSION_COOKIE_NAME);
      return response;
  }

  // Si hay una sesión válida:
  // Si intenta acceder a una ruta de autenticación o a la home, redirigir al dashboard
  if (isAuthRoute || isPublicHome) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Si intenta acceder a una ruta protegida, permitir el acceso
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
