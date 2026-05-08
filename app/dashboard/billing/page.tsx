import { getCurrentUserQuery, getSubscriptionsQuery } from "@/queries";
import { redirect } from "next/navigation";
import { BillingPlan } from "@/components/dashboard/billing-plan";
import type { Plan } from "@/lib/drizzle/schema";

export default async function BillingPage() {
  const [user, subscriptions] = await Promise.all([
    getCurrentUserQuery(),
    getSubscriptionsQuery(),
  ]);

  if (!user) redirect("/login");

  const subscriptionCount = subscriptions?.length ?? 0;

  return (
    <main className="max-w-3xl px-6 lg:px-0 mx-auto w-full flex flex-col gap-4 flex-1 lg:pt-8 pb-8 bg-background">
      <BillingPlan
        currentPlan={user.plan as Plan}
        subscriptionCount={subscriptionCount}
      />
    </main>
  );
}
