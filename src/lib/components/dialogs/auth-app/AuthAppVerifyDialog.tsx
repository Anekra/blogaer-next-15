import { SmartphoneIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";

import AuthAppInputForm from "@/lib/components/forms/settings/two-fa/auth-app/AuthAppInputForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from "@/lib/components/ui/dialog";
import { useLoading } from "@/lib/contexts/LoadingContext";
import { useToast } from "@/lib/hooks/use-toast";
import { verifyAuthAppLogin } from "@/lib/utils/helper";

export default function AuthAppVerifyDialog({
  username,
  openState: [opened, setOpened]
}: {
  username: string;
  openState: [boolean, Dispatch<SetStateAction<boolean>>];
}) {
  const { toast } = useToast();
  const router = useRouter();
  const redirectUrl = useSearchParams().get("request_url");
  const { isLoading, setLoading, setShowIcon } = useLoading();
  const [isResOk, setIsResOk] = useState<boolean | null>(null);
  const verifyToken = async (token: string) => {
    setLoading(true);
    setShowIcon(false);
    try {
      const res = await verifyAuthAppLogin(username, token);
      if (res) {
        setIsResOk(true);
        setOpened(false);
        router.replace(redirectUrl || "/home");
        toast({
          title: "Login successful.",
          duration: 1500,
          variant: "success"
        });
      } else {
        setIsResOk(false);
        toast({
          title: "Login failed!",
          duration: 1500,
          variant: "destructive"
        });
      }
    } catch (_) {
      setIsResOk(false);
      toast({
        title: "Login Failed!",
        duration: 1500,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={opened} onOpenChange={setOpened}>
      <DialogContent>
        <DialogTitle>Verify 2 Factor Authentication Token</DialogTitle>
        <DialogDescription className="justify-self-center">
          <SmartphoneIcon size={150} fill="black" fillOpacity={0.5} />
        </DialogDescription>
        <AuthAppInputForm
          isLoading={isLoading}
          isResOk={isResOk}
          verifyToken={verifyToken}
        />
      </DialogContent>
    </Dialog>
  );
}
