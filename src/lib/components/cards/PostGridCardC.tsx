"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { useSession } from "@/lib/contexts/SessionContext";
import { PostWithNoUserDto } from "@/lib/types/dto/PostDto";

import EditPostDropdown from "../dropdowns/EditPostDropdown";
import Logo2Icon from "../icons/Logo2Icon";

export default function PostGridCardC({
  postData: { post, postIndex }
}: {
  postData: { post: PostWithNoUserDto; postIndex: number };
}) {
  const { session } = useSession();
  const username = session?.username;
  const title = post.title;
  const thumbnail = post.content
    .filter((content) => content.type === "image")
    .at(0);
  const currentPath = usePathname();
  const isDraft = currentPath.startsWith("/blog/post/draft");
  const slug = `${title.replaceAll(" ", "-").toLowerCase()}-${post.id}`;
  const url = isDraft
    ? `/blog/post/edit/draft/${post.id}`
    : `/blog/${username?.toLowerCase()}/${slug}`;
  const date = new Date(post.createdAt).toDateString();

  return (
    <div className="neu-base group relative flex max-h-[300px] max-w-[480px] flex-col justify-between overflow-hidden rounded-md ms:max-w-[470px] ql:max-w-[460px]">
      <div className="neu-base flex h-[78%] flex-col overflow-hidden rounded-md transition-[height_background-color] group-hover:h-full group-hover:bg-background/60">
        {thumbnail ? (
          <div className="relative size-full grow">
            <Image
              src={thumbnail.imageLink}
              alt={thumbnail.imageAlt}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        ) : (
          <div className="flex size-full grow items-center justify-center overflow-hidden rounded-md bg-accent/40">
            <Logo2Icon />
          </div>
        )}
      </div>
      <Link
        href={url}
        className="absolute bottom-0 flex h-[66px] w-full flex-wrap items-center p-2 transition-[height_background-color] group-hover:h-full group-hover:bg-background/60 group-hover:px-4 group-hover:text-center"
        onClick={(e) => {
          const tagEl = ((e.target as any).tagName as string).toLowerCase();
          if (tagEl === "button" || tagEl === "svg" || tagEl === "path") {
            e.preventDefault();
          }
        }}
      >
        <div>
          <h4 className="truncate-1 absolute bottom-6 left-2 rounded box-decoration-clone text-[18px] font-bold group-hover:static  group-hover:inline group-hover:bg-foreground/10 group-hover:px-2 group-hover:text-3xl ml:text-[22px]">
            {title}
          </h4>
          <p className="absolute bottom-2 left-2 text-xs text-foreground/80">
            0 reads | {date}
          </p>
        </div>
        <div className="absolute bottom-6 right-2">
          <EditPostDropdown
            postData={{
              editUrl: isDraft ? url : `/blog/post/edit/published/${slug}`,
              postIndex
            }}
          />
        </div>
      </Link>
    </div>
  );
}
