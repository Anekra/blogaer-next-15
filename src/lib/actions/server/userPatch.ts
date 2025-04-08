"use server";
import jwt from "jsonwebtoken";
import { cookies, headers } from "next/headers";

import { Session } from "@/lib/types/common";

export default async function userPatch(
  currentSession: Session,
  objValue: { [key: string]: string },
  path: string = "/user/account"
) {
  const cookie = await cookies();
  const refreshCookieName = `${process.env.REFRESH_TOKEN}`;
  const refreshToken = cookie.get(refreshCookieName)?.value;
  const accessCookieName = `${process.env.ACCESS_TOKEN}`;
  const accessToken = cookie.get(accessCookieName)?.value;
  const userAgent = (await headers()).get("user-agent");

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}${path}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": `${userAgent}`,
        Origin: "http://localhost:3000",
        Cookie: `${refreshCookieName}=${refreshToken};${accessCookieName}=${accessToken}`
      },
      body: JSON.stringify(objValue)
    });
    
    if (!res.ok) {
      const resJson = await res.json();
      console.log(resJson)

      return {
        statusCode: res.status,
        error: resJson.error
      };
    }

    const session = jwt.sign(
      { ...currentSession, ...objValue },
      `${process.env.SESSION}`
    );

    return { session };
  } catch (_) {
    return { error: "Something went wrong please try again later." };
  }
}
