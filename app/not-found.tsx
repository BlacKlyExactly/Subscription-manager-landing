import Link from "next/link";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 text-center px-6">
      <Typography size="h1" className="text-primary">
        404
      </Typography>
      <Typography size="h2">Strona nie istnieje</Typography>
      <Typography className="text-muted-foreground max-w-sm">
        Nie znaleźliśmy strony, której szukasz. Sprawdź adres URL lub wróć na
        stronę główną.
      </Typography>
      <Link href="/">
        <Button className="mt-2">
          <Home className="size-4" />
          Strona główna
        </Button>
      </Link>
    </main>
  );
}
