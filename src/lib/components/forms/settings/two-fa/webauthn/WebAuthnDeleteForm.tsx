import { FormEvent } from "react";

import deleteClientFetch from "@/lib/actions/client/deleteClientFetch";
import { DialogClose } from "@/lib/components/ui/dialog";
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
    <form method="post" onSubmit={handleSubmit} className="mt-6 flex gap-6">
      <DialogClose className="btn-outline-base flex-1">Cancel</DialogClose>
      <DialogClose className="btn-solid-destructive flex-1" type="submit">
        Delete
      </DialogClose>
    </form>
  );
}
