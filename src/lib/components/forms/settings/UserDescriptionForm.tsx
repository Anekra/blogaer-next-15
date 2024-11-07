import { Input } from "@/lib/components/ui/input";
import { useSession } from "@/lib/contexts/SessionContext";

export default function UserDescriptionForm() {
  const { session } = useSession();
  const handleSubmit = async () => {
    const res = await fetch("");
  };

  return (
    <form className="flex items-center gap-4">
      <Input
        type="text"
        name="description"
        className="peer border-transparent bg-transparent duration-300 group-hover:bg-base-background/60 group-hover:ring-2 group-hover:ring-neutral-300"
        defaultValue={session?.desc || ""}
        placeholder="Something about you"
        onSubmit={handleSubmit}
      />
      <button className="btn-outline-base !px-8 opacity-0 duration-300 group-hover:opacity-100 peer-focus-visible:opacity-100">
        {session?.desc ? "Edit" : "Add"}
      </button>
    </form>
  );
}
