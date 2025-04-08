import { NextRequest, NextResponse } from "next/server";

import { authRoutes, protectedRoutes } from "@/lib/utils/constants";
import { newUrl } from "@/lib/utils/helper";

export async function authorization(req: NextRequest, path: string) {
  const isProtected = protectedRoutes.some((route) => path.startsWith(route));
  const isAuthRoute = authRoutes.some((route) => path.startsWith(route));
  const accessToken = req.cookies.get(`${process.env.ACCESS_TOKEN}`);
  const refreshToken = req.cookies.get(`${process.env.REFRESH_TOKEN}`);
  
  if (isProtected) {
    if (refreshToken && !accessToken) {
      // await fetch(`${process.env.BASE_URL}/api/auth/refresh?middleware=true`);
    }
    
    if (!refreshToken) {
      const searchParams = [
        { param: "redirect", value: "Login required." },
        { param: "request_url", value: `${req.nextUrl.pathname}` }
      ];
      const url = newUrl("/login", searchParams);
      return NextResponse.redirect(url, 301);
    }
  }
  if (isAuthRoute && refreshToken) {
    const searchParams = [{ param: "redirect", value: "Already logged in." }];
    const url = newUrl("/home", searchParams);
    return NextResponse.redirect(url, 301);
  }
}
