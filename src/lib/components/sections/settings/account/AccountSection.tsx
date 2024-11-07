"use client";
import { PenIcon, UserIcon } from "lucide-react";
import Image from "next/image";

import Logo2Icon from "@/lib/components/icons/Logo2Icon";
import { Input } from "@/lib/components/ui/input";
import { useSession } from "@/lib/contexts/SessionContext";
import UserDescriptionForm from "@/lib/components/forms/settings/UserDescriptionForm";

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
            <h3>Profile Picture</h3>
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
              className="peer cursor-pointer border-transparent bg-transparent opacity-0 duration-300 group-hover:bg-base-background/60 group-hover:opacity-100 group-hover:ring-2 group-hover:ring-neutral-300 peer-focus-visible:opacity-100"
            />
          </form>
        </div>
        <div className="neu-base group flex flex-col gap-1 rounded-md p-4 hover:bg-foreground/10">
          <div className="flex items-center gap-2 font-bold text-accent-foreground">
            <span className="text-2xl">🖼</span>
            <h3>Profile Banner</h3>
          </div>
          <form className="flex items-center gap-4">
            <span className="flex w-1/2 justify-center rounded-sm bg-base-background p-2">
              <Logo2Icon className="h-12 w-auto" />
            </span>
            <Input
              type="file"
              className="peer cursor-pointer border-transparent bg-transparent opacity-0 duration-300 group-hover:bg-base-background/60 group-hover:opacity-100 group-hover:ring-2 group-hover:ring-neutral-300 peer-focus-visible:opacity-100"
            />
          </form>
        </div>
        <div className="neu-base group flex flex-col gap-1 rounded-md p-4 hover:bg-foreground/10">
          <div className="flex items-center gap-2 font-bold text-accent-foreground">
            <span className="text-2xl">🖂</span>
            <h3>Email</h3>
          </div>
          <form className="flex items-center gap-4">
            <Input
              type="text"
              className="peer border-transparent bg-transparent duration-300 group-hover:bg-base-background/60 group-hover:ring-2 group-hover:ring-neutral-300"
              defaultValue={session?.email || ""}
            />
            <button className="btn-outline-base !px-8 opacity-0 duration-300 group-hover:opacity-100 peer-focus-visible:opacity-100">
              Edit
            </button>
          </form>
        </div>
        <div className="neu-base group flex shrink grow basis-0 flex-col gap-1 rounded-md p-4 hover:bg-foreground/10">
          <div className="flex items-center gap-2 font-bold text-accent-foreground">
            <span className="text-2xl font-semibold">@</span>
            <h3>Username</h3>
          </div>
          <form className="flex items-center gap-4">
            <Input
              type="text"
              className="peer border-transparent bg-transparent duration-300 group-hover:bg-base-background/60 group-hover:ring-2 group-hover:ring-neutral-300"
              defaultValue={session?.username || ""}
            />
            <button className="btn-outline-base !px-8 opacity-0 duration-300 group-hover:opacity-100 peer-focus-visible:opacity-100">
              Edit
            </button>
          </form>
        </div>
        <div className="neu-base group flex shrink grow basis-0 flex-col gap-1 rounded-md p-4 hover:bg-foreground/10">
          <div className="flex items-center gap-2 font-bold text-accent-foreground">
            <span className="py-1">
              <PenIcon />
            </span>
            <h3>Display Name</h3>
          </div>
          <form className="flex items-center gap-4">
            <Input
              type="text"
              className="peer border-transparent bg-transparent duration-300 group-hover:bg-base-background/60 group-hover:ring-2 group-hover:ring-neutral-300"
              defaultValue={session?.name || ""}
              placeholder="Your display name"
            />
            <button className="btn-outline-base !px-8 opacity-0 duration-300 group-hover:opacity-100 peer-focus-visible:opacity-100">
              {session?.name ? "Edit" : "Add"}
            </button>
          </form>
        </div>
        <div className="neu-base group flex shrink grow basis-0 flex-col gap-1 rounded-md p-4 hover:bg-foreground/10">
          <div className="flex items-center gap-2 font-bold text-accent-foreground">
            <span className="text-2xl font-semibold">🗒</span>
            <h3>Short Description</h3>
          </div>
          <UserDescriptionForm />
        </div>
      </div>
    </section>
  );
}
