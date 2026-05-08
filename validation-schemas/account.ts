import { addPasswordFieldIssue, passwordSchema } from "@/lib/utils";
import z from "zod";

export const updateNameSchema = z.object({
  name: z.string().trim().min(1, "Imię jest wymagane").max(100),
});

export const updatePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Aktualne hasło jest wymagane"),
    newPassword: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .superRefine(({ newPassword, confirmPassword }, ctx) => {
    if (newPassword !== confirmPassword) {
      addPasswordFieldIssue("newPassword", ctx);
      addPasswordFieldIssue("confirmPassword", ctx);
    }
  });

export type UpdateNameInput = z.infer<typeof updateNameSchema>;
export type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>;
