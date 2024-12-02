import { z } from "zod";

import { VALIDATION } from "@/lib/utils/constants";

export const RegisterFormSchema = z.object({
  username: z
    .string()
    .min(1, VALIDATION.USERNAME_EMPTY)
    .min(2, VALIDATION.USERNAME_MINIMUM)
    .regex(/^[^\s]+$/, VALIDATION.USERNAME_WHITESPACE),
  email: z
    .string()
    .min(1, VALIDATION.EMAIL_EMPTY)
    .min(2, VALIDATION.EMAIL_MINIMUM)
    .regex(/^[^\s]+$/, VALIDATION.EMAIL_WHITESPACE)
    .email(VALIDATION.EMAIL_FORMAT),
  password: z
    .string()
    .min(1, VALIDATION.PASSWORD_EMPTY)
    .min(8, VALIDATION.PASSWORD_MINIMUM)
    .regex(/^[^\s]+$/, VALIDATION.PASSWORD_WHITESPACE)
    .refine((value) => {
      const hasUppercase = /[A-Z]/.test(value);
      const hasLowercase = /[a-z]/.test(value);
      const hasNumber = /\d/.test(value);
      const hasSpecialChar = /[!@#$%^&*()_+]/g.test(value);

      return hasUppercase && hasLowercase && hasNumber && hasSpecialChar;
    }, VALIDATION.PASSWORD_STRENGTH)
});

export const LoginFormSchema = z.object({
  emailOrUsername: z.string().min(1, VALIDATION.EMAIL_OR_USERNAME_EMPTY),
  password: z.string().min(1, VALIDATION.PASSWORD_EMPTY)
});

export const UrlSchema = z.string().trim().url();
