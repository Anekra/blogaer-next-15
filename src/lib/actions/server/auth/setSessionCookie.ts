"use server";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

import { Session } from "@/lib/types";

export default async function setSessionCookie(session: Session) {
  if (!session) return;
  const cookie = await cookies();
  const isSecure = process.env.NODE_ENV === "production";
  const sessionCookie = `${process.env.SESSION}`;
  const encryptedSession = jwt.sign(session, sessionCookie, {
    expiresIn: "10m"
  });
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
