import { KeyRoundIcon } from "lucide-react";
import { FormEvent } from "react";

import deleteClientFetch from "@/lib/actions/client/deleteClientFetch";
import { useToast } from "@/lib/hooks/use-toast";

export default function WebAuthnDeleteForm({
  setIsPasskey
}: {
  setIsPasskey: (value: boolean) => void;
}) {
  const { toast } = useToast();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await deleteClientFetch("/user/security/two-fa/passkey");
    setIsPasskey(false);
    toast({
      title: "Passkey deleted.",
      duration: 1500,
      variant: "success"
    });
  };

  return (
    <form
      method="post"
      onSubmit={handleSubmit}
      className="flex items-center justify-between gap-2"
    >
      <span className="flex gap-2">
        <KeyRoundIcon />
        <label>Passkey</label>
      </span>
      <button
        type="submit"
        className="btn-solid-base-round bg-destructive text-destructive-foreground"
      >
        Delete
      </button>
    </form>
  );
}
