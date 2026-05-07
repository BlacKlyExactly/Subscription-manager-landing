import { Subscription } from "@/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Calendar, CreditCard, Bell } from "lucide-react";
import { Typography } from "@/components/ui/typography";
import { toMonthlyPLN, formatPLN, daysUntil } from "@/lib/subscription-utils";

interface StatsCardsProps {
  subscriptions: Subscription[];
}

export function StatsCards({ subscriptions }: StatsCardsProps) {
  const active = subscriptions.filter((s) => s.isActive);

  const monthlyTotal = active.reduce((sum, s) => sum + toMonthlyPLN(s), 0);
  const yearlyTotal = monthlyTotal * 12;

  const nextRenewal = active
    .map((s) => s.nextRenewalDate)
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())[0];

  const nextRenewalDays = nextRenewal ? daysUntil(new Date(nextRenewal)) : null;

  const stats = [
    {
      label: "Miesięcznie",
      value: formatPLN(monthlyTotal),
      sub: "aktywne subskrypcje",
      icon: <CreditCard className="size-4 text-primary" />,
    },
    {
      label: "Rocznie",
      value: formatPLN(yearlyTotal),
      sub: "szacunkowo",
      icon: <TrendingUp className="size-4 text-primary" />,
    },
    {
      label: "Subskrypcje",
      value: active.length.toString(),
      sub:
        subscriptions.length > active.length
          ? `${subscriptions.length - active.length} wstrzymane`
          : "wszystkie aktywne",
      icon: <Bell className="size-4 text-primary" />,
    },
    {
      label: "Następne odnowienie",
      value:
        nextRenewalDays !== null
          ? nextRenewalDays === 0
            ? "Dzisiaj"
            : nextRenewalDays === 1
              ? "Jutro"
              : `Za ${nextRenewalDays} dni`
          : "—",
      sub: nextRenewal
        ? new Date(nextRenewal).toLocaleDateString("pl-PL", {
            day: "numeric",
            month: "long",
          })
        : "brak subskrypcji",
      icon: <Calendar className="size-4 text-primary" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="justify-between">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              {stat.icon}
              <CardTitle className="text-sm font-medium text-foreground/60">
                {stat.label}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="mt-auto">
            <Typography size="h4" as="p">
              {stat.value}
            </Typography>
            <Typography size="small" className="mt-1">
              {stat.sub}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
