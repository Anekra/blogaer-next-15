"use client";
import { usePathname } from "next/navigation";
import useSWRImmutable from "swr/immutable";

import getClientFetch from "@/lib/actions/client/getClientFetch";
import PostEditor from "@/lib/components/post/PostEditor";
import PostTags from "@/lib/components/post/PostTags";
import { GetPostByIdDto } from "@/lib/types/dto/GetDto";
import { getSlugOrIdFromPath } from "@/lib/utils/helper";

export default function PostEditorHolder() {
  const currentPath = usePathname();
  const isDraft = currentPath.startsWith("/blog/post/edit/draft");
  const slugOrId = getSlugOrIdFromPath(currentPath);
  const url = `/${isDraft ? "draft" : "post/public"}/${slugOrId}`;
  const { data: res, error } = useSWRImmutable<GetPostByIdDto>(
    url,
    getClientFetch
  );

  if (!res) return <p className="dots-loading">loading</p>;
  if (error) return <p>error</p>;

  return (
    <PostEditor post={res.data}>
      <PostTags />
    </PostEditor>
  );
}
