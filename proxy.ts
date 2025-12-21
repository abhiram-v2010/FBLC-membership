import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// list of protected routes
const protectedRoutes = [
  "/home",
  "/member-services",
  "/education-hub",
  "/past-meets",
  "/quiz-hub",
];

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // is current route a protected route
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    // check if valid session
    const token = request.cookies.get("auth_token")?.value;

    // redirect to login page
    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

// which routes the middleware should run on
export const config = {
  matcher: [
    // all request paths except for the ones starting with: api, _next/static, _next/image, favicon.ico
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
