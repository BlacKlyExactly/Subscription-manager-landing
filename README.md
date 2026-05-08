# SubTracker

Aplikacja do śledzenia subskrypcji cyfrowych. Projekt demonstracyjny — żadne płatności nie są przetwarzane.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **PostgreSQL** + **Drizzle ORM**
- **Tailwind CSS 4** + **shadcn/ui**
- **Argon2** — haszowanie haseł
- **Resend** + **React Email** — e-maile transakcyjne
- **Zod** + **React Hook Form** — walidacja formularzy
- **Recharts** — wykresy

## Funkcje

- Rejestracja i logowanie z weryfikacją e-mail
- Dodawanie, edytowanie, usuwanie i wstrzymywanie subskrypcji
- Katalog 30+ popularnych serwisów z cenami (Netflix, Spotify, Adobe CC…)
- Dashboard ze statystykami i wykresami (Pro)
- E-mailowe przypomnienia 3 dni przed odnowieniem (cron job)
- Eksport danych do CSV (Pro)
- Zarządzanie planem Starter / Pro
- Ustawienia konta: zmiana nazwy, hasła, usunięcie konta
- Tryb ciemny / jasny

## Uruchomienie lokalne

**Wymagania:** Node.js 18+, PostgreSQL 14+, konto Resend

```bash
git clone <repo-url>
cd subscription-manager
bun install
cp .env.example .env.local   # uzupełnij wartości
bunx drizzle-kit push
bun dev
```

Aplikacja dostępna pod `http://localhost:3000`.

## Zmienne środowiskowe

Skopiuj `.env.example` do `.env.local` i uzupełnij:

| Zmienna | Opis |
|---|---|
| `DATABASE_URL` | Connection string PostgreSQL |
| `RESEND_API_KEY` | Klucz API Resend (wysyłka e-maili) |
| `CRON_SECRET` | Sekret chroniący endpoint `/api/cron/reminders` |
| `DISCORD_WEBHOOK_URL` | Webhook Discord dla formularza kontaktowego |

## Cron job

Endpoint `GET /api/cron/reminders` wysyła e-maile do użytkowników, których subskrypcje odnawiają się w ciągu 3 dni. Chroniony nagłówkiem `Authorization: Bearer <CRON_SECRET>`.

Przykładowa konfiguracja Vercel (`vercel.json`):

```json
{
  "crons": [{ "path": "/api/cron/reminders", "schedule": "0 8 * * *" }]
}
```

Testowanie lokalnie:

```bash
curl -H "Authorization: Bearer <CRON_SECRET>" http://localhost:3000/api/cron/reminders
```

## Dokumentacja techniczna

Pełna dokumentacja techniczna dostępna pod `/docs` w działającej aplikacji.
