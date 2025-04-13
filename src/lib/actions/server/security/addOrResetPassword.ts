"use server";
import { cookies, headers } from "next/headers";

export default async function addOrResetPassword(
  password: string,
  subject: string,
  limit: number
) {
  try {
    const cookie = await cookies();
    const url = `${process.env.API_ROUTE}/user/security/add-or-reset-password`;
    const refreshCookieName = `${process.env.REFRESH_TOKEN}`;
    const refreshToken = cookie.get(refreshCookieName)?.value;
    const accessCookieName = `${process.env.ACCESS_TOKEN}`;
    const accessToken = cookie.get(accessCookieName)?.value;
    const userAgent = (await headers()).get("user-agent");
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": `${userAgent}`,
        Origin: "http://localhost:3000",
        Cookie: `${refreshCookieName}=${refreshToken};${accessCookieName}=${accessToken}`
      },
      body: JSON.stringify({ password, subject, limit })
    });
    if (!response.ok) return false;

    return true;
  } catch (_) {
    return false;
  }
}
