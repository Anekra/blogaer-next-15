"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { getBrowserFingerprint } from "fingerprint-browser";
import { useRouter, useSearchParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";

import login from "@/lib/actions/server/auth/login";
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

import FormIndicator from "@/lib/components/forms/FormIndicator";

type FormValues = {
  emailOrUsername: string;
  password: string;
};

export default function LoginForm() {
  const { setLoading } = useLoading();
  const router = useRouter();
  const { toast } = useToast();
  const redirectUrl = useSearchParams().get("request_url");
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      emailOrUsername: "",
      password: ""
    }
  });
  const handleLogin = async (values: FormValues) => {
    setLoading(true);
    const clientId = getBrowserFingerprint();
    const response = await login({ ...values, clientId });
    if (response.session) {
      localStorage.setItem(
        `${process.env.NEXT_PUBLIC_SESSION}`,
        response.session
      );
      if (redirectUrl) router.replace(redirectUrl);
      else router.replace("/home");
      toast({
        title: "Login successful.",
        duration: 2000,
        className: "toast-success"
      });
    } else {
      if (response.status) {
        form.setError(
          response.status === "Unauthorized" ? "password" : "emailOrUsername",
          {
            type: "custom",
            message: response.message
          }
        );
      }
      toast({
        title: response.message,
        duration: 2000,
        className: "toast-error"
      });
    }
    setLoading(false);
  };

  return (
    <FormProvider {...form}>
      <form
        method="POST"
        onSubmit={form.handleSubmit(async (values) => handleLogin(values))}
        className="flex flex-col gap-4"
        noValidate
      >
        <FormField
          control={form.control}
          name="emailOrUsername"
          render={({ field, fieldState }) => (
            <FormItem className="flex flex-col">
              <div className="flex items-center">
                <FormLabel className="grow">Email or username</FormLabel>
                <FormIndicator
                  fieldError={fieldState.error}
                  value={field.value}
                  formType="login"
                />
              </div>
              <FormControl>
                <Input
                  placeholder="Enter your email or username"
                  type="email"
                  className={`duration-300${
                    fieldState.error
                      ? " border border-red-500 focus:border-none focus-visible:ring-red-500"
                      : " focus-visible:ring-ring"
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
                <FormLabel className="grow">Password</FormLabel>
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
                  className={`duration-300${
                    fieldState.error
                      ? " border border-red-500 focus:border-none focus-visible:ring-red-500"
                      : " focus-visible:ring-ring"
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
