"use server";

import { z } from "zod";

import { RegisterFormSchema } from "@/lib/types/zodSchemas";
import { headers } from "next/headers";
import { AuthDto } from "@/lib/types/dto/CommonDto";
import setCookies from "./setCookies";

export default async function register(values: z.infer<typeof RegisterFormSchema>) {
  try {
    const url: string = `${process.env.API_ROUTE}/auth/register`;
    const userAgent = (await headers()).get("user-agent");
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": `${userAgent}`,
        Origin: "http://localhost:3000",
      },
      body: JSON.stringify(values)
    });
    console.log(response);

    const resJson: AuthDto = await response.json();

    console.log(resJson);

    if (!response.ok) return resJson;

    await setCookies(resJson);

    return true;
  } catch (error) {
    console.error("register.ts >>>", error);
    return false;
  }
}
