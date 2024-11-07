"use server";
import { cookies } from "next/headers";

export default async function logout() {
  const accessCookieName = `${process.env.ACCESS_TOKEN}`;
  const refreshCookieName = `${process.env.REFRESH_TOKEN}`;
  const url = `${process.env.API_ROUTE}/logout`;
  const cookie = await cookies();
  const refreshToken = cookie.get(refreshCookieName)?.value;
  cookie.delete(accessCookieName);
  cookie.delete(refreshCookieName);
  await fetch(url, {
    headers: {
      Origin: "http://localhost:3000",
      Cookie: `${refreshCookieName}=${refreshToken}`
    }
  });
}
