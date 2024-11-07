import patchClientFetch from "@/lib/actions/client/patchClientFetch";
import userPatchFetch from "@/lib/actions/server/userPatchFetch";
import { Input } from "@/lib/components/ui/input";
import { useSession } from "@/lib/contexts/SessionContext";
import { useToast } from "@/lib/hooks/use-toast";
import { FormEvent } from "react";

export default function UserDescriptionForm() {
  const { session } = useSession();
  const { toast } = useToast();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const description = (e.currentTarget.firstChild as HTMLInputElement).value;
    const response = await userPatchFetch({ ...session, description }, "user");
    if (response.session) {
      localStorage.setItem(
        `${process.env.NEXT_PUBLIC_SESSION}`,
        response.session
      );
      toast({
        title: "Description updated successfully.",
        duration: 1500,
        className: "toast-base"
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
        className="peer border-transparent bg-transparent duration-300 group-hover:bg-base-background/60 group-hover:ring-2 group-hover:ring-neutral-300"
        defaultValue={session?.desc || ""}
        placeholder="Something about you"
      />
      <button className="btn-outline-base !px-8 opacity-0 duration-300 group-hover:opacity-100 peer-focus-visible:opacity-100">
        {session?.desc ? "Edit" : "Add"}
      </button>
    </form>
  );
}
