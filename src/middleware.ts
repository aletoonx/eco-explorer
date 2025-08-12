import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // Se han eliminado los chequeos para permitir el acceso libre.
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
