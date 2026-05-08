import { Typography } from "@/components/ui/typography";

export const metadata = {
  title: "Polityka prywatności",
};

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 flex flex-col gap-10 flex-1">
      <div className="space-y-2">
        <Typography size="h1">Polityka prywatności</Typography>
        <Typography className="text-muted-foreground">
          Ostatnia aktualizacja: maj 2026
        </Typography>
      </div>

      <div className="rounded-2xl border border-primary/30 bg-primary/5 px-6 py-4">
        <Typography className="text-primary font-medium">
          Aplikacja demonstracyjna
        </Typography>
        <Typography size="small" className="text-primary/80 mt-1">
          SubTracker to aplikacja demonstracyjna. Nie przetwarzamy żadnych
          płatności ani danych kart płatniczych. Dane wprowadzone do aplikacji
          służą wyłącznie celom prezentacyjnym.
        </Typography>
      </div>

      <Section title="1. Administrator danych">
        <Typography>
          Administratorem danych osobowych użytkowników Aplikacji SubTracker
          jest jej twórca. Aplikacja ma charakter demonstracyjny i nie prowadzi
          działalności komercyjnej.
        </Typography>
      </Section>

      <Section title="2. Jakie dane zbieramy">
        <Typography>
          Podczas rejestracji i korzystania z Aplikacji przetwarzamy
          następujące dane:
        </Typography>
        <ul className="list-disc list-inside space-y-1 text-foreground/80 text-base">
          <li>imię i nazwisko (podane przy rejestracji),</li>
          <li>adres e-mail,</li>
          <li>hasło przechowywane w postaci zaszyfrowanej (argon2),</li>
          <li>
            dane subskrypcji dodanych przez użytkownika (nazwy, kwoty, daty),
          </li>
          <li>dane sesji (hash tokenu, czas wygaśnięcia).</li>
        </ul>
        <Typography>
          Nie zbieramy ani nie przechowujemy danych kart płatniczych,
          numerów kont bankowych ani żadnych informacji finansowych.
        </Typography>
      </Section>

      <Section title="3. Cel przetwarzania danych">
        <Typography>
          Dane przetwarzane są wyłącznie w celu:
        </Typography>
        <ul className="list-disc list-inside space-y-1 text-foreground/80 text-base">
          <li>umożliwienia logowania i identyfikacji użytkownika,</li>
          <li>wyświetlania statystyk i wykresów subskrypcji,</li>
          <li>
            wysyłania przypomnień e-mail o zbliżających się odnowieniach (3
            dni przed datą odnowienia).
          </li>
        </ul>
      </Section>

      <Section title="4. Bezpieczeństwo danych">
        <Typography>
          Hasła przechowywane są wyłącznie w postaci skrótu kryptograficznego
          (algorytm argon2) — nigdy w postaci jawnej. Sesje użytkowników
          wygasają automatycznie po 7 dniach, po czym są usuwane z bazy danych.
          Komunikacja z serwerem odbywa się przez szyfrowane połączenie HTTPS.
        </Typography>
      </Section>

      <Section title="5. Udostępnianie danych">
        <Typography>
          Nie sprzedajemy ani nie udostępniamy danych osobowych użytkowników
          podmiotom trzecim. Dane mogą być przekazane wyłącznie dostawcy usług
          e-mail (Resend) w celu wysyłki przypomnień — wyłącznie adres e-mail
          i treść wiadomości.
        </Typography>
      </Section>

      <Section title="6. Prawa użytkownika">
        <Typography>
          Użytkownik ma prawo do:
        </Typography>
        <ul className="list-disc list-inside space-y-1 text-foreground/80 text-base">
          <li>dostępu do swoich danych,</li>
          <li>zmiany nazwy i hasła w ustawieniach konta,</li>
          <li>
            trwałego usunięcia konta wraz ze wszystkimi danymi (opcja dostępna
            w ustawieniach konta).
          </li>
        </ul>
      </Section>

      <Section title="7. Pliki cookie">
        <Typography>
          Aplikacja używa jednego pliku cookie sesji (
          <code className="text-sm bg-muted px-1 py-0.5 rounded">session</code>
          ), który przechowuje zaszyfrowany token autoryzacyjny. Cookie jest
          oznaczone jako <code className="text-sm bg-muted px-1 py-0.5 rounded">HttpOnly</code>{" "}
          i wygasa po 7 dniach. Nie używamy plików cookie śledzących ani
          analitycznych.
        </Typography>
      </Section>

      <Section title="8. Zmiany polityki prywatności">
        <Typography>
          Zastrzegamy prawo do aktualizacji niniejszej polityki prywatności.
          Wszelkie zmiany będą publikowane na tej stronie wraz z datą
          aktualizacji.
        </Typography>
      </Section>

      <Section title="9. Kontakt">
        <Typography>
          W sprawach dotyczących prywatności i ochrony danych prosimy o
          kontakt przez stronę kontaktową Aplikacji.
        </Typography>
      </Section>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <Typography size="h3">{title}</Typography>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
