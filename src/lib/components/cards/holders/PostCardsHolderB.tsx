"use client";
import React, { useEffect } from "react";
import useSWRImmutable from "swr/immutable";

import getClientFetch from "@/lib/actions/client/getClientFetch";
import PostGridCardC from "@/lib/components/cards/PostGridCardC";
import { useCurrentPosts } from "@/lib/contexts/PostsContext";
import { GetPostsByUserIdDto } from "@/lib/types/dto/ReqDto";

export default function PostCardsHolderB({ url }: { url: string }) {
  const { currentPosts, setCurrentPosts } = useCurrentPosts();
  const {
    data: res,
    error,
    isLoading
  } = useSWRImmutable<GetPostsByUserIdDto>(url, getClientFetch);

  useEffect(() => {
    if (res?.data && res.data.posts.length > 0) setCurrentPosts(res.data.posts);
  }, [res, setCurrentPosts]);

  if (!res || isLoading) return <p>loading...</p>;
  if (error) return <p>error</p>;
  if (res.data?.totalPosts === 0) return <p>No data found!</p>;
  if (res.error) return <p>{res.status}</p>;

  return (
    <div className="grid w-full auto-rows-fr grid-cols-1 gap-4 ms:grid-cols-2 ql:grid-cols-3">
      {currentPosts.map((post, i) => {
        return <PostGridCardC key={i} postData={{ post, postIndex: i }} />;
      })}
    </div>
  );
}
