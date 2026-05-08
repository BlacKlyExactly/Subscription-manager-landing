"use client";

import { useState, useTransition } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Mail, MessageSquare, User, CheckCircle } from "lucide-react";

import { Typography } from "@/components/ui/typography";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Submit } from "@/components/ui/submit";
import { ErrorMsg } from "@/components/ui/error-msg";
import {
  contactFormSchema,
  type ContactFormInput,
} from "@/validation-schemas/contact";
import { sendContactAction } from "@/actions/contact";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit: SubmitHandler<ContactFormInput> = (data) => {
    startTransition(async () => {
      const result = await sendContactAction(data);
      if (!result.success) {
        toast.error(result.error);
        return;
      }
      setSent(true);
    });
  };

  return (
    <main className="flex-1 flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-lg space-y-8 bg-background p-4">
        {sent ? (
          <div className="flex flex-col items-center text-center gap-4 py-12">
            <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center">
              <CheckCircle className="size-7 text-primary" />
            </div>
            <Typography size="h2">Wiadomość wysłana!</Typography>
            <Typography className="text-muted-foreground max-w-sm">
              Dziękujemy za kontakt. Postaramy się odpowiedzieć jak najszybciej.
            </Typography>
          </div>
        ) : (
          <>
            <div>
              <Typography size="h2">Kontakt</Typography>
              <Typography className="text-muted-foreground mt-1">
                Masz pytanie lub sugestię? Napisz do nas.
              </Typography>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid gap-2">
                <Label htmlFor="name">
                  <User className="size-4 text-primary" />
                  Imię i nazwisko
                </Label>
                <Input
                  id="name"
                  {...register("name")}
                  aria-invalid={!!errors.name}
                  placeholder="Jan Kowalski"
                />
                {errors.name && <ErrorMsg>{errors.name.message}</ErrorMsg>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">
                  <Mail className="size-4 text-primary" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  aria-invalid={!!errors.email}
                  placeholder="jan@example.com"
                />
                {errors.email && <ErrorMsg>{errors.email.message}</ErrorMsg>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="message">
                  <MessageSquare className="size-4 text-primary" />
                  Wiadomość
                </Label>
                <Textarea
                  id="message"
                  className="h-37.5"
                  {...register("message")}
                  aria-invalid={!!errors.message}
                  placeholder="W czym możemy pomóc?"
                  rows={5}
                />
                {errors.message && (
                  <ErrorMsg>{errors.message.message}</ErrorMsg>
                )}
              </div>

              <Submit
                isPending={isPending}
                pendingText="Wysyłanie..."
                className="w-full"
              >
                Wyślij wiadomość
              </Submit>
            </form>
          </>
        )}
      </div>
    </main>
  );
}
