"use server";
import { cookies, headers } from "next/headers";

import setCookies from "@/lib/actions/server/auth/setCookies";
import { AuthDto } from "@/lib/types/dto/CommonDto";

export default async function loginWithPasskey(
  emailOrUsername: string,
  optionId: string
) {
  try {
    const url = `${process.env.API_ROUTE}/auth/two-fa/webauthn/login`;
    const refreshCookieName = `${process.env.REFRESH_TOKEN}`;
    const cookie = await cookies();
    const refreshToken = cookie.get(refreshCookieName)?.value;
    const userAgent = (await headers()).get("user-agent");
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": `${userAgent}`,
        Origin: "http://localhost:3000",
        Cookie: `${refreshCookieName}=${refreshToken}`
      },
      body: JSON.stringify({ emailOrUsername, optionId })
    });

    const resJson: AuthDto = await response.json();

    if (!response.ok) return resJson;

    await setCookies(resJson, refreshCookieName);

    return true;
  } catch (error) {
    console.error("loginWithPasskey.ts ERROR >>>", error);
    return false;
  }
}
