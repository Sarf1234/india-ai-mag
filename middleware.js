import { NextResponse } from "next/server";
import { verifyToken } from "./src/lib/auth";

export async function middleware(req) {
  const token = req.cookies.get("token")?.value || null;

  const protectedRoutes = ["/dashboard", "/admin"];
  const isProtected = protectedRoutes.some(route =>
    req.nextUrl.pathname.startsWith(route)
  );

  if (!isProtected) return NextResponse.next();

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const decoded = await verifyToken(token); // if async
    if (!decoded) throw new Error("Invalid token");
  } catch (err) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
