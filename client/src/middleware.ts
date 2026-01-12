import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define public routes that don't require authentication
const publicRoutes = [
  "/",
  "/login",
  "/signup",
  "/about",
  "/faq",
  "/terms",
  "/privacy",
  "/collection",
  "/suggester",
];

// Define routes that should redirect to home if already authenticated
const authRoutes = ["/login", "/signup"];

// Define protected routes that require authentication
const protectedRoutes = [
  "/cart",
  "/profile",
  "/settings",
  "/deposit",
  "/history",
  "/rentals",
  "/wishlist",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if user has a session by checking for auth cookies
  const hasAuthCookie = request.cookies.has("accessToken");

  // Allow static files and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Check if the route is public (including nested routes)
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  if (isPublicRoute) {
    // If user is authenticated and trying to access auth routes, redirect to home
    if (hasAuthCookie && authRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // Check if the route is protected (including nested routes)
  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  if (isProtectedRoute) {
    // Redirect to login if not authenticated
    if (!hasAuthCookie) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // For any other routes not explicitly defined, allow access
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*|public).*)",
  ],
};
