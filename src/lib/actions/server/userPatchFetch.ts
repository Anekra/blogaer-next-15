"use server";
import { Session } from "@/lib/types/common";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function userPatchFetch(
  currentSession: Session,
  value: { [key: string]: string },
  route: string = "user",
) {
  const cookie = await cookies();
  const accessCookieName = `${process.env.ACCESS_TOKEN}`;
  const accessToken = cookie.get(accessCookieName)?.value;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ROUTE}/${route}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Origin: "http://localhost:3000",
          Cookie: `${accessCookieName}=${accessToken}`
        },
        body: JSON.stringify(value)
      }
    );
  
    const session = jwt.sign(
      { ...currentSession, ...value },
      `${process.env.SESSION}`
    );
    console.log(currentSession);
  
    return { session };
  } catch (error) {
    return { error: "Somethings wrong please try again later." };
  }
}
