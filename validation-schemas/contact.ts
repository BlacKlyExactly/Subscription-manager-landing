import z from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(1, "Imię jest wymagane").max(100),
  email: z.string().trim().email("Nieprawidłowy adres email"),
  message: z.string().trim().min(10, "Wiadomość musi mieć co najmniej 10 znaków").max(2000),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
