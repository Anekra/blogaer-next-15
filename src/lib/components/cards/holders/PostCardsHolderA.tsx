"use client";
import { usePathname } from "next/navigation";
import React from "react";
import useSWRImmutable from "swr/immutable";

import getClientFetch from "@/lib/actions/client/getClientFetch";
import PostGridCardA from "@/lib/components/cards/PostGridCardA";
import PostGridCardB from "@/lib/components/cards/PostGridCardB";
import { GetPostsByPageDto } from "@/lib/types/dto/GetPostsByPageDto";

export default function PostCardsHolderA() {
  const currentPath = usePathname();
  const url = `${process.env.NEXT_PUBLIC_API_ROUTE}/post/public?pageNum=1&pageSize=10`;
  const {
    data: res,
    error,
    isLoading
  } = useSWRImmutable<GetPostsByPageDto>(url, getClientFetch, {
    loadingTimeout: 5000,
    shouldRetryOnError: false
  });

  if (isLoading) return <p>loading...</p>;
  if (!res || error) return <p>error: {JSON.stringify(error.toString())}</p>;
  if (res.data.totalPosts === 0) return <p>No data found.</p>;

  return (
    <main
      className={`grid w-full auto-rows-fr grid-cols-1 justify-center gap-4 px-6 py-8${
        currentPath === "/"
          ? " ml:grid-cols-2 xl:grid-cols-3"
          : " ms:grid-cols-2 ql:grid-cols-3"
      }`}
    >
      {res.data.posts.map((post, i) => {
        return currentPath === "/" ? (
          <PostGridCardA key={i} post={post} />
        ) : (
          <PostGridCardB key={i} post={post} />
        );
      })}
    </main>
  );
}
