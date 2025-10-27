"use server";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { Auth } from "@/lib/types";

export default async function setSessionCookie(userData: Auth) {
  if (!userData) return;
  const cookie = await cookies();
  const isSecure = process.env.NODE_ENV === "production";
  const sessionSecret = `${process.env.SESSION_SECRET}`;
  const encryptedSession = jwt.sign(userData, sessionSecret, {
    expiresIn: "10m"
  });
  const sessionCookie = `${process.env.SESSION}`;
  cookie.set(
    sessionCookie,
    encryptedSession,
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
}
