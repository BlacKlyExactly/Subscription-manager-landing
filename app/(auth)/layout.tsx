import { getCurrentUserQuery } from "@/queries";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUserQuery();
  if (user) redirect("/dashboard");

  return <>{children}</>;
}
