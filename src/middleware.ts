/**
 * Middleware: gates the entire /admin/* area behind a NextAuth session.
 * Sign-in form lives at /admin/login (excluded from the gate). Login API
 * and the static-export of NextAuth's own callback URLs at /api/auth/*
 * stay public too.
 *
 * Uses NextAuth v5's `auth()` wrapped middleware so the session is read
 * from the JWT cookie without an extra round-trip.
 */
import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoginPage = nextUrl.pathname === "/admin/login";
  const isLoggedIn = Boolean(req.auth?.user);

  if (!isLoggedIn && nextUrl.pathname.startsWith("/admin") && !isLoginPage) {
    const url = nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("from", nextUrl.pathname);
    return Response.redirect(url);
  }
  if (isLoggedIn && isLoginPage) {
    const url = nextUrl.clone();
    url.pathname = "/admin";
    url.search = "";
    return Response.redirect(url);
  }
});

export const config = {
  matcher: ["/admin/:path*"],
};
