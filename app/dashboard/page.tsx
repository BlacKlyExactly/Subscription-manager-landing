import type { Metadata } from "next";
import { getCurrentUserQuery, getSubscriptionsQuery } from "@/queries";

export const metadata: Metadata = { title: "Panel" };
import { StatsCards } from "@/components/dashboard/stats-cards";
import { SubscriptionList } from "@/components/dashboard/subscription-list";
import { AddSubscriptionSheet } from "@/components/dashboard/add-subscription-sheet";
import { ExportButton } from "@/components/dashboard/export-button";
import { CategoryChart } from "@/components/dashboard/charts/category-chart";
import { CostChart } from "@/components/dashboard/charts/cost-chart";
import { RenewalTimeline } from "@/components/dashboard/charts/renewal-timeline";
import { ProChartGate } from "@/components/dashboard/charts/pro-chart-gate";
import { Typography } from "@/components/ui/typography";

export default async function DashboardPage() {
  const [user, subscriptions] = await Promise.all([
    getCurrentUserQuery(),
    getSubscriptionsQuery(),
  ]);

  const subs = subscriptions ?? [];

  return (
    <main className="max-w-5xl px-6 lg:px-0 mx-auto w-full flex flex-col gap-4 flex-1 lg:pt-8 pb-8 bg-background">
      <div className="bg-background rounded-4xl py-0 space-y-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Typography size="h2">
              Witaj, <span className="text-primary">{user?.name}</span>!
            </Typography>
            <Typography>Oto przegląd twoich subskrypcji</Typography>
          </div>
          <div className="lg:flex  items-center gap-2 flex-wrap hidden">
            <ExportButton subscriptions={subs} />
            <AddSubscriptionSheet />
          </div>
        </div>
        <div className="flex  items-center gap-2 flex-wrap lg:hidden">
          <ExportButton subscriptions={subs} />
          <AddSubscriptionSheet />
        </div>
        <StatsCards subscriptions={subs} />
      </div>
      {user?.plan === "pro" ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CategoryChart subscriptions={subs} />
            <CostChart subscriptions={subs} />
          </div>
          <RenewalTimeline subscriptions={subs} />
        </>
      ) : (
        <div className="grid grid-cols-1">
          <ProChartGate />
        </div>
      )}
      <SubscriptionList subscriptions={subs} />
    </main>
  );
}
