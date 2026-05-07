import { Typography } from "@/components/ui/typography";

const RegisterSuccess = () => {
  return (
    <main className="flex flex-col items-center justify-center flex-1 gap-8">
      <Typography size="h1" className="text-primary max-w-xl text-center">
        Pomyślnie utworzono konto!
      </Typography>
      <Typography>Sprawdź skrzynkę mailową, aby aktywować konto</Typography>
    </main>
  );
};

export default RegisterSuccess;
