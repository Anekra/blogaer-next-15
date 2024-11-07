"use server";
import { z } from "zod";

import { RegisterFormSchema } from "@/lib/types/zodSchemas";

export default async function register(
  _: z.infer<typeof RegisterFormSchema>
) {
  // const url: string = `${process.env.API_ROUTE}/register`;
}
