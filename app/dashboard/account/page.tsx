import { getCurrentUserQuery } from "@/queries";
import { redirect } from "next/navigation";
import { AccountSettings } from "@/components/dashboard/account-settings";

export default async function AccountPage() {
  const user = await getCurrentUserQuery();
  if (!user) redirect("/login");

  return (
    <main className="max-w-3xl px-6 lg:px-0 mx-auto w-full flex flex-col gap-4 flex-1 lg:pt-8 pb-8 bg-background">
      <AccountSettings initialName={user.name} email={user.email} />
    </main>
  );
}
