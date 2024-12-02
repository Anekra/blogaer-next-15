import React from "react";

import PostCardsHolderB from "@/lib/components/cards/holders/PostCardsHolderB";
import { PostsProvider } from "@/lib/contexts/PostsContext";

export default function DraftPage() {
  const url = "/draft/user?pageNum=1&pageSize=10";
  return (
    <main className="flex w-full gap-6 px-6 py-8">
      <PostsProvider>
        <PostCardsHolderB url={url} />
      </PostsProvider>
    </main>
  );
}
