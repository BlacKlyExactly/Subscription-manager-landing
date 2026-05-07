import { getCurrentUserQuery } from "@/queries";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUserQuery();
  if (!user) redirect("/login");

  return <>{children}</>;
}
