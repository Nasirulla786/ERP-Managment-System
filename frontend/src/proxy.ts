import { NextRequest, NextResponse } from "next/server";

export default function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const publicRoutes = ["/login", "/register"];

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  const token = req.cookies.get("access")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
