"use client";
import { PenIcon, UserIcon } from "lucide-react";
import Image from "next/image";

import DescriptionForm from "@/lib/components/forms/settings/account/DescriptionForm";
import NameForm from "@/lib/components/forms/settings/account/NameForm";
import Logo2Icon from "@/lib/components/icons/Logo2Icon";
import { Input } from "@/lib/components/ui/input";
import { useSession } from "@/lib/contexts/SessionContext";

export default function AccountSection() {
  const { session } = useSession();

  return (
    <section className="flex grow flex-col gap-2 rounded-lg">
      <h2 className="text-lg font-bold">Account</h2>
      <div className="glass-container grid grid-cols-2 gap-4 p-6">
        <div className="neu-base group flex flex-col gap-1 rounded-md p-4 hover:bg-foreground/10">
          <div className="flex items-center gap-2 font-bold leading-8 text-accent-foreground">
            <span className="flex justify-center overflow-hidden rounded-3xl">
              <UserIcon className="bottom-px stroke-[2.5]" />
            </span>
            <label htmlFor="user-profile-img">Profile Picture</label>
          </div>
          <form className="flex grow items-center gap-4">
            {session?.img ? (
              <div className="relative min-h-[60px] min-w-[60px] self-end overflow-hidden rounded-full border-[3.5px] border-primary-foreground">
                <Image
                  src={session.img}
                  alt="Profile"
                  sizes="(max-width: 60px) 60px"
                  className="object-cover"
                  fill
                />
              </div>
            ) : (
              <span className="rounded-full bg-base-background p-2 text-5xl text-primary-foreground">
                <UserIcon className="h-12 w-auto fill-current" />
              </span>
            )}
            <Input
              type="file"
              name="profile"
              id="user-profile-img"
              className="peer cursor-pointer border-transparent bg-transparent opacity-0 duration-300 group-hover:bg-base-background/60 group-hover:opacity-100 group-hover:ring-2 group-hover:ring-neutral-300 peer-focus-visible:opacity-100"
            />
          </form>
        </div>
        <div className="neu-base group flex flex-col gap-1 rounded-md p-4 hover:bg-foreground/10">
          <div className="flex items-center gap-2 font-bold text-accent-foreground">
            <span className="text-2xl">🖼</span>
            <label htmlFor="user-banner">Profile Banner</label>
          </div>
          <form className="flex items-center gap-4">
            <span className="flex w-1/2 justify-center rounded-sm bg-base-background p-2">
              <Logo2Icon className="h-12 w-auto" />
            </span>
            <Input
              type="file"
              name="banner"
              id="user-banner"
              className="peer cursor-pointer border-transparent bg-transparent opacity-0 duration-300 group-hover:bg-base-background/60 group-hover:opacity-100 group-hover:ring-2 group-hover:ring-neutral-300 peer-focus-visible:opacity-100"
            />
          </form>
        </div>
        <div className="neu-base group flex flex-col gap-1 rounded-md p-4 hover:bg-foreground/10">
          <div className="flex items-center gap-2 font-bold text-accent-foreground">
            <span className="text-2xl">🖂</span>
            <label htmlFor="user-email">Email</label>
          </div>
          <form className="flex items-center gap-4">
            <Input
              type="text"
              name="email"
              id="user-email"
              className="peer border-transparent bg-transparent transition-[width] duration-300 group-hover:bg-base-background/60 group-hover:ring-2 group-hover:ring-neutral-300"
              defaultValue={session?.email || ""}
            />
            <button className="btn-outline-base hidden !px-8 group-hover:block">
              Edit
            </button>
          </form>
        </div>
        <div className="neu-base group flex shrink grow basis-0 flex-col gap-1 rounded-md p-4 hover:bg-foreground/10">
          <div className="flex items-center gap-2 font-bold text-accent-foreground">
            <span className="text-2xl font-semibold">@</span>
            <label htmlFor="user-username">Username</label>
          </div>
          <form className="flex items-center gap-4">
            <Input
              type="text"
              name="username"
              id="user-username"
              className="peer border-transparent bg-transparent transition-[width] duration-300 group-hover:bg-base-background/60 group-hover:ring-2 group-hover:ring-neutral-300"
              defaultValue={session?.username || ""}
            />
            <button className="btn-outline-base hidden !px-8 group-hover:block">
              Edit
            </button>
          </form>
        </div>
        <div className="neu-base group flex shrink grow basis-0 flex-col gap-1 rounded-md p-4 hover:bg-foreground/10">
          <div className="flex items-center gap-2 font-bold text-accent-foreground">
            <span className="py-1">
              <PenIcon />
            </span>
            <label htmlFor="user-display-name">Display Name</label>
          </div>
          <NameForm />
        </div>
        <div className="neu-base group flex shrink grow basis-0 flex-col gap-1 rounded-md p-4 hover:bg-foreground/10">
          <div className="flex items-center gap-2 font-bold text-accent-foreground">
            <span className="text-2xl font-semibold">🗒</span>
            <label htmlFor="user-description">Short Description</label>
          </div>
          <DescriptionForm />
        </div>
      </div>
    </section>
  );
}
