"use server";
import { cookies } from "next/headers";

import { CommonDto } from "@/lib/types/dto/CommonDto";

export default async function checkTwoFA(
  emailOrUsername: string
): Promise<CommonDto | null> {
  try {
    const url = `${process.env.API_ROUTE}/auth/check-two-fa/${emailOrUsername}`;
    const refreshCookieName = `${process.env.REFRESH_TOKEN}`;
    const cookie = await cookies();
    const refreshToken = cookie.get(refreshCookieName)?.value;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Origin: "http://localhost:3000",
        Cookie: `${refreshCookieName}=${refreshToken}`
      }
    });

    const resJson: CommonDto = await res.json();

    return resJson;
  } catch (error) {
    console.error("check two fa error >>>", error);

    return null;
  }
}
