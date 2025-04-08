import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { RedirectParam } from "../utils/enums";
import { newUrl } from "../utils/helper";

export async function requestForm(req: NextRequest) {
  const currentPath = req.nextUrl.pathname;
  const path = currentPath.includes("update")
    ? "/settings/account"
    : "/settings/security";
  const timeLimit = Number(req.nextUrl.searchParams.get("limit"));
  const now = Date.now();
  const isExpired = now > timeLimit;
  if (isExpired) {
    const searchParams = [
      { param: "redirect", value: RedirectParam.RequestExpired }
    ];
    const url = newUrl(path, searchParams);
    return NextResponse.redirect(url, 301);
  }

  const urlUsername = req.nextUrl.searchParams.get("username");
  const cookie = await cookies();
  const refreshCookieName = `${process.env.REFRESH_TOKEN}`;
  const refreshToken = cookie.get(refreshCookieName)?.value;
  try {
    const checkUsernameRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_ROUTE}/auth/check-username`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Origin: "http://localhost:3000",
          Cookie: `${refreshCookieName}=${refreshToken}`
        }
      }
    );
    const resJson = await checkUsernameRes.json();
    if (urlUsername !== resJson.data.username) {
      const searchParams = [
        { param: "redirect", value: "Logged in user doesn't match!" }
      ];
      const url = newUrl("/security", searchParams);
      return NextResponse.redirect(url, 301);
    }
  } catch (_) {
    const searchParams = [
      { param: "redirect", value: "Internal server error." }
    ];
    const url = newUrl("/security", searchParams);
    return NextResponse.redirect(url, 301);
  }
}
