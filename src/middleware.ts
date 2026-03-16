import { NextResponse } from "next/server";
import { authRoutes } from "./lib/authRoutes";

export default function middleware(req: any) {
  const { nextUrl } = req;
  const isLoggedIn = req.cookies.get("fashion-access-token")?.value;
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!isLoggedIn && !isAuthRoute) {
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set(
      "callbackUrl",
      nextUrl.pathname + nextUrl.search,
    );
    return NextResponse.redirect(signInUrl);
  }
}

export const config = {
  matcher: [
    // "/user/:path*",
    "/sell-products",
  ],
};
