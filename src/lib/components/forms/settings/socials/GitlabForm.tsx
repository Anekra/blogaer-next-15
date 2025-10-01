import { FormEvent } from "react";
import { toast } from "sonner";
import { z } from "zod";

import patchClientFetch from "@/lib/actions/client/patchClientFetch";
import { Input } from "@/lib/components/ui/input";
import { UrlSchema } from "@/lib/types/zodSchemas";

export default function GitlabForm({ link }: { link?: string }) {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const gitlabLink = (e.currentTarget.firstChild as HTMLInputElement).value;
    try {
      const link = UrlSchema.parse(gitlabLink);
      const response = await patchClientFetch(
        { social: "gitlab", link: gitlabLink },
        "/user/socials"
      );
      if (response.message) {
        toast.success(
          `Your Gitlab link has been ${link ? "updated." : "added."}`,
          {
            position: "bottom-right",
            duration: 1500
          }
        );
      } else {
        toast.error(response.error, {
          position: "bottom-right",
          duration: 1500
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error("Not a valid url!", {
          position: "bottom-right",
          duration: 1500
        });
      }
    }
  };

  return (
    <form
      className="focus-within:group-has-[input:placeholder-shown]:social-form-empty flex items-center gap-4"
      onSubmit={handleSubmit}
    >
      <Input
        type="text"
        name="gitlabLink"
        id="gitlab-link"
        className="peer border-transparent bg-transparent! transition-[width] focus:placeholder-shown:ring-destructive-foreground! group-hover:bg-background/90! group-hover:ring-2 group-hover:ring-white group-hover:ring-offset-black"
        defaultValue={link || ""}
        placeholder="Your Gitlab profile link"
      />
      <button
        type="submit"
        className="btn-outline-socials hidden px-8! text-white! group-hover:block peer-placeholder-shown:group-hover:hidden peer-focus-within:block peer-placeholder-shown:peer-focus-within:hidden"
      >
        {link ? "Edit" : "Add"}
      </button>
    </form>
  );
}
