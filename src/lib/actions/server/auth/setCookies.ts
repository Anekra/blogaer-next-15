"use server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

import { AuthDto } from "@/lib/types/dto/CommonDto";

export default async function setCookies(
  responseJson: AuthDto,
  refreshCookieName: string
) {
  const cookie = await cookies();
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
  const sessionCookieName = `${process.env.SESSION}`;
  const encryptedData = jwt.sign(sessionData, sessionCookieName, {
    expiresIn: "10m"
  });

  cookie.set(
    sessionCookieName,
    encryptedData,
    isSecure
      ? {
          httpOnly: true,
          sameSite: "lax",
          secure: true,
          maxAge: 1 * 1 * 10
        }
      : {
          httpOnly: true,
          maxAge: 1 * 1 * 10
        }
  );
}
