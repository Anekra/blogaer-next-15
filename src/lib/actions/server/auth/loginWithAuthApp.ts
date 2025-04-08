"use server";
import { cookies, headers } from "next/headers";

import setCookies from "@/lib/actions/server/auth/setCookies";
import { AuthDto } from "@/lib/types/dto/CommonDto";

export default async function loginWithAuthApp(
  emailOrUsername: string,
  token: string
) {
  try {
    const url = `${process.env.API_ROUTE}/auth/two-fa/auth-app/login`;
    const refreshCookieName = `${process.env.REFRESH_TOKEN}`;
    const cookie = await cookies();
    const userAgent = (await headers()).get("user-agent");
    const refreshToken = cookie.get(refreshCookieName)?.value;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": `${userAgent}`,
        Origin: "http://localhost:3000",
        Cookie: `${refreshCookieName}=${refreshToken}`
      },
      body: JSON.stringify({ emailOrUsername, token })
    });

    if (!response.ok) return false;

    const resJson: AuthDto = await response.json();

    await setCookies(resJson, refreshCookieName);

    return true;
  } catch (error) {
    console.error("loginWithAuthApp.ts ERROR >>>", error);
    return false;
  }
}
