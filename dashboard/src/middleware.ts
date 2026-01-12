import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Define public paths that don't require authentication
  const publicPaths = ["/login", "/register"];
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

  // Check for authentication cookies
  const accessToken = request.cookies.get("libraryAccessToken");

  // Redirect root to login or dashboard based on auth
  if (pathname === "/") {
    if (accessToken) {
      return NextResponse.redirect(new URL("/overview", request.url));
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect authenticated users away from auth pages
  if (isPublicPath && accessToken) {
    return NextResponse.redirect(new URL("/overview", request.url));
  }

  // Redirect unauthenticated users to login
  if (!isPublicPath && !accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
