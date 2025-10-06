"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";

import register from "@/lib/actions/server/auth/register";
import FormIndicator from "@/lib/components/forms/FormIndicator";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/lib/components/ui/form";
import { Input } from "@/lib/components/ui/input";
import { RegisterFormSchema } from "@/lib/types/zodSchemas";
import { useLoading } from "@/lib/contexts/LoadingContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ErrorType } from "@/lib/utils/enums";

type FormValues = {
  username: string;
  email: string;
  password: string;
};

export default function RegisterForm() {
  const { setLoading } = useLoading();
  const router = useRouter();
  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: ""
    },
    mode: "onChange"
  });
  const handleRegister = async (values: FormValues) => {
    setLoading(true);
    const response = await register(values);
    if (!response || typeof response !== "boolean") {
      const errorMessage =
        typeof response !== "boolean"
          ? response?.error
          : ErrorType.FETCH_FAILED_ERROR;
      toast.error(errorMessage, {
        position: "bottom-right",
        duration: 1500
      });
    } else {
      router.replace("/register/verify-email");
    }
    setLoading(false);
  };

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit((values) => handleRegister(values))}
        noValidate
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field, fieldState }) => (
            <FormItem className="flex flex-col">
              <div className="flex items-center justify-between">
                <FormLabel>Username</FormLabel>
                <FormIndicator
                  fieldError={fieldState.error}
                  value={field.value}
                  formType="register"
                />
              </div>
              <FormControl>
                <Input
                  placeholder="Enter new username"
                  type="text"
                  className={`${
                    fieldState.error
                      ? "mt-1 mb-1 border border-red-500 focus:mt-2 focus:border-none enabled:focus-visible:ring-red-500"
                      : "focus-visible:ring-ring mt-2"
                  }`}
                  {...field}
                />
              </FormControl>
              <FormMessage className="bg-background/60 w-fit rounded px-1">
                {fieldState.error?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem className="flex flex-col">
              <div className="flex items-center justify-between">
                <FormLabel>Email</FormLabel>
                <FormIndicator
                  fieldError={fieldState.error}
                  value={field.value}
                  formType="register"
                />
              </div>
              <FormControl>
                <Input
                  placeholder="Enter your email"
                  type="email"
                  className={`${
                    fieldState.error
                      ? "mt-1 mb-1 border border-red-500 focus:mt-2 focus:border-none enabled:focus-visible:ring-red-500"
                      : "focus-visible:ring-ring mt-2"
                  }`}
                  {...field}
                />
              </FormControl>
              <FormMessage className="bg-background/60 w-fit rounded px-1">
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
              <div className="flex items-center justify-between">
                <FormLabel>Password</FormLabel>
                <FormIndicator
                  fieldError={fieldState.error}
                  value={field.value}
                  formType="register"
                />
              </div>
              <FormControl>
                <Input
                  placeholder="Enter new password"
                  type="password"
                  className={`${
                    fieldState.error
                      ? "mt-1 mb-1 border border-red-500 focus:mt-2 focus:border-none enabled:focus-visible:ring-red-500"
                      : "focus-visible:ring-ring mt-2"
                  }`}
                  {...field}
                />
              </FormControl>
              <FormMessage className="bg-background/60 w-fit rounded px-1">
                {fieldState.error?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <button
          type="submit"
          className="bg-primary-foreground text-primary mt-6 w-full rounded-md py-2 font-bold hover:shadow-[0_2px_4px_0_rgb(0,0,0,0.9)] active:translate-y-[4px] active:shadow-none dark:hover:shadow-[0_2px_4px_0_rgb(255,255,255,0.9)] dark:hover:active:shadow-none"
        >
          Create Account
        </button>
      </form>
    </FormProvider>
  );
}
