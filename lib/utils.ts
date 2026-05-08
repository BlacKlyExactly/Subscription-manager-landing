import { clsx, type ClassValue } from "clsx";
import { createHash, randomBytes } from "crypto";
import { twMerge } from "tailwind-merge";
import z from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const MIN_LENGTH = 8;
const FIELD_VALIDATION = {
  TEST: {
    SPECIAL_CHAR: (value: string) =>
      /[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/.test(value),
    LOWERCASE: (value: string) => /[a-z]/.test(value),
    UPPERCASE: (value: string) => /[A-Z]/.test(value),
    NUMBER: (value: string) => /.*[0-9].*/.test(value),
  },
  MSG: {
    MIN_LEN: `Hasło musi mieć conajmniej ${MIN_LENGTH} znaków`,
    SPECIAL_CHAR: "Hasło musi zawierać znak specjalny",
    LOWERCASE: "Hasło musi zawierać conajmniej jedną małą literę",
    UPPERCASE: "Hasło musi zawierać conajmniej jedną dużą literę",
    NUMBER: "Hasło musi zawierać conajmniej jedną cyfrę",
    MATCH: "Hasła muszą być identyczne",
  },
};

export const passwordSchema = z
  .string()
  .min(MIN_LENGTH, {
    message: FIELD_VALIDATION.MSG.MIN_LEN,
  })
  .refine(FIELD_VALIDATION.TEST.SPECIAL_CHAR, FIELD_VALIDATION.MSG.SPECIAL_CHAR)
  .refine(FIELD_VALIDATION.TEST.LOWERCASE, FIELD_VALIDATION.MSG.LOWERCASE)
  .refine(FIELD_VALIDATION.TEST.UPPERCASE, FIELD_VALIDATION.MSG.UPPERCASE)
  .refine(FIELD_VALIDATION.TEST.NUMBER, FIELD_VALIDATION.MSG.NUMBER);

export const addPasswordFieldIssue = (field: string, ctx: z.RefinementCtx) => {
  ctx.addIssue({
    code: "custom",
    message: FIELD_VALIDATION.MSG.MATCH,
    path: [field],
    fatal: true,
  });
};

export const generateToken = () => randomBytes(32).toString("hex");

export const hashToken = (token: string) =>
  createHash("sha256").update(token).digest("hex");

export const getExpiryHours = (hours: number) =>
  new Date(Date.now() + 1000 * 60 * 60 * hours);

export const baseUrl =
  process.env.NEXT_PUBLIC_APP_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");
