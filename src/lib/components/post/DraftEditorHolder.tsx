"use client";
import { usePathname } from "next/navigation";
import useSWRImmutable from "swr/immutable";

import getClientFetch from "@/lib/actions/client/getClientFetch";
import PostEditor from "@/lib/components/post/PostEditor";
import PostTags from "@/lib/components/post/PostTags";
import { GetDraftBySlugDto } from "@/lib/types/dto/ReqDto";
import { getSlugFromPath } from "@/lib/utils/helper";

export default function DraftEditorHolder() {
  const currentPath = usePathname();
  const id = getSlugFromPath(currentPath);
  const url = `/draft/${id}`;
  const { data: res, error } = useSWRImmutable<GetDraftBySlugDto>(
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
