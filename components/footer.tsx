"use client";

import Link from "next/link";
import { CreditCard } from "lucide-react";
import { Typography } from "@/components/ui/typography";
import { ProBadge } from "./pro-badge";
import { useAuth } from "./auth/auth-context";
import { ReactNode } from "react";

export function Footer() {
  const { user } = useAuth();

  const LINKS: {
    heading: string;
    items: { label: string | ReactNode; href: string }[];
  }[] = [
    {
      heading: "Produkt",
      items: [
        { label: "O nas", href: "/about-us" },
        { label: "Panel", href: "/dashboard" },
      ],
    },
    {
      heading: "Konto",
      items: [
        { label: "Zaloguj się", href: "/login" },
        { label: "Zarejestruj się", href: "/register" },
      ],
    },
    {
      heading: "Prawne",
      items: [
        { label: "Polityka prywatności", href: "/privacy" },
        { label: "Regulamin", href: "/terms" },
      ],
    },
  ];

  if (user?.plan !== "pro") {
    LINKS[0].items.push({
      label: (
        <>
          Przejdź na <ProBadge />
        </>
      ),
      href: "/register",
    });
  }

  return (
    <footer className="mt-auto border-t border-foreground/8 bg-background">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col gap-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          {/* Brand */}
          <div className="flex flex-col gap-2.5 sm:max-w-56">
            <Link href="/" className="flex items-center gap-2">
              <CreditCard className="text-background/70 dark:text-background/40 fill-primary size-5" />
              <Typography size="h4" as="p" className="text-primary">
                Logo
              </Typography>
            </Link>
            <Typography
              size="small"
              className="text-foreground/50 leading-relaxed"
            >
              Twoje subskrypcje kosztują więcej niż myślisz. Zbierz je w jednym
              miejscu i przestań przepłacać.
            </Typography>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-10">
            {LINKS.map((group) => (
              <div key={group.heading} className="flex flex-col gap-3">
                <Typography
                  size="small"
                  className="font-semibold text-foreground"
                >
                  {group.heading}
                </Typography>
                <ul className="flex flex-col gap-2">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href}>
                        <Typography
                          size="small"
                          className="text-foreground/50 hover:text-foreground transition-colors"
                        >
                          {item.label}
                        </Typography>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 pt-6 border-t border-foreground/8">
          <Typography size="small" className="text-foreground/40">
            © {new Date().getFullYear()} Logo. Wszelkie prawa zastrzeżone.
          </Typography>
        </div>
      </div>
    </footer>
  );
}
