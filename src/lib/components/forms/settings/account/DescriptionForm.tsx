import { FormEvent } from "react";

import userPatchFetch from "@/lib/actions/server/userPatchFetch";
import { Input } from "@/lib/components/ui/input";
import { useSession } from "@/lib/contexts/SessionContext";
import { useToast } from "@/lib/hooks/use-toast";

export default function DescriptionForm() {
  const { session } = useSession();
  const { toast } = useToast();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const description = (e.currentTarget.firstChild as HTMLInputElement).value;
    const response = await userPatchFetch(session, { description });
    if (response.session) {
      localStorage.setItem(
        `${process.env.NEXT_PUBLIC_SESSION}`,
        response.session
      );
      toast({
        title: "Description updated successfully.",
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
  };

  return (
    <form
      method="post"
      className="flex items-center gap-4"
      onSubmit={handleSubmit}
    >
      <Input
        type="text"
        name="description"
        id="user-description"
        className="peer border-transparent bg-transparent duration-300 group-hover:bg-base-background/60 group-hover:ring-2 group-hover:ring-neutral-300"
        defaultValue={session?.desc || ""}
        placeholder="Something about you"
      />
      <button
        type="submit"
        className="btn-outline-base hidden !px-8 group-hover:block"
      >
        {session?.desc ? "Edit" : "Add"}
      </button>
    </form>
  );
}
