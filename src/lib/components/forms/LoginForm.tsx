"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
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
import { LoginFormSchema } from "@/lib/types/zodSchemas";
import { ErrorType } from "@/lib/utils/enums";
import { verifyPasskeyLogin } from "@/lib/utils/helper";

type FormValues = {
  emailOrUsername: string;
  password: string;
};

export default function LoginForm() {
  const { setLoading } = useLoading();
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
    const isTwoFAResOk = await checkTwoFA(values.emailOrUsername);

    let response = null;
    if (!isTwoFAResOk) {
      response = await login(values);
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
          : ErrorType.FETCH_FAILED_ERROR;
      toast.error(errorMessage, {
        position: "bottom-right",
        duration: 1500
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
        className="flex flex-col"
        onSubmit={form.handleSubmit(async (values) => handleLogin(values))}
        noValidate
      >
        <FormField
          control={form.control}
          name="emailOrUsername"
          render={({ field, fieldState }) => (
            <FormItem
              className={`${fieldState.error ? "mb-2" : "mb-4"} flex flex-col`}
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
