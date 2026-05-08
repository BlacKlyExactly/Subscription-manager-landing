import type { Metadata } from "next";
import { Typography } from "@/components/ui/typography";

export const metadata: Metadata = { title: "Sprawdź skrzynkę e-mail" };

const RegisterSuccess = () => {
  return (
    <main className="flex flex-col items-center justify-center flex-1 gap-8 py-12 md:py-0 px-8 md:px-0">
      <Typography size="h1" className="text-primary max-w-xl text-center">
        Pomyślnie utworzono konto!
      </Typography>
      <Typography className="text-center">
        Sprawdź skrzynkę mailową, aby aktywować konto
      </Typography>
    </main>
  );
};

export default RegisterSuccess;
