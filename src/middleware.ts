import { NextRequest, NextResponse } from "next/server";

import { authRoutes, protectedRoutes } from "@/lib/utils/constants";
import { newUrl } from "@/lib/utils/helper";

export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtected = protectedRoutes.some((route) => path.startsWith(route));
  const isAuthRoute = authRoutes.some((route) => path.startsWith(route));
  const accessToken = request.cookies.get(`${process.env.ACCESS_TOKEN}`);
  const refreshToken = request.cookies.get(`${process.env.REFRESH_TOKEN}`);

  const nextRes = NextResponse.next();
  if (isProtected) {
    if (refreshToken && !accessToken) {
      // await fetch(`${process.env.BASE_URL}/api/auth/refresh?middleware=true`);
    }

    if (!refreshToken) {
      const searchParams = [
        { param: "redirect", value: "Login required." },
        { param: "request_url", value: `${request.nextUrl.pathname}` }
      ];
      const url = newUrl("/login", searchParams);
      return NextResponse.redirect(url, 301);
    }
  }
  if (isAuthRoute && refreshToken) {
    const searchParams = [{ param: "redirect", value: "Already logged in." }];
    const url = newUrl("/home", searchParams);
    return NextResponse.redirect(url);
  }

  return nextRes;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"]
};
