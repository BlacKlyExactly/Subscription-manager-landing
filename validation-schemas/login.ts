import { passwordSchema } from "@/lib/utils";
import z from "zod";

export const loginFormSchema = z.object({
  email: z
    .email("Nieprawidłowy adres email")
    .min(1, "Email jest wymagany")
    .trim()
    .lowercase(),
  password: passwordSchema,
});

export type LoginFormProps = z.infer<typeof loginFormSchema>;
