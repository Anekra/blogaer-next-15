"use client";
import React, { useEffect } from "react";
import useSWRImmutable from "swr/immutable";

import getClientFetch from "@/lib/actions/client/getClientFetch";
import PostGridCardC from "@/lib/components/cards/PostGridCardC";
import { useCurrentPosts } from "@/lib/contexts/PostsContext";
import { GetPostsByUserIdDto } from "@/lib/types/dto/GetDto";

export default function PostCardsHolderB({ url }: { url: string }) {
  const { currentPosts, setCurrentPosts } = useCurrentPosts();
  const { data: res, error } = useSWRImmutable<GetPostsByUserIdDto>(
    url,
    (url: string) => getClientFetch(url)
  );

  useEffect(() => {
    if (!res) return;
    if (res.data.posts.length > 0) setCurrentPosts(res.data.posts);
  }, [res, setCurrentPosts]);

  if (!res) return <p>loading...</p>;
  if (error) return <p>error</p>;
  if (res.data.totalPosts === 0) return <p>No data found.</p>;

  return (
    <div className="grid w-full auto-rows-fr grid-cols-1 gap-4 ms:grid-cols-2 ql:grid-cols-3">
      {currentPosts.map((post, i) => {
        return <PostGridCardC key={i} postData={{ post, postIndex: i }} />;
      })}
    </div>
  );
}
