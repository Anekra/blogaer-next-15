"use server";
import { cookies, headers } from "next/headers";
import { z } from "zod";

import { AuthDto } from "@/lib/types/dto/CommonDto";
import { LoginFormSchema } from "@/lib/types/zodSchemas";

import setCookies from "./setCookies";

export default async function login(values: z.infer<typeof LoginFormSchema>) {
  try {
    const cookie = await cookies();
    const url = `${process.env.API_ROUTE}/auth/login`;
    const refreshCookieName = `${process.env.REFRESH_TOKEN}`;
    const refreshToken = cookie.get(refreshCookieName)?.value;
    const userAgent = (await headers()).get('user-agent');
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": `${userAgent}`,
        Origin: "http://localhost:3000",
        Cookie: `${refreshCookieName}=${refreshToken}`
      },
      body: JSON.stringify(values)
    });

    const resJson: AuthDto = await response.json();

    console.log(resJson);

    if (!response.ok) return resJson;

    await setCookies(resJson, refreshCookieName);

    return true;
  } catch (error) {
    console.error("login.ts >>>", error);
    return false;
  }
}
