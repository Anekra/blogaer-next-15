import Image from "next/image";

import FacebookIcon from "@/lib/components/icons/FacebookIcon";
import GithubIcon from "@/lib/components/icons/GithubIcon";
import GitlabIcon from "@/lib/components/icons/GitlabIcon";
import InstagramIcon from "@/lib/components/icons/InstagramIcon";
import XIcon from "@/lib/components/icons/XIcon";
import YoutubeIcon from "@/lib/components/icons/YoutubeIcon";
import { Input } from "@/lib/components/ui/input";

export default function SocialSection() {
  return (
    <section className="flex grow flex-col gap-2 rounded-lg">
      <h2 className="text-lg font-bold">Social/Other Accounts</h2>
      <div className="glass-container grid auto-rows-fr grid-cols-2 justify-between gap-4 p-6">
        <div className="relative flex flex-col justify-center">
          <div className="absolute size-full max-h-[160px] self-center overflow-hidden rounded-md">
            <Image
              src="https://github.blog/wp-content/uploads/2024/06/AI-DarkMode-4.png?w=600"
              alt="Github banner"
              fill
              className="object-cover blur-sm"
              priority
              unoptimized
            />
          </div>
          <div className="neu-base group relative flex h-full flex-col gap-2 rounded-md bg-base-background/70 p-4 hover:bg-foreground/10">
            <div className="flex items-center gap-2 font-bold text-accent-foreground group-hover:text-neutral-200">
              <span className="text-2xl">
                <GithubIcon />
              </span>
              <h3>Github</h3>
            </div>
            <form className="flex items-center gap-4">
              <Input
                type="text"
                className="peer border-transparent bg-transparent duration-300 group-hover:bg-base-background/90 group-hover:ring-2 group-hover:ring-white"
                defaultValue="github.com/your_github_username"
              />
              <button className="btn-outline-socials !px-8 !text-white opacity-0 duration-300 group-hover:opacity-100 peer-focus-within:opacity-100">
                Edit
              </button>
            </form>
          </div>
        </div>
        <div className="relative flex shrink grow basis-0 flex-col justify-center">
          <div className="absolute flex size-full max-h-[160px] overflow-hidden rounded-md">
            <span className="flex size-full items-center justify-center bg-gradient-to-r from-[#5e2981] via-[#ca1717] to-[#b98132] text-7xl text-white blur-sm">
              <InstagramIcon />
            </span>
          </div>
          <div className="neu-base group relative flex h-full flex-col gap-2 rounded-md bg-base-background/70 p-4 hover:bg-foreground/10">
            <div className="flex items-center gap-2 font-bold text-accent-foreground group-hover:text-neutral-200">
              <span className="text-2xl">
                <InstagramIcon />
              </span>
              <h3>Instagram</h3>
            </div>
            <form className="flex items-center gap-4">
              <Input
                type="text"
                className="peer border-transparent bg-transparent duration-300 group-hover:bg-base-background/90 group-hover:ring-2 group-hover:ring-neutral-300"
                defaultValue="instagram.com/your_instagram_username"
              />
              <button className="btn-outline-socials !px-8 !text-white opacity-0 duration-300 group-hover:opacity-100 peer-focus-within:opacity-100">
                Edit
              </button>
            </form>
          </div>
        </div>
        <div className="relative flex shrink grow basis-0 flex-col justify-center">
          <div className="absolute size-full max-h-[160px] self-center overflow-hidden rounded-md bg-black">
            <Image
              src="https://cdn.cms-twdigitalassets.com/content/dam/blog-twitter/x/blog_x_card.png.img.fullhd.medium.png"
              alt="X banner"
              fill
              className="scale-[1.4] object-contain blur-sm"
              unoptimized
            />
          </div>
          <div className="neu-base group relative flex h-full flex-col gap-2 rounded-md bg-base-background/70 p-4 hover:bg-foreground/10">
            <div className="flex items-center gap-2 font-bold text-accent-foreground group-hover:text-neutral-200">
              <span className="text-2xl">
                <XIcon />
              </span>
              <h3>X</h3>
            </div>
            <form className="flex items-center gap-4">
              <Input
                type="text"
                className="peer border-transparent bg-transparent duration-300 group-hover:bg-base-background/90 group-hover:ring-2 group-hover:ring-neutral-300"
                defaultValue="x.com/your_x_username"
              />
              <button className="btn-outline-socials !px-8 !text-white opacity-0 duration-300 group-hover:opacity-100 peer-focus-within:opacity-100 peer-focus-within:shadow-[inset_0_0_0_2px_rgb(255_255_255)]">
                Edit
              </button>
            </form>
          </div>
        </div>
        <div className="relative flex shrink grow basis-0 flex-col justify-center">
          <div className="absolute size-full max-h-[160px] self-center overflow-hidden rounded-md">
            <span className="flex size-full items-center justify-center bg-base-foreground/30 text-8xl text-white blur-sm [&>*]:fill-red-600 [&>*]:stroke-none">
              <YoutubeIcon />
            </span>
          </div>
          <div className="neu-base group relative flex h-full flex-col gap-2 rounded-md bg-base-background/70 p-4 hover:bg-foreground/10">
            <div className="flex items-center gap-2 font-bold text-accent-foreground group-hover:text-neutral-200">
              <span className="text-2xl [&>*]:fill-none [&>*]:stroke-current">
                <YoutubeIcon />
              </span>
              <h3>Youtube</h3>
            </div>
            <form className="flex items-center gap-4">
              <Input
                type="text"
                className="peer border-transparent bg-transparent duration-300 group-hover:bg-base-background/90 group-hover:ring-2 group-hover:ring-neutral-300"
                defaultValue="youtube.com/your_youtube_username"
              />
              <button className="btn-outline-socials !px-8 !text-white opacity-0 duration-300 group-hover:opacity-100 peer-focus-within:opacity-100">
                Edit
              </button>
            </form>
          </div>
        </div>
        <div className="relative flex shrink grow basis-0 flex-col justify-center">
          <div className="absolute size-full max-h-[160px] self-center overflow-hidden rounded-md">
            <span className="flex size-full items-center justify-center bg-base-foreground/30 text-8xl blur-sm [&>*]:fill-blue-600 [&>*]:stroke-none">
              <FacebookIcon />
            </span>
          </div>
          <div className="neu-base group relative flex h-full flex-col gap-2 rounded-md bg-base-background/70 p-4 hover:bg-foreground/10">
            <div className="flex items-center gap-2 font-bold text-accent-foreground group-hover:text-neutral-200">
              <span className="text-2xl">
                <FacebookIcon />
              </span>
              <h3>Facebook</h3>
            </div>
            <form className="flex items-center gap-4">
              <Input
                type="text"
                className="peer border-transparent bg-transparent duration-300 group-hover:bg-base-background/90 group-hover:ring-2 group-hover:ring-neutral-300"
                defaultValue="facebook.com/your_facebook_username"
              />
              <button className="btn-outline-socials !px-8 !text-white opacity-0 duration-300 group-hover:opacity-100 peer-focus-within:opacity-100">
                Edit
              </button>
            </form>
          </div>
        </div>
        <div className="relative flex shrink grow basis-0 flex-col justify-center">
          <div className="absolute size-full max-h-[160px] self-center overflow-hidden rounded-md bg-indigo-950">
            <Image
              src="https://images.ctfassets.net/xz1dnu24egyd/1IRkfXmxo8VP2RAE5jiS1Q/ea2086675d87911b0ce2d34c354b3711/gitlab-logo-500.png"
              alt="Github banner"
              fill
              className="scale-125 object-contain blur-sm"
              unoptimized
            />
          </div>
          <div className="neu-base group relative flex h-full flex-col gap-2 rounded-md bg-base-background/70 p-4 hover:bg-foreground/10">
            <div className="flex items-center gap-2 font-bold text-accent-foreground group-hover:text-neutral-200">
              <span className="text-2xl">
                <GitlabIcon />
              </span>
              <h3>Gitlab</h3>
            </div>
            <form className="flex items-center gap-4">
              <Input
                type="text"
                className="peer border-transparent bg-transparent duration-300 group-hover:bg-base-background/90 group-hover:ring-2 group-hover:ring-neutral-300"
                defaultValue="gitlab.com/your_gitlab_username"
              />
              <button className="btn-outline-socials !px-8 !text-white opacity-0 duration-300 group-hover:opacity-100 peer-focus-within:opacity-100">
                Edit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
