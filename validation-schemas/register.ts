import { addPasswordFieldIssue, passwordSchema } from "@/lib/utils";
import z from "zod";

export const registerFormSchema = z
  .object({
    name: z.string().trim().min(1, "Imię jest wymagane"),
    email: z
      .email("Nieprawidłowy adres email")
      .min(1, "Email jest wymagany")
      .trim()
      .lowercase(),
    password: passwordSchema,
    repeatPassword: passwordSchema,
  })
  .superRefine(({ repeatPassword, password }, ctx) => {
    if (repeatPassword !== password) {
      addPasswordFieldIssue("password", ctx);
      addPasswordFieldIssue("repeatPassword", ctx);
    }
  });

export type RegisterFormProps = z.infer<typeof registerFormSchema>;
