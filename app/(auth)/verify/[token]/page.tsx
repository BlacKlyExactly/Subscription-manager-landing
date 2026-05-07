import { redirect } from "next/navigation";
import { verifyActivationTokenAction } from "@/actions";
import { Typography } from "@/components/ui/typography";

const VerifyAccount = async ({ params }: PageProps<"/verify/[token]">) => {
  const { token } = await params;

  const result = await verifyActivationTokenAction(token);

  if (result.success) {
    redirect("/login");
  }

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4">
      <Typography size="h1" className="text-red-500">
        Błąd aktywacji
      </Typography>
      <Typography>{result.error ?? "Nie udało się aktywować konta"}</Typography>
    </main>
  );
};

export default VerifyAccount;
