import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const userRole = req.cookies.get("userRole")?.value || "user"; 

  const res = NextResponse.next();
  res.headers.set("x-user-role", userRole);
  return res;
}

export const config = {
  matcher: "/admin/:path*", 
};