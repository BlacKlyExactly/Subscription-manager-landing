import { Typography } from "@/components/ui/typography";

export const metadata = {
  title: "Regulamin",
};

export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 flex flex-col gap-10 flex-1">
      <div className="space-y-2">
        <Typography size="h1">Regulamin</Typography>
        <Typography className="text-muted-foreground">
          Ostatnia aktualizacja: maj 2026
        </Typography>
      </div>

      <div className="rounded-2xl border border-primary/30 bg-primary/5 px-6 py-4">
        <Typography className="text-primary font-medium">
          Aplikacja demonstracyjna
        </Typography>
        <Typography size="small" className="text-primary/80 mt-1">
          SubTracker to aplikacja demonstracyjna stworzona w celach
          prezentacyjnych. Żadne płatności nie są przetwarzane. Plan Pro można
          włączyć bezpłatnie wyłącznie w celu przetestowania funkcji aplikacji.
        </Typography>
      </div>

      <Section title="1. Postanowienia ogólne">
        <Typography>
          Niniejszy regulamin określa zasady korzystania z aplikacji SubTracker
          (dalej: „Aplikacja"). Korzystając z Aplikacji, akceptujesz poniższe
          warunki w całości. Jeśli nie zgadzasz się z którymkolwiek z warunków,
          prosimy o zaprzestanie korzystania z Aplikacji.
        </Typography>
      </Section>

      <Section title="2. Charakter aplikacji">
        <Typography>
          SubTracker jest aplikacją demonstracyjną służącą do śledzenia
          subskrypcji cyfrowych. Aplikacja umożliwia zapisywanie informacji o
          subskrypcjach, przeglądanie statystyk oraz otrzymywanie przypomnień
          e-mail — wyłącznie w celach informacyjnych i prezentacyjnych.
        </Typography>
        <Typography>
          Aplikacja nie przetwarza żadnych płatności. Opcja „Plan Pro" jest
          udostępniana bezpłatnie i służy wyłącznie prezentacji funkcji
          premium. Nie pobieramy żadnych opłat od użytkowników.
        </Typography>
      </Section>

      <Section title="3. Rejestracja i konto">
        <Typography>
          Korzystanie z pełnej funkcjonalności Aplikacji wymaga założenia konta.
          Użytkownik zobowiązuje się do podania prawdziwych danych podczas
          rejestracji oraz do ochrony swoich danych logowania przed dostępem
          osób trzecich.
        </Typography>
        <Typography>
          Użytkownik może w dowolnym momencie usunąć swoje konto z poziomu
          ustawień. Usunięcie konta jest nieodwracalne i powoduje trwałe
          usunięcie wszystkich powiązanych danych.
        </Typography>
      </Section>

      <Section title="4. Dozwolone użytkowanie">
        <Typography>
          Użytkownik zobowiązuje się korzystać z Aplikacji zgodnie z
          obowiązującym prawem i wyłącznie w celach zgodnych z niniejszym
          regulaminem. Zabronione jest w szczególności:
        </Typography>
        <ul className="list-disc list-inside space-y-1 text-foreground/80 text-base">
          <li>próba nieautoryzowanego dostępu do cudzych kont,</li>
          <li>automatyczne masowe pobieranie danych z Aplikacji,</li>
          <li>wprowadzanie treści obraźliwych lub niezgodnych z prawem.</li>
        </ul>
      </Section>

      <Section title="5. Dostępność usługi">
        <Typography>
          Ponieważ Aplikacja ma charakter demonstracyjny, nie gwarantujemy
          nieprzerwanej dostępności serwisu. Zastrzegamy prawo do modyfikacji,
          zawieszenia lub wyłączenia Aplikacji w dowolnym momencie bez
          wcześniejszego powiadomienia.
        </Typography>
      </Section>

      <Section title="6. Odpowiedzialność">
        <Typography>
          Aplikacja jest udostępniana w stanie „takim, jaki jest", bez
          jakichkolwiek gwarancji. Nie ponosimy odpowiedzialności za
          ewentualne błędy, przerwy w działaniu ani utratę danych.
          Użytkownik korzysta z Aplikacji na własne ryzyko.
        </Typography>
      </Section>

      <Section title="7. Zmiany regulaminu">
        <Typography>
          Zastrzegamy prawo do zmiany niniejszego regulaminu w dowolnym
          momencie. O istotnych zmianach użytkownicy mogą być informowani
          poprzez powiadomienie widoczne w Aplikacji.
        </Typography>
      </Section>

      <Section title="8. Kontakt">
        <Typography>
          W razie pytań dotyczących regulaminu skontaktuj się z nami przez
          stronę kontaktową Aplikacji.
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
