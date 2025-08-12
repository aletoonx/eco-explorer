
import { type NextRequest, NextResponse } from 'next/server';
import { checkSession } from '@/lib/firebase';

// Este middleware se ejecutará en las rutas que coincidan con el "matcher"
export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('eco-explorer-session')?.value;

  // Si no hay cookie de sesión, redirige a la página de login
  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Verifica si la cookie de sesión es válida
  const decodedClaims = await checkSession(sessionCookie);

  // Si la sesión no es válida, redirige a la página de login
  if (!decodedClaims) {
    const response = NextResponse.redirect(new URL('/login', request.url));
    // Borra la cookie inválida
    response.cookies.delete('eco-explorer-session');
    return response;
  }
  
  // Si la sesión es válida, permite que la petición continúe
  return NextResponse.next();
}

// El "matcher" define en qué rutas se aplicará este middleware.
// Protegeremos todas las rutas de la aplicación excepto las de autenticación y la página de inicio.
export const config = {
  matcher: [
    /*
     * Coincide con todas las rutas de petición excepto las que empiezan por:
     * - api (rutas de API)
     * - _next/static (archivos estáticos)
     * - _next/image (optimización de imágenes)
     * - favicon.ico (archivo de favicon)
     * - /login (página de inicio de sesión)
     * - /register (página de registro)
     * - / (página de inicio pública)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|login|register|$).*)',
  ],
};
