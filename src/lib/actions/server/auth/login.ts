"use server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { z } from "zod";

import { AuthJson } from "@/lib/types/common";
import { LoginFormSchema } from "@/lib/types/zodSchemas";
import { ErrorTypes } from "@/lib/utils/enums";

type Login = {
  status?: string;
  message?: string;
  session?: string;
};

export default async function login(
  values: z.infer<typeof LoginFormSchema> & { clientId: string }
): Promise<Login> {
  try {
    const url = `${process.env.API_ROUTE}/auth/login`;
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
      body: JSON.stringify(values)
    });

    const responseJson: AuthJson = await response.json();

    if (!response.ok) return responseJson;

    const isSecure = process.env.NODE_ENV === "production";
    // access cookie
    const accessCookieName = `${process.env.ACCESS_TOKEN}`;
    cookie.set(
      accessCookieName,
      responseJson.data.access,
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
    // refresh cookie
    cookie.set(
      refreshCookieName,
      responseJson.data.refresh,
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

    const sessionData = {
      username: responseJson.data.username,
      name: responseJson.data.name,
      email: responseJson.data.email,
      desc: responseJson.data.desc,
      role: responseJson.data.role,
      img: responseJson.data.img
    };
    const encryptedData = jwt.sign(sessionData, `${process.env.SESSION}`, {
      expiresIn: "10m"
    });

    return { session: encryptedData };
  } catch (error) {
    return {
      message:
        error instanceof Error ? error.message : ErrorTypes.UNEXPECTED_ERROR
    };
  }
}
