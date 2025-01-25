"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { getBrowserFingerprint } from "fingerprint-browser";
import { useRouter, useSearchParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";

import checkTwoFA from "@/lib/actions/server/auth/checkTwoFA";
import login from "@/lib/actions/server/auth/login";
import FormIndicator from "@/lib/components/forms/FormIndicator";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/lib/components/ui/form";
import { Input } from "@/lib/components/ui/input";
import { useLoading } from "@/lib/contexts/LoadingContext";
import { useToast } from "@/lib/hooks/use-toast";
import { LoginFormSchema } from "@/lib/types/zodSchemas";
import { ErrorTypes } from "@/lib/utils/enums";
import { verifyPasskeyLogin } from "@/lib/utils/helper";

type FormValues = {
  emailOrUsername: string;
  password: string;
};

export default function LoginForm() {
  const { setLoading } = useLoading();
  const { toast } = useToast();
  const router = useRouter();
  const redirectUrl = useSearchParams().get("request_url");
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    mode: "onChange",
    defaultValues: {
      emailOrUsername: "",
      password: ""
    }
  });
  const handleLogin = async (values: FormValues) => {
    setLoading(true);
    const clientId = getBrowserFingerprint();

    const isTwoFAResOk = await checkTwoFA(values.emailOrUsername);

    let response = null;
    if (!isTwoFAResOk) {
      response = await login({ ...values, clientId });
    } else {
      response = await verifyPasskeyLogin(values.emailOrUsername);
    }

    if (!response || typeof response !== "boolean") {
      if (typeof response !== "boolean" && response?.status) {
        form.setError(
          response.status === "Unauthorized" ? "password" : "emailOrUsername",
          {
            type: "custom",
            message: response.error
          }
        );
      }
      const errorMessage =
        typeof response !== "boolean"
          ? response?.error
          : ErrorTypes.FETCH_FAILED_ERROR;
      toast({
        title: errorMessage,
        duration: 2000,
        variant: "destructive"
      });
    } else {
      router.replace(redirectUrl || "/home");
    }
    setLoading(false);
  };

  return (
    <FormProvider {...form}>
      <form
        method="POST"
        onSubmit={form.handleSubmit(async (values) => handleLogin(values))}
        className="flex flex-col"
        noValidate
      >
        <FormField
          control={form.control}
          name="emailOrUsername"
          render={({ field, fieldState }) => (
            <FormItem
              className={`flex flex-col${fieldState.error ? " mb-2" : " mb-4"}`}
            >
              <div className="flex items-center">
                <FormLabel>Email or username</FormLabel>
                <FormIndicator
                  fieldError={fieldState.error}
                  value={field.value}
                  formType="login"
                />
              </div>
              <FormControl>
                <Input
                  placeholder="Enter your email or username"
                  type="text"
                  className={`${
                    fieldState.error
                      ? "mb-1 border border-red-500 focus:border-none focus-visible:ring-red-500"
                      : "mt-2 focus-visible:ring-ring"
                  }`}
                  {...field}
                />
              </FormControl>
              <FormMessage className="w-fit rounded bg-background/60 p-1">
                {fieldState.error?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <FormItem className="flex flex-col">
              <div className="flex items-center">
                <FormLabel>Password</FormLabel>
                <FormIndicator
                  fieldError={fieldState.error}
                  value={field.value}
                  formType="login"
                />
              </div>
              <FormControl>
                <Input
                  placeholder="Enter new password"
                  type="password"
                  className={`${
                    fieldState.error
                      ? "mb-1 border border-red-500 focus:border-none focus-visible:ring-red-500"
                      : "mt-2 focus-visible:ring-ring"
                  }`}
                  {...field}
                />
              </FormControl>
              <FormMessage className="w-fit rounded bg-background/60 p-1">
                {fieldState.error?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <button type="submit" className="btn-solid-p mt-6">
          Login
        </button>
      </form>
    </FormProvider>
  );
}
