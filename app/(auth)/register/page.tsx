"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Mail, User } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMsg } from "@/components/ui/error-msg";
import Link from "next/link";
import {
  RegisterFormProps,
  registerFormSchema,
} from "@/validation-schemas/register";
import { useTransition } from "react";
import { Submit } from "@/components/ui/submit";
import { registerAction } from "@/actions";
import { toast } from "sonner";

const RegisterPage = () => {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerFormSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormProps> = (data) => {
    startTransition(async () => {
      const result = await registerAction(data);
      if (!result.success) toast.error(result.error);
    });
  };

  return (
    <main className="flex-1 flex items-center justify-center pb-8 pt-8 md:pt-0 px-4 md:px-0">
      <Card className="max-w-sm w-full bg-background">
        <CardHeader>
          <CardTitle className="text-primary">Zarejestruj się</CardTitle>
          <CardDescription>Aby zacząc korzystać</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-3">
              <Label htmlFor="name">
                <User className="size-4 text-primary" />
                Imię
              </Label>
              <Input
                {...register("name")}
                id="name"
                aria-invalid={!!errors.name}
              />
              {errors.name && <ErrorMsg>{errors.name.message}</ErrorMsg>}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">
                <Mail className="size-4 text-primary" />
                Email
              </Label>
              <Input
                {...register("email")}
                id="email"
                aria-invalid={!!errors.email}
              />
              {errors.email && <ErrorMsg>{errors.email.message}</ErrorMsg>}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="password">
                <Lock className="size-4 text-primary" />
                Hasło
              </Label>
              <Input
                {...register("password")}
                id="password"
                aria-invalid={!!errors.password}
                type="password"
              />
              {errors.password && (
                <ErrorMsg>{errors.password.message}</ErrorMsg>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="repeatPassword">
                <Lock className="size-4 text-primary" />
                Powtórz hasło
              </Label>
              <Input
                {...register("repeatPassword")}
                id="repeatPassword"
                aria-invalid={!!errors.repeatPassword}
                type="password"
              />
              {errors.repeatPassword && (
                <ErrorMsg>{errors.repeatPassword.message}</ErrorMsg>
              )}
            </div>
            <Submit isPending={isPending} pendingText="Rejestrowanie...">
              Zarejestruj
            </Submit>
          </form>
        </CardContent>
        <CardFooter>
          <Link href="/login" className="underline text-primary">
            Masz już konto? Zaloguj się!
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
};

export default RegisterPage;
