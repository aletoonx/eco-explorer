import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // El middleware no se ejecuta en un entorno estático.
  // La lógica de protección de rutas se ha movido a src/app/(app)/layout.tsx
  return NextResponse.next();
}

export const config = {
  // Ya no es necesario hacer matching de rutas aquí para el modo estático.
  matcher: [],
}
