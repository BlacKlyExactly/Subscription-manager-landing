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
import { Lock, Mail } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMsg } from "@/components/ui/error-msg";
import Link from "next/link";
import { LoginFormProps, loginFormSchema } from "@/validation-schemas/login";
import { useTransition } from "react";
import { loginAction } from "@/actions";
import { toast } from "sonner";
import { Submit } from "@/components/ui/submit";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/auth-context";

const LoginPage = () => {
  const { setUser } = useAuth();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit: SubmitHandler<LoginFormProps> = (data) => {
    startTransition(async () => {
      const result = await loginAction(data);

      if (!result.success) {
        toast.error(result.error);
        return;
      }

      setUser(result.data);
      router.replace("/dashboard");
    });
  };

  return (
    <main className="flex-1 flex items-center justify-center pb-8">
      <Card className="max-w-sm w-full bg-background">
        <CardHeader>
          <CardTitle className="text-primary">Zaloguj się</CardTitle>
          <CardDescription>
            Aby uzyskać dostęp do swoich statystyk
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
            <Submit isPending={isPending} pendingText="Logowanie...">
              Zaloguj
            </Submit>
          </form>
        </CardContent>
        <CardFooter>
          <Link href="/register" className="underline text-primary">
            Nie masz konta? Stwórz je!
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
};

export default LoginPage;
