import { Typography } from "@/components/ui/typography";
import { CodeBlock } from "@/components/ui/code-block";
import { ReactNode } from "react";

export const metadata = {
  title: "Dokumentacja techniczna — SubTracker",
};

export default async function DocsPage() {
  return (
    <main className="max-w-screen lg:max-w-4xl mx-auto px-6 py-16 flex flex-col gap-12 flex-1 overflow-x-hidden">
      <div className="space-y-3">
        <Typography size="h1" className="text-3xl md:text-5xl">
          Dokumentacja techniczna
        </Typography>
        <Typography className="text-muted-foreground">
          SubTracker — aplikacja do zarządzania subskrypcjami cyfrowymi. Projekt
          demonstracyjny.
        </Typography>
        <div className="flex flex-wrap gap-2 pt-1">
          {[
            "Next.js 16",
            "React 19",
            "TypeScript",
            "PostgreSQL",
            "Drizzle ORM",
            "Tailwind CSS 4",
            "Zod",
            "Argon2",
            "Resend",
          ].map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      </div>
      <nav className="rounded-2xl border border-foreground/10 bg-card p-6 space-y-2">
        <Typography size="large" className="mb-3">
          Spis treści
        </Typography>
        {[
          ["1. Przegląd projektu", "#overview"],
          ["2. Stack technologiczny", "#stack"],
          ["3. Struktura projektu", "#structure"],
          ["4. Zmienne środowiskowe", "#env"],
          ["5. Schemat bazy danych", "#schema"],
          ["6. System autentykacji", "#auth"],
          ["7. Zarządzanie sesjami", "#sessions"],
          ["8. Plany i limitowanie funkcji", "#plans"],
          ["9. Server Actions", "#actions"],
          ["10. Zapytania (Queries)", "#queries"],
          ["11. API Routes", "#api"],
          ["12. Schematy walidacji (Zod)", "#validation"],
          ["13. Kluczowe komponenty", "#components"],
          ["14. System e-mail", "#email"],
          ["15. Eksport CSV", "#csv"],
          ["16. Szablony subskrypcji", "#templates"],
          ["17. Uruchomienie lokalne", "#setup"],
        ].map(([label, href]) => (
          <a
            key={href}
            href={href}
            className="block text-sm text-primary hover:underline"
          >
            {label}
          </a>
        ))}
      </nav>

      {/* 1 */}
      <Section id="overview" title="1. Przegląd projektu">
        <Typography>
          SubTracker to fullstack aplikacja webowa umożliwiająca użytkownikom
          śledzenie subskrypcji cyfrowych (streaming, muzyka, oprogramowanie,
          gry itp.). Aplikacja pozwala agregować cykliczne opłaty, wizualizować
          wydatki oraz otrzymywać e-mailowe powiadomienia o zbliżających się
          odnowieniach.
        </Typography>
        <Typography>
          Projekt jest <strong>demonstracyjny</strong> — plan Pro można
          aktywować bezpłatnie wyłącznie w celach prezentacyjnych. Żadne
          płatności nie są przetwarzane.
        </Typography>
        <SubSection title="Funkcje">
          <List
            items={[
              "Rejestracja i logowanie z weryfikacją e-mail",
              "Dodawanie, edytowanie, usuwanie i wstrzymywanie subskrypcji",
              "Katalog szablonów (30+ popularnych serwisów z cenami)",
              "Dashboard ze statystykami: suma miesięczna, roczna, liczba subskrypcji, następne odnowienie",
              "Wykresy: kołowy według kategorii, słupkowy kosztów, oś czasu odnowień (tylko Pro)",
              "E-mailowe przypomnienia 3 dni przed odnowieniem (cron job)",
              "Eksport danych do CSV (tylko Pro)",
              "Zarządzanie planem (Starter / Pro)",
              "Ustawienia konta: zmiana nazwy, hasła, usunięcie konta",
              "Strona kontaktowa z wysyłką przez Discord Webhook",
              "Tryb ciemny / jasny",
              "Responsywny layout (hamburger menu na mobile)",
            ]}
          />
        </SubSection>
      </Section>
      <Section id="stack" title="2. Stack technologiczny">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-foreground/10">
                <th className="text-left py-2 pr-4 font-semibold">Warstwa</th>
                <th className="text-left py-2 pr-4 font-semibold">
                  Technologia
                </th>
                <th className="text-left py-2 font-semibold">Wersja</th>
              </tr>
            </thead>
            <tbody className="text-foreground/80">
              {[
                ["Framework", "Next.js (App Router)", "16.2.1"],
                ["UI Library", "React", "19.2.4"],
                ["Język", "TypeScript", "^5"],
                ["Stylowanie", "Tailwind CSS", "^4"],
                ["Komponenty UI", "shadcn/ui + Radix UI", "—"],
                ["ORM", "Drizzle ORM", "^0.45"],
                ["Baza danych", "PostgreSQL (przez node-postgres)", "^8.20"],
                ["Haszowanie haseł", "Argon2", "^0.44"],
                ["Walidacja", "Zod", "^4.4"],
                ["Formularze", "React Hook Form", "^7.75"],
                ["Wykresy", "Recharts", "^3.8"],
                ["E-mail wysyłka", "Resend", "^6.12"],
                ["E-mail szablony", "React Email", "^6.0"],
                ["Toasty", "Sonner", "^2.0"],
                ["Drawer/modal", "Vaul", "^1.1"],
                ["Karuzela", "Embla Carousel", "^8.6"],
                ["Ikony", "Lucide React", "^1.7"],
              ].map(([layer, tech, version]) => (
                <tr key={layer} className="border-b border-foreground/5">
                  <td className="py-2 pr-4 font-medium">{layer}</td>
                  <td className="py-2 pr-4">{tech}</td>
                  <td className="py-2 font-mono text-xs text-muted-foreground">
                    {version}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
      <Section id="structure" title="3. Struktura projektu">
        <Typography>
          Projekt wykorzystuje Next.js App Router. Poniżej przedstawiona jest
          uproszczona struktura katalogów:
        </Typography>
        <CodeBlock lang="text">{`subscription-manager/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx          # Strona logowania
│   │   ├── register/page.tsx       # Strona rejestracji
│   │   ├── register-success/page.tsx
│   │   ├── verify/[token]/page.tsx # Weryfikacja e-mail
│   │   └── layout.tsx
│   ├── dashboard/
│   │   ├── page.tsx                # Główny panel
│   │   ├── billing/page.tsx        # Zarządzanie planem
│   │   ├── account/page.tsx        # Ustawienia konta
│   │   └── layout.tsx              # Guard: redirect jeśli niezalogowany
│   ├── api/
│   │   └── cron/reminders/route.ts # Cron job: przypomnienia e-mail
│   ├── contact/page.tsx
│   ├── docs/page.tsx               # Ta strona
│   ├── privacy/page.tsx
│   ├── terms/page.tsx
│   ├── not-found.tsx               # Strona 404
│   ├── layout.tsx                  # Root layout
│   └── page.tsx                    # Landing page
├── actions/                        # Next.js Server Actions
│   ├── index.ts                    # Result helper + re-eksporty
│   ├── login.ts
│   ├── logout.ts
│   ├── register.tsx
│   ├── verifyActivationToken.ts
│   ├── subscription.ts
│   ├── account.ts
│   ├── contact.ts
│   └── plan.ts
├── components/
│   ├── auth/
│   │   ├── auth-context.tsx        # React Context dla użytkownika
│   │   └── user-nav.tsx            # Dropdown awatara w nawigacji
│   ├── dashboard/
│   │   ├── charts/
│   │   │   ├── category-chart.tsx  # Wykres kołowy kategorii
│   │   │   ├── cost-chart.tsx      # Wykres słupkowy kosztów
│   │   │   ├── renewal-timeline.tsx
│   │   │   └── pro-chart-gate.tsx  # Blokada wykresów dla Starter
│   │   ├── add-subscription-sheet.tsx
│   │   ├── subscription-list.tsx
│   │   ├── subscription-item.tsx
│   │   ├── stats-cards.tsx
│   │   ├── template-picker.tsx
│   │   ├── export-button.tsx
│   │   ├── billing-plan.tsx
│   │   └── account-settings.tsx
│   ├── homepage/
│   │   ├── pricing-card.tsx
│   │   ├── faq.tsx
│   │   ├── testimonial-carousel.tsx
│   │   └── how-it-works-card.tsx
│   ├── ui/                         # Komponenty bazowe (shadcn/ui)
│   ├── nav.tsx
│   ├── footer.tsx
│   ├── hamburger-menu.tsx
│   └── pro-badge.tsx
├── queries/
│   ├── index.ts
│   ├── getCurrentUser.ts
│   └── getSubscriptions.ts
├── lib/
│   ├── drizzle/
│   │   ├── db.ts                   # Instancja Drizzle + Pool pg
│   │   └── schema.ts               # Definicje tabel
│   ├── utils.ts                    # cn(), passwordSchema, generateToken...
│   ├── subscription-utils.ts       # toMonthlyPLN(), formatPLN(), daysUntil()
│   └── subscription-templates.ts  # 30+ szablonów serwisów
├── validation-schemas/
│   ├── login.ts
│   ├── register.ts
│   ├── subscription.ts
│   ├── account.ts
│   └── contact.ts
└── emails/                         # Szablony React Email
    ├── activation.tsx
    └── renewal-reminder.tsx`}</CodeBlock>
      </Section>
      <Section id="env" title="4. Zmienne środowiskowe">
        <Typography>
          Plik <Code>.env.local</Code> musi zawierać następujące zmienne:
        </Typography>
        <CodeBlock lang="bash">{`# Połączenie z bazą danych PostgreSQL
DATABASE_URL=postgresql://user:password@host:5432/dbname

# Resend — wysyłka e-maili (https://resend.com)
RESEND_API_KEY=re_...

# Sekret chroniący endpoint crona przed nieautoryzowanym dostępem
CRON_SECRET=twoj-losowy-sekret

# Discord Webhook URL — formularz kontaktowy
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...

# Opcjonalne: automatycznie wykrywane przez Next.js na Vercel
VERCEL_URL=twoja-domena.vercel.app`}</CodeBlock>
        <Typography className="text-muted-foreground text-sm">
          Na produkcji (Vercel) zmienne konfiguruje się w panelu projektu →
          Settings → Environment Variables.
          <Code>VERCEL_URL</Code> jest ustawiane automatycznie przez platformę.
        </Typography>
      </Section>
      <Section id="schema" title="5. Schemat bazy danych">
        <Typography>
          Baza danych PostgreSQL zarządzana przez Drizzle ORM. Wszystkie tabele
          mają prefix <Code>sm_</Code>.
        </Typography>

        <SubSection title="sm_users">
          <CodeBlock lang="sql">{`sm_users (
  id            integer  PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name          varchar  NOT NULL,
  email         varchar  NOT NULL UNIQUE,
  passwordHash  varchar  NOT NULL,
  activated     boolean  DEFAULT false,
  plan          varchar  NOT NULL DEFAULT 'starter'  -- 'starter' | 'pro'
)`}</CodeBlock>
          <Typography className="text-sm text-muted-foreground">
            Pole <Code>plan</Code> jest jedynym wyróżnikiem dostępu do funkcji
            Pro. Hasło przechowywane wyłącznie jako hash argon2 — nigdy w
            postaci jawnej.
          </Typography>
        </SubSection>

        <SubSection title="sm_sessions">
          <CodeBlock lang="sql">{`sm_sessions (
  id         integer    PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  userId     integer    NOT NULL REFERENCES sm_users(id),
  tokenHash  varchar    NOT NULL UNIQUE,  -- SHA-256 tokenu sesji
  expireAt   timestamp  NOT NULL,         -- teraz + 7 dni
  createdAt  timestamp  DEFAULT NOW()
)`}</CodeBlock>
          <Typography className="text-sm text-muted-foreground">
            Token sesji jest przechowywany w cookie <Code>session</Code>{" "}
            (HttpOnly, Secure, SameSite=Lax). W bazie przechowywany jest
            wyłącznie hash SHA-256 — surowy token nigdy nie trafia do bazy.
          </Typography>
        </SubSection>

        <SubSection title="sm_activation_tokens">
          <CodeBlock lang="sql">{`sm_activation_tokens (
  id         integer    PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  userId     integer    NOT NULL REFERENCES sm_users(id) ON DELETE CASCADE,
  tokenHash  varchar    NOT NULL UNIQUE,
  expiresAt  timestamp  NOT NULL,  -- teraz + 24h
  createdAt  timestamp  DEFAULT NOW()
)`}</CodeBlock>
          <Typography className="text-sm text-muted-foreground">
            Token aktywacyjny jest usuwany z bazy po pomyślnej weryfikacji
            (transakcja atomowa). Po wygaśnięciu (24h) token jest odrzucany, ale
            rekord pozostaje — do ewentualnego czyszczenia przez cron.
          </Typography>
        </SubSection>

        <SubSection title="sm_subscriptions">
          <CodeBlock lang="sql">{`sm_subscriptions (
  id               integer    PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  userId           integer    NOT NULL REFERENCES sm_users(id) ON DELETE CASCADE,
  name             varchar(100) NOT NULL,
  price            integer    NOT NULL,   -- cena w groszach (PLN * 100)
  currency         varchar(10) NOT NULL DEFAULT 'PLN',
  billingCycle     varchar(20) NOT NULL,  -- 'monthly' | 'yearly' | 'weekly'
  nextRenewalDate  timestamp  NOT NULL,
  category         varchar(50),           -- 'streaming' | 'music' | 'software'
                                          -- | 'gaming' | 'news' | 'fitness' | 'other'
  emoji            varchar(10),
  notes            varchar(500),
  isActive         boolean    NOT NULL DEFAULT true,
  createdAt        timestamp  DEFAULT NOW()
)`}</CodeBlock>
          <Typography className="text-sm text-muted-foreground">
            Cena przechowywana jako <strong>integer w groszach</strong> (np.
            49,99 zł → 4999). Unika to błędów zmiennoprzecinkowych przy
            obliczeniach. Konwersja: <Code>price / 100</Code>. Kaskadowe
            usunięcie — usunięcie użytkownika usuwa wszystkie jego subskrypcje.
          </Typography>
        </SubSection>
        <SubSection title="Relacje (Drizzle Relations)">
          <List
            items={[
              "users → sessions (one-to-many)",
              "users → activationTokens (one-to-many)",
              "users → subscriptions (one-to-many)",
              "sessions → users (many-to-one)",
              "activationTokens → users (many-to-one)",
              "subscriptions → users (many-to-one)",
            ]}
          />
        </SubSection>
      </Section>
      <Section id="auth" title="6. System autentykacji">
        <Typography>
          Autentykacja opiera się na własnej implementacji bez zewnętrznych
          providerów (NextAuth itp.).
        </Typography>
        <SubSection title="Przepływ rejestracji">
          <ol className="space-y-2 list-decimal list-inside text-foreground/80 text-base">
            <li>Użytkownik wypełnia formularz (imię, e-mail, hasło × 2).</li>
            <li>Walidacja Zod po stronie klienta i serwera.</li>
            <li>
              Hasło hashowane przez <Code>argon2.hash()</Code>.
            </li>
            <li>
              Nowy rekord w <Code>sm_users</Code> z{" "}
              <Code>activated = false</Code>.
            </li>
            <li>
              Generowany losowy token (32 bajty, <Code>crypto.randomBytes</Code>
              ), hashowany SHA-256 i zapisywany w{" "}
              <Code>sm_activation_tokens</Code> (ważny 24h).
            </li>
            <li>
              Resend wysyła e-mail z linkiem aktywacyjnym:{" "}
              <Code>/verify/[token]</Code>.
            </li>
            <li>
              Użytkownik trafia na stronę <Code>/register-success</Code>.
            </li>
          </ol>
        </SubSection>
        <SubSection title="Weryfikacja e-mail">
          <ol className="space-y-2 list-decimal list-inside text-foreground/80 text-base">
            <li>
              Next.js Server Component na <Code>/verify/[token]</Code> wywołuje{" "}
              <Code>verifyActivationTokenAction(token)</Code>.
            </li>
            <li>Token jest hashowany SHA-256 i szukany w bazie.</li>
            <li>
              Weryfikowane jest <Code>expiresAt</Code>.
            </li>
            <li>
              W transakcji: <Code>users.activated = true</Code> + usunięcie
              tokenu aktywacyjnego.
            </li>
            <li>
              Redirect na <Code>/login</Code>.
            </li>
          </ol>
        </SubSection>
        <SubSection title="Przepływ logowania">
          <ol className="space-y-2 list-decimal list-inside text-foreground/80 text-base">
            <li>Walidacja danych (e-mail + hasło).</li>
            <li>Znalezienie użytkownika po e-mailu.</li>
            <li>
              Weryfikacja hasła przez <Code>argon2.verify(hash, password)</Code>
              .
            </li>
            <li>
              Sprawdzenie <Code>activated === true</Code>.
            </li>
            <li>
              Generowanie tokenu sesji (32 bajty hex), hash SHA-256 zapisywany w{" "}
              <Code>sm_sessions</Code> z <Code>expireAt = now + 7 dni</Code>.
            </li>
            <li>
              Surowy token zapisywany w cookie <Code>session</Code> (HttpOnly,
              Secure w produkcji, SameSite=Lax, maxAge 7 dni).
            </li>
            <li>
              Dane użytkownika (bez <Code>passwordHash</Code>) zwracane do
              klienta i przekazywane do <Code>AuthContext</Code>.
            </li>
          </ol>
        </SubSection>
        <SubSection title="Wylogowanie">
          <ol className="space-y-2 list-decimal list-inside text-foreground/80 text-base">
            <li>Odczytanie tokenu z cookie.</li>
            <li>Usunięcie rekordu sesji z bazy (hash SHA-256).</li>
            <li>
              Usunięcie cookie <Code>session</Code>.
            </li>
            <li>
              Revalidacja i redirect na <Code>/login</Code>.
            </li>
          </ol>
        </SubSection>
        <SubSection title="AuthContext (po stronie klienta)">
          <Typography>
            Komponent <Code>AuthProvider</Code> (
            <Code>components/auth/auth-context.tsx</Code>) opakowuje całą
            aplikację i przechowuje dane zalogowanego użytkownika w React state.
            Dane inicjalizowane są na serwerze (Root Layout pobiera użytkownika
            z bazy i przekazuje jako <Code>initialUser</Code>). Komponenty
            klienckie używają hooka <Code>useAuth()</Code>.
          </Typography>
          <CodeBlock lang="ts">{`type User = {
  id: number;
  name: string;
  email: string;
  activated: boolean | null;
  plan: string;  // 'starter' | 'pro'
}`}</CodeBlock>
        </SubSection>
      </Section>
      <Section id="sessions" title="7. Zarządzanie sesjami">
        <SubSection title="getCurrentUserQuery">
          <Typography>
            Główna funkcja autentykacji używana w Server Components i Server
            Actions. Plik: <Code>queries/getCurrentUser.ts</Code>
          </Typography>
          <CodeBlock lang="text">{`1. Pobierz token z cookie 'session'
2. Hash SHA-256 tokenu
3. Znajdź sesję w bazie po hashu
4. Jeśli sesja nie istnieje → return null
5. Jeśli session.expireAt < now:
     - usuń sesję z bazy
     - usuń cookie 'session'
     - return null
6. Pobierz użytkownika po session.userId
7. Zwróć użytkownika bez pola passwordHash`}</CodeBlock>
          <Typography className="text-sm text-muted-foreground">
            Wygasłe sesje są usuwane on-the-fly przy pierwszym napotkaniu
            zamiast pozostawać w bazie na zawsze.
          </Typography>
        </SubSection>
        <SubSection title="Ochrona tras">
          <Typography>
            <Code>app/dashboard/layout.tsx</Code> wywołuje{" "}
            <Code>getCurrentUserQuery()</Code>i wykonuje{" "}
            <Code>redirect('/login')</Code> jeśli użytkownik nie jest
            zalogowany. Wszystkie Server Actions również wywołują{" "}
            <Code>getCurrentUserQuery()</Code>
            na początku i zwracają błąd jeśli wynik to <Code>null</Code>.
          </Typography>
        </SubSection>
      </Section>
      <Section id="plans" title="8. Plany i limitowanie funkcji">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-foreground/10">
                <th className="text-left py-2 pr-4 font-semibold">Funkcja</th>
                <th className="text-left py-2 pr-4 font-semibold">Starter</th>
                <th className="text-left py-2 font-semibold">Pro</th>
              </tr>
            </thead>
            <tbody className="text-foreground/80">
              {[
                ["Limit subskrypcji", "5", "Nielimitowane"],
                ["Statystyki (karty)", "✓", "✓"],
                ["Wykresy (kategorie, koszty)", "✗ (zablokowane)", "✓"],
                ["Oś czasu odnowień", "✗ (zablokowane)", "✓"],
                ["Eksport CSV", "✗ (toast z info)", "✓"],
                ["Przypomnienia e-mail", "✓", "✓"],
                ["Zmiana planu", "✓ (demo)", "✓ (demo)"],
              ].map(([feature, starter, pro]) => (
                <tr key={feature} className="border-b border-foreground/5">
                  <td className="py-2 pr-4 font-medium">{feature}</td>
                  <td className="py-2 pr-4">{starter}</td>
                  <td className="py-2">{pro}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <SubSection title="Implementacja limitów">
          <Typography>
            <strong>Limit subskrypcji (Starter):</strong> w{" "}
            <Code>createSubscriptionAction</Code>
            przed insertem wykonywane jest <Code>SELECT COUNT(*)</Code> po{" "}
            <Code>userId</Code>. Jeśli wynik ≥ 5, akcja zwraca błąd bez zapisu.
          </Typography>
          <Typography>
            <strong>Blokada wykresów:</strong> w{" "}
            <Code>app/dashboard/page.tsx</Code> (Server Component) sprawdzane
            jest <Code>user.plan === &apos;pro&apos;</Code>. Dla Starter
            renderowany jest komponent <Code>ProChartGate</Code> — realne
            wykresy z fałszywymi danymi, rozmyte CSS <Code>blur-sm</Code>, z
            nakładką z przyciskiem upgrade.
          </Typography>
          <Typography>
            <strong>Blokada eksportu CSV:</strong> w <Code>ExportButton</Code>{" "}
            (Client Component) sprawdzane jest{" "}
            <Code>user.plan === &apos;pro&apos;</Code> z <Code>useAuth()</Code>.
            Klik pokazuje toast z komunikatem zamiast generować plik.
          </Typography>
          <Typography>
            <strong>Zmiana planu:</strong> <Code>switchPlanAction</Code>{" "}
            wykonuje
            <Code>UPDATE sm_users SET plan = ? WHERE id = ?</Code>. Brak
            integracji płatności — zmiana natychmiastowa (demo).
          </Typography>
        </SubSection>
      </Section>
      <Section id="actions" title="9. Server Actions">
        <Typography>
          Wszystkie Server Actions zwracają <Code>ActionResult&lt;T&gt;</Code>:
        </Typography>
        <CodeBlock lang="ts">{`type OkResult<T>    = { success: true; data: T }
type ErrorResult    = { success: false; error: string }
type ActionResult<T> = OkResult<T> | ErrorResult

// Helpers:
Result.ok(data)        // → OkResult
Result.error(message)  // → ErrorResult`}</CodeBlock>

        {[
          {
            name: "registerAction(data)",
            file: "actions/register.tsx",
            desc: "Walidacja Zod → hash argon2 → INSERT users → INSERT activation_tokens → Resend e-mail → redirect /register-success. Obsługuje duplikat e-mail (pg error code 23505).",
          },
          {
            name: "verifyActivationTokenAction(token)",
            file: "actions/verifyActivationToken.ts",
            desc: "Hash SHA-256 tokenu → szukaj w activation_tokens → sprawdź expiresAt → transakcja: UPDATE users SET activated=true + DELETE activation_tokens.",
          },
          {
            name: "loginAction(data)",
            file: "actions/login.ts",
            desc: "Walidacja → znajdź usera → argon2.verify → sprawdź activated → INSERT session → set cookie → return user bez passwordHash.",
          },
          {
            name: "logoutAction()",
            file: "actions/logout.ts",
            desc: "Hash cookie → DELETE session → delete cookie → revalidatePath('/').",
          },
          {
            name: "createSubscriptionAction(data)",
            file: "actions/subscription.ts",
            desc: "Auth → walidacja → (Starter) COUNT subscriptions, jeśli ≥ 5 error → INSERT subscription (cena w groszach: Math.round(price * 100)) → revalidatePath.",
          },
          {
            name: "updateSubscriptionAction(id, data)",
            file: "actions/subscription.ts",
            desc: "Auth → walidacja → UPDATE subscription WHERE id AND userId → revalidatePath.",
          },
          {
            name: "deleteSubscriptionAction(id)",
            file: "actions/subscription.ts",
            desc: "Auth → DELETE subscription WHERE id AND userId → revalidatePath.",
          },
          {
            name: "toggleSubscriptionAction(id, isActive)",
            file: "actions/subscription.ts",
            desc: "Auth → UPDATE subscription SET isActive = ? WHERE id AND userId → revalidatePath.",
          },
          {
            name: "switchPlanAction(plan)",
            file: "actions/plan.ts",
            desc: "Auth → sprawdź czy plan się różni → UPDATE users SET plan = ? → revalidatePath('/dashboard/billing').",
          },
          {
            name: "updateNameAction(data)",
            file: "actions/account.ts",
            desc: "Auth → walidacja → UPDATE users SET name = ? → revalidatePath.",
          },
          {
            name: "updatePasswordAction(data)",
            file: "actions/account.ts",
            desc: "Auth → pobierz pełny rekord usera → argon2.verify(currentPassword) → argon2.hash(newPassword) → UPDATE users SET passwordHash = ?.",
          },
          {
            name: "deleteAccountAction()",
            file: "actions/account.ts",
            desc: "Auth → DELETE users (kaskada: sesje, subskrypcje, tokeny aktywacyjne) → delete cookie → revalidatePath.",
          },
          {
            name: "sendContactAction(data)",
            file: "actions/contact.ts",
            desc: "Walidacja → POST do DISCORD_WEBHOOK_URL z Discord embed (imię, e-mail, wiadomość, timestamp).",
          },
        ].map((action) => (
          <div
            key={action.name}
            className="border border-foreground/10 rounded-xl p-4 space-y-1"
          >
            <div className="flex flex-col gap-1">
              <code className="text-sm font-mono text-primary break-all">
                {action.name}
              </code>
              <span className="text-xs text-muted-foreground font-mono break-all">
                {action.file}
              </span>
            </div>
            <Typography className="text-sm text-muted-foreground">
              {action.desc}
            </Typography>
          </div>
        ))}
      </Section>
      <Section id="queries" title="10. Zapytania (Queries)">
        <SubSection title="getCurrentUserQuery()">
          <Typography>
            Plik: <Code>queries/getCurrentUser.ts</Code>. Opisana szczegółowo w
            sekcji 7. Używana w: Root Layout, dashboard/layout.tsx,
            dashboard/page.tsx, billing/page.tsx, account/page.tsx oraz na
            początku każdej Server Action.
          </Typography>
        </SubSection>
        <SubSection title="getSubscriptionsQuery()">
          <Typography>
            Plik: <Code>queries/getSubscriptions.ts</Code>. Wywołuje{" "}
            <Code>getCurrentUserQuery()</Code>, następnie pobiera wszystkie
            subskrypcje danego użytkownika posortowane rosnąco po{" "}
            <Code>nextRenewalDate</Code>. Zwraca <Code>null</Code> jeśli
            użytkownik nie jest zalogowany.
          </Typography>
          <CodeBlock lang="sql">{`SELECT * FROM sm_subscriptions
WHERE userId = :userId
ORDER BY nextRenewalDate ASC`}</CodeBlock>
        </SubSection>
        <SubSection title="Typ Subscription">
          <Typography>
            Eksportowany z <Code>queries/index.ts</Code>, inferowany z typu
            zwracanego przez <Code>getSubscriptionsQuery</Code>:
          </Typography>
          <CodeBlock lang="ts">{`export type Subscription = Awaited<
  ReturnType<typeof getSubscriptionsQuery>
> extends (infer T)[] | null ? T : never`}</CodeBlock>
        </SubSection>
      </Section>
      <Section id="api" title="11. API Routes">
        <SubSection title="GET /api/cron/reminders">
          <Typography>
            Plik: <Code>app/api/cron/reminders/route.ts</Code>
          </Typography>
          <Typography>
            Endpoint wywoływany przez zewnętrzny cron (np. Vercel Cron Jobs).
            Chroniony nagłówkiem{" "}
            <Code>Authorization: Bearer {"{CRON_SECRET}"}</Code>.
          </Typography>
          <Typography>
            <strong>Logika:</strong>
          </Typography>
          <ol className="space-y-1 list-decimal list-inside text-foreground/80 text-sm">
            <li>Weryfikacja nagłówka Authorization.</li>
            <li>
              Pobranie wszystkich aktywnych subskrypcji odnawiających się w
              ciągu 3 dni (
              <Code>nextRenewalDate BETWEEN now AND now+3days</Code>).
            </li>
            <li>
              Grupowanie subskrypcji po użytkowniku (
              <Code>Map&lt;userId, {"{...}"}&gt;</Code>).
            </li>
            <li>
              Dla każdego użytkownika: renderowanie szablonu{" "}
              <Code>RenewalReminder</Code> przez{" "}
              <Code>@react-email/render</Code> i wysyłka przez Resend.
            </li>
            <li>Zwrócenie JSON z liczbą wysłanych e-maili i statusami.</li>
          </ol>
          <CodeBlock lang="jsonc">{`// Konfiguracja Vercel Cron (vercel.json):
{
  "crons": [{
    "path": "/api/cron/reminders",
    "schedule": "0 8 * * *"  // codziennie o 8:00 UTC
  }]
}`}</CodeBlock>
        </SubSection>
      </Section>
      <Section id="validation" title="12. Schematy walidacji (Zod)">
        {[
          {
            name: "loginFormSchema",
            file: "validation-schemas/login.ts",
            fields: "email (string, email), password (string, min 1)",
          },
          {
            name: "registerFormSchema",
            file: "validation-schemas/register.ts",
            fields:
              "name (min 1), email (email, lowercase), password (passwordSchema), repeatPassword (passwordSchema) + superRefine: password === repeatPassword",
          },
          {
            name: "subscriptionFormSchema",
            file: "validation-schemas/subscription.ts",
            fields:
              "name (max 100), price (coerce number, min 0.01), billingCycle (monthly|yearly|weekly), nextRenewalDate (string, min 1), category (optional enum), emoji (optional, max 10), notes (optional, max 500)",
          },
          {
            name: "updateNameSchema",
            file: "validation-schemas/account.ts",
            fields: "name (trim, min 1, max 100)",
          },
          {
            name: "updatePasswordSchema",
            file: "validation-schemas/account.ts",
            fields:
              "currentPassword (min 1), newPassword (passwordSchema), confirmPassword (passwordSchema) + superRefine: match",
          },
          {
            name: "contactFormSchema",
            file: "validation-schemas/contact.ts",
            fields:
              "name (trim, max 100), email (email), message (trim, min 10, max 2000)",
          },
        ].map((s) => (
          <div
            key={s.name}
            className="border border-foreground/10 rounded-xl p-4 space-y-1"
          >
            <div className="flex flex-col gap-1">
              <code className="text-sm font-mono text-primary break-all">
                {s.name}
              </code>
              <span className="text-xs text-muted-foreground font-mono break-all">
                {s.file}
              </span>
            </div>
            <Typography className="text-sm text-muted-foreground">
              {s.fields}
            </Typography>
          </div>
        ))}
        <SubSection title="passwordSchema">
          <Typography>
            Wielokrotnie używany schemat Zod z <Code>lib/utils.ts</Code>:
          </Typography>
          <List
            items={[
              "min 8 znaków",
              "co najmniej jeden znak specjalny",
              "co najmniej jedna mała litera",
              "co najmniej jedna duża litera",
              "co najmniej jedna cyfra",
            ]}
          />
        </SubSection>
      </Section>
      <Section id="components" title="13. Kluczowe komponenty">
        <SubSection title="StatsCards">
          <Typography>
            Oblicza na podstawie tablicy subskrypcji: sumę miesięczną, roczną,
            liczbę aktywnych i wstrzymanych, oraz liczbę dni do następnego
            odnowienia. Wszystkie obliczenia wykonywane po stronie klienta —
            komponent jest Server Component, dane przekazywane jako props.
          </Typography>
        </SubSection>
        <SubSection title="CategoryChart / CostChart">
          <Typography>
            Zbudowane na bibliotece Recharts. <Code>CategoryChart</Code> grupuje
            aktywne subskrypcje po kategorii i sumuje miesięczny ekwiwalent
            (przez <Code>toMonthlyPLN()</Code>).
            <Code>CostChart</Code> pokazuje ranking subskrypcji po koszcie
            miesięcznym (top 8). Oba przyjmują <Code>Subscription[]</Code> jako
            props.
          </Typography>
        </SubSection>
        <SubSection title="RenewalTimeline">
          <Typography>
            Filtruje aktywne subskrypcje odnawiające się w ciągu 7 dni od teraz.
            Koloruje wiersze w zależności od pilności (dziś, jutro, wkrótce).
          </Typography>
        </SubSection>
        <SubSection title="ProChartGate">
          <Typography>
            Renderuje te same komponenty wykresów (<Code>CategoryChart</Code>,{" "}
            <Code>CostChart</Code>,<Code>RenewalTimeline</Code>) z
            predefiniowanymi fałszywymi danymi (6 subskrypcji), opakowane w{" "}
            <Code>div</Code> z <Code>blur-sm pointer-events-none</Code>. Na
            wierzchu nakładka z ikoną kłódki i przyciskiem upgrade.
          </Typography>
        </SubSection>
        <SubSection title="ExportButton">
          <Typography>
            Client Component. Generuje CSV po stronie klienta przez
            konstruowanie stringa z nagłówkami i wierszami, z BOM (
            <Code>\uFEFF</Code>) dla poprawnego kodowania polskich znaków w
            Excel. Pobieranie przez tymczasowy link <Code>blob:</Code>.
          </Typography>
        </SubSection>
        <SubSection title="TemplatePicker">
          <Typography>
            Popover z listą 30+ serwisów pogrupowanych po kategoriach. Po
            wybraniu serwisu i pakietu, formularz subskrypcji jest wstępnie
            wypełniany (nazwa, emoji, kategoria, cena, cykl rozliczeniowy).
          </Typography>
        </SubSection>
        <SubSection title="BillingPlan">
          <Typography>
            Client Component. Dwie karty planów (Starter / Pro) z listami
            funkcji. Używa <Code>useTransition</Code> + optymistyczne
            aktualizacje stanu. Po zmianie planu synchronizuje{" "}
            <Code>AuthContext</Code> przez <Code>setUser()</Code>.
          </Typography>
        </SubSection>
        <SubSection title="AccountSettings">
          <Typography>
            Trzy sekcje zarządzania kontem, każda jako osobna funkcja
            komponentu:
            <Code>ProfileSection</Code> (zmiana nazwy),
            <Code>PasswordSection</Code> (zmiana hasła z weryfikacją
            aktualnego),
            <Code>DangerSection</Code> (usunięcie konta — czerwony border,
            nieodwracalne).
          </Typography>
        </SubSection>
      </Section>
      <Section id="email" title="14. System e-mail">
        <Typography>
          E-maile wysyłane są przez <strong>Resend</strong> z szablonami
          zbudowanymi w <strong>React Email</strong>.
        </Typography>
        <SubSection title="Szablon aktywacyjny (emails/activation.tsx)">
          <Typography>
            Wysyłany przy rejestracji. Zawiera przycisk z linkiem
            <Code>/verify/[token]</Code>. Adres nadawcy:{" "}
            <Code>konto@answermouse.com</Code>.
          </Typography>
        </SubSection>
        <SubSection title="Szablon przypomnienia (emails/renewal-reminder.tsx)">
          <Typography>
            Wysyłany przez cron job. Zawiera listę subskrypcji odnawiających się
            w ciągu 3 dni: nazwa, emoji, cena, data odnowienia, liczba dni.
            Adres nadawcy: <Code>przypomnienia@answermouse.com</Code>.
          </Typography>
        </SubSection>
        <SubSection title="Podgląd szablonów">
          <Typography>
            React Email dostarcza lokalny serwer podglądu:
          </Typography>
          <CodeBlock lang="bash">{`npm run email:dev
# → http://localhost:3001`}</CodeBlock>
        </SubSection>
      </Section>
      <Section id="csv" title="15. Eksport CSV">
        <Typography>
          Eksport dostępny tylko dla użytkowników Pro. Generowany po stronie
          klienta (bez żadnego endpointu serwera).
        </Typography>
        <Typography>
          <strong>Kolumny eksportowanego pliku:</strong>
        </Typography>
        <List
          items={[
            "Nazwa",
            "Emoji",
            "Kategoria (po polsku)",
            "Cena (PLN) — przeliczona z groszy",
            "Cykl (po polsku)",
            "Równoważnik miesięczny (PLN)",
            "Następne odnowienie (format pl-PL)",
            "Status (Aktywna / Wstrzymana)",
            "Notatki",
          ]}
        />
        <Typography className="text-sm text-muted-foreground">
          Plik zawiera BOM (<Code>\uFEFF</Code>) dla poprawnego wyświetlania
          polskich znaków w Microsoft Excel. Nazwa pliku:{" "}
          <Code>subskrypcje-YYYY-MM-DD.csv</Code>.
        </Typography>
      </Section>
      <Section id="templates" title="16. Szablony subskrypcji">
        <Typography>
          Plik <Code>lib/subscription-templates.ts</Code> zawiera 30+
          predefiniowanych serwisów z cenami (PLN) i wariantami planów.
        </Typography>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-foreground/10">
                <th className="text-left py-2 pr-4 font-semibold">Kategoria</th>
                <th className="text-left py-2 font-semibold">Serwisy</th>
              </tr>
            </thead>
            <tbody className="text-foreground/80">
              {[
                [
                  "Streaming",
                  "Netflix, Disney+, Max, Amazon Prime, Apple TV+, YouTube Premium, Paramount+",
                ],
                ["Muzyka", "Spotify, Apple Music, Tidal, YouTube Music"],
                [
                  "Software",
                  "Microsoft 365, Adobe CC, ChatGPT, GitHub Copilot, Notion, Canva, iCloud+, Google One, 1Password",
                ],
                [
                  "Gry",
                  "PlayStation Plus, Xbox Game Pass, EA Play, Nintendo Switch Online",
                ],
                ["Newsy", "Polityka, Gazeta Wyborcza, Kindle Unlimited"],
                ["Fitness", "Strava, Garmin Connect+, Whoop"],
              ].map(([cat, services]) => (
                <tr key={cat} className="border-b border-foreground/5">
                  <td className="py-2 pr-4 font-medium">{cat}</td>
                  <td className="py-2 text-muted-foreground">{services}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Typography className="text-sm text-muted-foreground">
          Każdy serwis zawiera: nazwę, emoji, kategorię oraz listę pakietów
          (nazwa pakietu, cena w PLN, cykl rozliczeniowy).
        </Typography>
      </Section>
      <Section id="setup" title="17. Uruchomienie lokalne">
        <SubSection title="Wymagania">
          <List
            items={[
              "Node.js 18+",
              "PostgreSQL 14+",
              "Konto Resend (darmowe do 3000 e-maili/mies.)",
            ]}
          />
        </SubSection>
        <SubSection title="Kroki">
          <CodeBlock lang="bash">{`# 1. Klonuj repozytorium
git clone https://github.com/BlacKlyExactly/Subscription-manager-landing

cd subscription-manager

# 2. Zainstaluj zależności
npm install

# 3. Skonfiguruj zmienne środowiskowe
cp .env.example .env.local
# Uzupełnij wartości (patrz sekcja 4)

# 4. Utwórz tabele w bazie danych
npx drizzle-kit push

# 5. Uruchom serwer deweloperski
npm run dev
# → http://localhost:3000

# 6. (Opcjonalnie) Podgląd szablonów e-mail
npm run email:dev
# → http://localhost:3001`}</CodeBlock>
        </SubSection>
        <SubSection title="Budowanie na produkcję">
          <CodeBlock lang="bash">{`npm run build
npm run start`}</CodeBlock>
        </SubSection>
        <SubSection title="Testowanie endpointu cron lokalnie">
          <CodeBlock lang="bash">{`curl -H "Authorization: Bearer <CRON_SECRET>" \\
  http://localhost:3000/api/cron/reminders`}</CodeBlock>
        </SubSection>
      </Section>
    </main>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="space-y-5 scroll-mt-24 min-w-0 w-full">
      <Typography size="h2" className="border-b border-foreground/10 pb-3">
        {title}
      </Typography>
      {children}
    </section>
  );
}

function SubSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Typography size="h4" as="h3">
        {title}
      </Typography>
      {children}
    </div>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1 list-disc list-inside text-foreground/80 text-base">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function Code({ children }: { children: ReactNode }) {
  return (
    <code className="text-sm bg-muted px-1.5 py-0.5 rounded font-mono text-primary break-all">
      {children}
    </code>
  );
}

function Badge({ children }: { children: string }) {
  return (
    <span className="text-xs font-medium bg-primary/10 text-primary rounded-full px-2.5 py-1">
      {children}
    </span>
  );
}
