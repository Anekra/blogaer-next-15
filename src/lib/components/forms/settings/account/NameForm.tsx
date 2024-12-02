import userPatchFetch from "@/lib/actions/server/userPatchFetch";
import { Input } from "@/lib/components/ui/input";
import { useSession } from "@/lib/contexts/SessionContext";
import { useToast } from "@/lib/hooks/use-toast";
import { FormEvent } from "react";

export default function NameForm() {
  const { session } = useSession();
  const { toast } = useToast();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = (e.currentTarget.firstChild as HTMLInputElement).value;
    const response = await userPatchFetch(session, { name });
    if (response.session) {
      localStorage.setItem(
        `${process.env.NEXT_PUBLIC_SESSION}`,
        response.session
      );
      toast({
        title: "Display name updated successfully.",
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
        name="name"
        id="user-display-name"
        className="peer border-transparent bg-transparent duration-300 group-hover:bg-base-background/60 group-hover:ring-2 group-hover:ring-neutral-300"
        defaultValue={session?.name || ""}
        placeholder="Your display name"
      />
      <button
        type="submit"
        className="btn-outline-base !px-8 opacity-0 duration-300 group-hover:opacity-100 peer-focus-visible:opacity-100"
      >
        {session?.name ? "Edit" : "Add"}
      </button>
    </form>
  );
}