"use server";
import { cookies } from "next/headers";

import setCookies from "@/lib/actions/server/auth/setCookies";
import { AuthDto } from "@/lib/types/dto/CommonDto";

export default async function loginWithPasskey(
  emailOrUsername: string,
  optionId: string,
  clientId: string
) {
  try {
    const url = `${process.env.API_ROUTE}/auth/two-fa/webauthn/login`;
    const refreshCookieName = `${process.env.REFRESH_TOKEN}`;
    const cookie = await cookies();
    const refreshToken = cookie.get(refreshCookieName)?.value;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "http://localhost:3000",
        Cookie: `${refreshCookieName}=${refreshToken}`
      },
      body: JSON.stringify({ emailOrUsername, optionId, clientId })
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
