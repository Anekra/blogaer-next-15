import { EditPost } from "@/lib/types/common";
import { CommonDto } from "@/lib/types/dto/CommonDto";

export default async function patchFetch(
  { slugOrId, title, content, tags }: EditPost,
  route: string
): Promise<CommonDto> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_ROUTE}/${route}/${slugOrId}`,
    {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, content, tags })
    }
  );

  return await response.json();
}
