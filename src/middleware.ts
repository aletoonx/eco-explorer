import { type NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/firebase";

const protectedRoutes = ["/dashboard", "/map", "/animals", "/foundations"];
const authRoutes = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const { pathname } = request.nextUrl;

  const isProtectedRoute = 
    protectedRoutes.some(route => pathname.startsWith(route));
  
  const isAuthRoute = authRoutes.includes(pathname);

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if ((isAuthRoute || pathname === '/') && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|costa-rica-map.png).*)'],
}
