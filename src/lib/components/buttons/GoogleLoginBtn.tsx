"use client";
import { getBrowserFingerprint } from "fingerprint-browser";
import { useRouter, useSearchParams } from "next/navigation";

import { useLoading } from "@/lib/contexts/LoadingContext";
import { newUrl } from "@/lib/utils/helper";

import GoogleIcon from "@/lib/components/icons/GoogleIcon";
import { useToast } from "@/lib/hooks/use-toast";

export default function GoogleLoginBtn() {
  const { setLoading } = useLoading();
  const router = useRouter();
  const { toast } = useToast();
  const redirectUrl = useSearchParams().get("request_url");
  const handleGoogleLogin = async () => {
    const random = crypto.randomUUID();
    const fingerprint = getBrowserFingerprint();
    const state = `${random}-${fingerprint}`;
    localStorage.setItem("CSRFToken", state);
    const searchParams = redirectUrl
      ? [
          { param: "state", value: state },
          { param: "request_url", value: redirectUrl }
        ]
      : [{ param: "state", value: state }];
    const url = newUrl("/api/auth/callback/google", searchParams);
    setLoading(true);
    const res = await fetch(url);
    const resJson = await res.json();
    const params = new URLSearchParams(resJson.url);
    const paramState = params.get("state");
    const localState = localStorage.getItem("CSRFToken");

    if (res.status === 302 && paramState === localState) {
      router.push(resJson.url);
    } else {
      setLoading(false);
      toast({
        title: "Denied CSRF detected!",
        duration: 2000,
        className: "toast-error"
      });
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="text-4xl text-primary-foreground hover:brightness-125"
    >
      <GoogleIcon />
    </button>
  );
}
