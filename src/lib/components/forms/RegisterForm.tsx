"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";

import register from "@/lib/actions/auth/register";
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

export default function RegisterForm() {
  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: ""
    },
    mode: "onChange"
  });

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit((values) => register(values))}
        className="flex flex-col gap-4"
        noValidate
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field, fieldState }) => (
            <FormItem className="flex flex-col">
              <div className="flex items-center">
                <FormLabel className="grow">Username</FormLabel>
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
                      ? "border border-red-500 focus:border-none focus-visible:ring-red-500"
                      : "focus-visible:ring-ring"
                  }`}
                  {...field}
                />
              </FormControl>
              <FormMessage>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem className="flex flex-col">
              <div className="flex items-center">
                <FormLabel className="grow">Email</FormLabel>
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
                      ? "border border-red-500 focus:border-none focus-visible:ring-red-500"
                      : "focus-visible:ring-ring"
                  }`}
                  {...field}
                />
              </FormControl>
              <FormMessage>{fieldState.error?.message}</FormMessage>
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
                  formType="register"
                />
              </div>
              <FormControl>
                <Input
                  placeholder="Enter new password"
                  type="password"
                  className={`${
                    fieldState.error
                      ? "border border-red-500 focus:border-none focus-visible:ring-red-500"
                      : "focus-visible:ring-ring"
                  }`}
                  {...field}
                />
              </FormControl>
              <FormMessage className="w-fit rounded bg-background/60 px-1">
                {fieldState.error?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <button
          type="submit"
          className="mt-6 w-full rounded-md bg-primary-foreground py-2 font-bold text-primary hover:shadow-[0_2px_4px_0_rgb(0,0,0,0.9)] active:translate-y-[4px] active:shadow-none dark:hover:shadow-[0_2px_4px_0_rgb(255,255,255,0.9)] dark:hover:active:shadow-none"
        >
          Create Account
        </button>
      </form>
    </FormProvider>
  );
}
