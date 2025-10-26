import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

import { Session } from "@/lib/types";
import setSessionCookie from "@/lib/actions/server/auth/setSessionCookie";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const redirectRes = NextResponse.json(
      { error: "Session token expired." },
      { status: 419 }
    );
    const cookie = await cookies();
    const sessionCookie = `${process.env.SESSION}`;
    const encryptedSession = cookie.get(sessionCookie)?.value;
    if (!encryptedSession) return redirectRes;

    const decodedSession = jwt.decode(encryptedSession) as Session;
    if (!decodedSession) return redirectRes;

    const url = `${process.env.API_ROUTE}/auth/refresh`;
    const refreshResponse = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Origin: "http://localhost:3000"
      }
    });
    if (!refreshResponse.ok) return redirectRes;
    const refreshedSession = { ...decodedSession };
    refreshedSession.exp = Date.now() / 1000 + 1 * 10 * 60;
    const response = NextResponse.json(
      { exp: refreshedSession.exp },
      { status: 200 }
    );

    await setSessionCookie(refreshedSession);

    return response;
  } catch (error) {
    console.error("GET /auth/refresh/route", error);

    return NextResponse.json(
      { message: "Server currently down." },
      { status: 503 }
    );
  }
}
