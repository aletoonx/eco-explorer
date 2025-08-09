import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // La lógica de autenticación ha sido eliminada.
  // El middleware ahora simplemente permite el paso de todas las solicitudes.
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
