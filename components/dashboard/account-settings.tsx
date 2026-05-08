"use client";

import { useTransition } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { User, Lock, Trash2 } from "lucide-react";

import { Typography } from "@/components/ui/typography";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Submit } from "@/components/ui/submit";
import { ErrorMsg } from "@/components/ui/error-msg";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth/auth-context";
import {
  updateNameSchema,
  updatePasswordSchema,
  type UpdateNameInput,
  type UpdatePasswordInput,
} from "@/validation-schemas/account";
import {
  updateNameAction,
  updatePasswordAction,
  deleteAccountAction,
} from "@/actions/account";

type Props = {
  initialName: string;
  email: string;
};

export function AccountSettings({ initialName, email }: Props) {
  const { setUser } = useAuth();
  const router = useRouter();

  return (
    <div className="space-y-8">
      <div>
        <Typography size="h2">Ustawienia konta</Typography>
        <Typography className="text-muted-foreground mt-1">
          Zarządzaj swoim profilem i bezpieczeństwem.
        </Typography>
      </div>

      <ProfileSection initialName={initialName} email={email} />
      <PasswordSection />
      <DangerSection
        onDeleted={() => {
          setUser(null);
          router.replace("/");
        }}
      />
    </div>
  );
}

function ProfileSection({
  initialName,
  email,
}: {
  initialName: string;
  email: string;
}) {
  const { user, setUser } = useAuth();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateNameInput>({
    resolver: zodResolver(updateNameSchema),
    defaultValues: { name: initialName },
  });

  const onSubmit: SubmitHandler<UpdateNameInput> = (data) => {
    startTransition(async () => {
      const result = await updateNameAction(data);
      if (!result.success) {
        toast.error(result.error);
        return;
      }
      if (user) setUser({ ...user, name: result.data.name });
      toast.success("Nazwa została zaktualizowana.");
    });
  };

  return (
    <section className="rounded-2xl border border-foreground/10 bg-card p-6 space-y-5">
      <div className="flex items-center gap-2">
        <User className="size-4 text-primary" />
        <Typography size="h4" as="h2">
          Profil
        </Typography>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-sm">
        <div className="grid gap-2">
          <Label htmlFor="name">Imię</Label>
          <Input id="name" {...register("name")} aria-invalid={!!errors.name} />
          {errors.name && <ErrorMsg>{errors.name.message}</ErrorMsg>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" value={email} disabled />
        </div>
        <Submit isPending={isPending} pendingText="Zapisywanie...">
          Zapisz zmiany
        </Submit>
      </form>
    </section>
  );
}

function PasswordSection() {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdatePasswordInput>({
    resolver: zodResolver(updatePasswordSchema),
  });

  const onSubmit: SubmitHandler<UpdatePasswordInput> = (data) => {
    startTransition(async () => {
      const result = await updatePasswordAction(data);
      if (!result.success) {
        toast.error(result.error);
        return;
      }
      toast.success("Hasło zostało zmienione.");
      reset();
    });
  };

  return (
    <section className="rounded-2xl border border-foreground/10 bg-card p-6 space-y-5">
      <div className="flex items-center gap-2">
        <Lock className="size-4 text-primary" />
        <Typography size="h4" as="h2">
          Zmiana hasła
        </Typography>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-sm">
        <div className="grid gap-2">
          <Label htmlFor="currentPassword">Aktualne hasło</Label>
          <Input
            id="currentPassword"
            type="password"
            {...register("currentPassword")}
            aria-invalid={!!errors.currentPassword}
          />
          {errors.currentPassword && (
            <ErrorMsg>{errors.currentPassword.message}</ErrorMsg>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="newPassword">Nowe hasło</Label>
          <Input
            id="newPassword"
            type="password"
            {...register("newPassword")}
            aria-invalid={!!errors.newPassword}
          />
          {errors.newPassword && (
            <ErrorMsg>{errors.newPassword.message}</ErrorMsg>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">Powtórz nowe hasło</Label>
          <Input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
            aria-invalid={!!errors.confirmPassword}
          />
          {errors.confirmPassword && (
            <ErrorMsg>{errors.confirmPassword.message}</ErrorMsg>
          )}
        </div>
        <Submit isPending={isPending} pendingText="Zmienianie...">
          Zmień hasło
        </Submit>
      </form>
    </section>
  );
}

function DangerSection({ onDeleted }: { onDeleted: () => void }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteAccountAction();
      if (!result.success) {
        toast.error(result.error);
        return;
      }
      onDeleted();
    });
  };

  return (
    <section className="rounded-2xl border border-destructive/40 bg-card p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Trash2 className="size-4 text-destructive" />
        <Typography size="h4" as="h2" className="text-destructive">
          Strefa niebezpieczna
        </Typography>
      </div>
      <Typography className="text-muted-foreground text-sm max-w-md">
        Usunięcie konta jest nieodwracalne. Wszystkie Twoje subskrypcje i dane
        zostaną trwale usunięte.
      </Typography>
      <Submit
        variant="destructive"
        isPending={isPending}
        pendingText="Usuwanie..."
        onClick={handleDelete}
        type="button"
      >
        <Trash2 className="size-4" />
        Usuń konto
      </Submit>
    </section>
  );
}
