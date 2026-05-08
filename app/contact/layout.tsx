import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Masz pytanie lub sugestię? Napisz do nas.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
