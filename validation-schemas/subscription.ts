import { z } from "zod";

export const subscriptionFormSchema = z.object({
  name: z.string().min(1, "Nazwa jest wymagana").max(100),
  price: z.coerce.number().min(0.01, "Cena musi być większa niż 0"),
  billingCycle: z.enum(["monthly", "yearly", "weekly"]),
  nextRenewalDate: z.string().min(1, "Data odnowienia jest wymagana"),
  category: z
    .enum(["streaming", "music", "software", "gaming", "news", "fitness", "other"])
    .optional(),
  emoji: z.string().max(10).optional(),
  notes: z.string().max(500).optional(),
});

export type SubscriptionFormProps = z.infer<typeof subscriptionFormSchema>;
