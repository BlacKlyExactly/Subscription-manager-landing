import type { Metadata } from "next";

export const metadata: Metadata = { title: "Zaloguj się" };

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
