"use server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function userPatchFetch(values: any, route: string) {
  const cookie = await cookies();
  const accessCookieName = `${process.env.ACCESS_TOKEN}`;
  const accessToken = cookie.get(accessCookieName)?.value;
  const { description } = values;

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
      body: JSON.stringify({ description })
    }
  );

  const session = jwt.sign(
    { ...values, desc: description },
    `${process.env.SESSION}`
  );
  console.log(values);

  return { session };
}
