import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

import { RefreshTokenJson, Session } from "@/lib/types/common";

export async function GET(request: NextRequest) {
  console.log("#### refresh token route ###");
  const accessCookieName = `${process.env.ACCESS_TOKEN}`;
  const refreshCookieName = `${process.env.REFRESH_TOKEN}`;

  const refreshToken = request.cookies.get(refreshCookieName)?.value;
  const redirectRes = NextResponse.json(
    { error: "Session token expired." },
    { status: 419 }
  );
  if (!refreshToken) {
    return redirectRes;
  }

  console.log("<<< refresh token route A >>>");
  try {
    const url = `${process.env.API_ROUTE}/auth/refresh`;
    const refreshResponse = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Origin: "http://localhost:3000",
        Cookie: `${process.env.REFRESH_TOKEN}=${refreshToken}`
      }
    });
    console.log("<<< refresh token route B >>>", refreshResponse.status);
    if (!refreshResponse.ok) {
      console.log("<<< refresh token route C >>>", refreshCookieName);
      redirectRes.cookies.delete(accessCookieName);
      redirectRes.cookies.delete(refreshCookieName);

      return redirectRes;
    }

    const isFromMiddleware = request.nextUrl.searchParams.get("middleware");
    if (isFromMiddleware) return;

    const sessionToken = request.nextUrl.searchParams.get("session");
    if (!sessionToken) {
      console.log("<<< refresh token route D >>>");
      return redirectRes;
    }

    const decodedSession = jwt.decode(sessionToken) as Session;
    const stripedSession = { ...decodedSession };
    stripedSession.exp = Date.now() / 1000 + 1 * 10 * 60;
    const encryptedData = jwt.sign(stripedSession, `${process.env.SESSION}`);
    const refreshJson: RefreshTokenJson = await refreshResponse.json();
    const response = NextResponse.json(
      { session: encryptedData },
      { status: 200 }
    );
    console.log("<<< refresh token route E >>>", refreshJson);
    const isSecure = process.env.NODE_ENV === "production";
    // access
    response.cookies.set(
      accessCookieName,
      refreshJson.data.access,
      isSecure
        ? {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 1 * 10 * 60
          }
        : {
            httpOnly: true,
            maxAge: 1 * 10 * 60
          }
    );
    // refresh
    response.cookies.set(
      refreshCookieName,
      refreshJson.data.refresh,
      isSecure
        ? {
            httpOnly: true,
            sameSite: "lax",
            secure: true,
            maxAge: 24 * 60 * 60
          }
        : {
            httpOnly: true,
            maxAge: 24 * 60 * 60
          }
    );
    console.log("<<< refresh token route S >>>");

    return response;
  } catch (error) {
    console.error("<<< refresh token error >>>", error);

    return NextResponse.json(
      { message: "Server currently down." },
      { status: 202 }
    );
  }
}
