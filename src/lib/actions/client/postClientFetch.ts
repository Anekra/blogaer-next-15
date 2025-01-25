import { AnyObj } from "@/lib/types/common";

export default async function postClientFetch(
  values: AnyObj,
  route: string
): Promise<boolean> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}${route}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(values)
  });

  return response.ok;
}
