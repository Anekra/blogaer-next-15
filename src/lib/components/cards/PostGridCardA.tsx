import { UserIcon } from "lucide-react";
import Image from "next/image";
import { Link } from "next-view-transitions";

import Logo2Icon from "@/lib/components/icons/Logo2Icon";
import { PostDto } from "@/lib/types/dto/PostDto";

export default function PostGridCardA({ post }: { post: PostDto }) {
  const username = post.username;
  const title = post.title.split(" b")[0];
  const thumbnail = post.content
    .filter((content) => content.type === "image")
    .at(0);
  const date = new Date(post.createdAt).toDateString();
  const slug = `${post.title.replaceAll(" ", "-").toLowerCase()}-${post.id}`;
  const url = `/blog/${username.toLowerCase()}/${slug}`;

  return (
    <Link
      href={url}
      className="neu-p group relative flex max-h-[200px] flex-col rounded-lg"
      style={{ viewTransitionName: `${slug}` }}
    >
      <div className="neu-p z-[1] flex h-[160px] w-3/4 flex-col gap-3 rounded-lg bg-card p-3 transition-[width_background-color_box-shadow] group-hover:w-full group-hover:bg-background/60 group-hover:shadow-none">
        <div className="absolute left-0 top-0 size-11 overflow-hidden rounded-br-lg rounded-tl-lg">
          {post?.userImg ? (
            <div className="relative size-10 overflow-hidden rounded-full border-[3.5px] border-primary-foreground">
              <Image
                src={post.userImg}
                alt="Profile"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          ) : (
            <span className="relative flex size-[34px] items-end justify-center overflow-hidden rounded-br-lg rounded-tl-lg bg-card-foreground text-primary-foreground">
              <UserIcon className="h-[30px] w-auto fill-card stroke-card" />
            </span>
          )}
        </div>
        <div className="flex grow flex-col gap-4">
          <p className="line-clamp-1 ps-12">{username}</p>
          <p className="line-clamp-2 text-xl font-bold">{title}</p>
        </div>
        <p className="text-xs text-foreground/40">{date}</p>
      </div>
      <div className="absolute right-0 top-0 h-full max-h-[160px] w-[27%] overflow-hidden rounded-lg transition-[width] group-hover:w-full">
        {thumbnail ? (
          <Image
            src={thumbnail.imageLink}
            alt={thumbnail.imageAlt}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-accent/40">
            <Logo2Icon />
          </div>
        )}
      </div>
    </Link>
  );
}
