import { CommonDto } from "@/lib/types/dto/CommonDto";

export default async function deleteClientFetch(
  slug: string,
  route?: string
): Promise<CommonDto> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_ROUTE}/${route}/${slug}`,
    {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

  return await response.json();
}
