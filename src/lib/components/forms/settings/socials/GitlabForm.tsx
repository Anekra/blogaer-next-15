import { FormEvent } from "react";
import { z } from "zod";

import patchClientFetch from "@/lib/actions/client/patchClientFetch";
import { Input } from "@/lib/components/ui/input";
import { useToast } from "@/lib/hooks/use-toast";
import { UrlSchema } from "@/lib/types/zodSchemas";

export default function GitlabForm({ link }: { link?: string }) {
  const { toast } = useToast();
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
        toast({
          title: `Your Gitlab link has been ${link ? "updated." : "added."}`,
          duration: 2000,
          variant: "success"
        });
      } else {
        toast({
          title: response.error,
          duration: 2000,
          variant: "destructive"
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Not a valid url!",
          duration: 2000,
          variant: "destructive"
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
        className="peer border-transparent !bg-transparent transition-[width] focus:placeholder-shown:!ring-destructive-foreground group-hover:!bg-base-background/90 group-hover:ring-2 group-hover:ring-white"
        defaultValue={link || ""}
        placeholder="Your Gitlab profile link"
      />
      <button
        type="submit"
        className="btn-outline-socials hidden !px-8 !text-white group-hover:block group-hover:peer-placeholder-shown:hidden peer-focus-within:block peer-focus-within:peer-placeholder-shown:hidden"
      >
        {link ? "Edit" : "Add"}
      </button>
    </form>
  );
}
