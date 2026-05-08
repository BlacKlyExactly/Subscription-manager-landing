"use server";

import { Result } from ".";
import { contactFormSchema, type ContactFormInput } from "@/validation-schemas/contact";

export const sendContactAction = async (data: ContactFormInput) => {
  const parsed = contactFormSchema.safeParse(data);
  if (!parsed.success) return Result.error("Nieprawidłowe dane formularza");

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) return Result.error("Serwis kontaktowy jest niedostępny");

  const { name, email, message } = parsed.data;

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      embeds: [
        {
          title: "Nowa wiadomość kontaktowa",
          color: 0x432dd7,
          fields: [
            { name: "Imię", value: name, inline: true },
            { name: "Email", value: email, inline: true },
            { name: "Wiadomość", value: message },
          ],
          timestamp: new Date().toISOString(),
        },
      ],
    }),
  });

  if (!res.ok) return Result.error("Nie udało się wysłać wiadomości");

  return Result.ok(null);
};
