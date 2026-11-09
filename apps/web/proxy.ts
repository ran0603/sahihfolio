import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  // Better auth uses `better-auth.session_token` (or `__Secure-better-auth.session_token`)
  const sessionCookie =
    request.cookies.get("better-auth.session_token") ||
    request.cookies.get("__Secure-better-auth.session_token");

  if (!sessionCookie) {
    const signInUrl = new URL("/admin/sign-in", request.url);
    signInUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Match /admin routes but explicitly exclude /admin/sign-in
  matcher: ["/admin/((?!sign-in).*)"],
};
