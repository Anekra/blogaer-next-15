"use client";
import { usePathname } from "next/navigation";
import useSWRImmutable from "swr/immutable";

import getFetch from "@/lib/actions/client/getFetch";
import PostEditor from "@/lib/components/post/PostEditor";
import PostTags from "@/lib/components/post/PostTags";
import { GetPostByIdDto } from "@/lib/types/dto/GetPostByIdDto";
import { getSlugOrIdFromPath } from "@/lib/utils/helper";

export default function PostEditorHolder() {
  const currentPath = usePathname();
  const isDraft = currentPath.startsWith("/blog/post/edit/draft");
  const slugOrId = getSlugOrIdFromPath(currentPath);
  const url = `${process.env.NEXT_PUBLIC_API_ROUTE}/${
    isDraft ? "draft" : "post/public"
  }/${slugOrId}`;
  const { data: res, error } = useSWRImmutable<GetPostByIdDto>(url, getFetch);

  if (!res) return <p className="dots-loading">loading</p>;
  if (error) return <p>error</p>;

  return (
    <PostEditor post={res.data}>
      <PostTags />
    </PostEditor>
  );
}
