"use client";

import { useState, useTransition } from "react";
import { Check, CreditCard, Zap } from "lucide-react";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { ProBadge } from "@/components/pro-badge";
import { switchPlanAction } from "@/actions/plan";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/auth/auth-context";

type Plan = "starter" | "pro";

const STARTER_LIMIT = 5;

const plans = [
  {
    id: "starter" as Plan,
    name: "Starter",
    price: 0,
    description: "Idealny do podstawowego śledzenia subskrypcji.",
    features: [
      `Do ${STARTER_LIMIT} subskrypcji`,
      "Podstawowe statystyki",
      "Powiadomienia e-mail",
    ],
    unavailable: [
      "Zaawansowane wykresy",
      "Eksport danych (CSV)",
      "Nieograniczone subskrypcje",
      "Priorytetowe wsparcie",
    ],
  },
  {
    id: "pro" as Plan,
    name: "Pro",
    price: 9,
    description: "Pełna kontrola nad wszystkimi twoimi subskrypcjami.",
    features: [
      "Nieograniczone subskrypcje",
      "Zaawansowane wykresy i raporty",
      "Eksport danych (CSV)",
      "Powiadomienia e-mail",
      "Priorytetowe wsparcie",
    ],
    unavailable: [],
  },
];

type Props = {
  currentPlan: Plan;
  subscriptionCount: number;
};

export function BillingPlan({ currentPlan, subscriptionCount }: Props) {
  const { setUser, user } = useAuth();
  const [pending, startTransition] = useTransition();
  const [optimisticPlan, setOptimisticPlan] = useState<Plan>(currentPlan);

  const handleSwitch = (plan: Plan) => {
    if (plan === optimisticPlan) return;

    startTransition(async () => {
      setOptimisticPlan(plan);
      const result = await switchPlanAction(plan);

      if (!result.success) {
        setOptimisticPlan(currentPlan);
        toast.error(result.error);
        return;
      }

      if (user) setUser({ ...user, plan });
      toast.success(
        plan === "pro"
          ? "Przeszedłeś na plan Pro!"
          : "Wróciłeś na plan Starter.",
      );
    });
  };

  const usagePercent =
    optimisticPlan === "starter"
      ? Math.min((subscriptionCount / STARTER_LIMIT) * 100, 100)
      : null;

  return (
    <div className="space-y-8">
      <div>
        <Typography size="h2">Twój plan</Typography>
        <Typography className="text-muted-foreground mt-1">
          Zarządzaj swoim planem i limitem subskrypcji.
        </Typography>
      </div>
      <div className="rounded-2xl border border-foreground/10 bg-card px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <CreditCard className="size-5 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm">Aktualny plan:</span>
              {optimisticPlan === "pro" ? (
                <ProBadge />
              ) : (
                <span className="text-xs font-semibold bg-muted text-muted-foreground rounded-full px-1.5 py-0.5 leading-none">
                  STARTER
                </span>
              )}
            </div>
            <Typography className="text-muted-foreground text-xs mt-0.5">
              {optimisticPlan === "pro"
                ? "Masz dostęp do wszystkich funkcji."
                : `Korzystasz z ${subscriptionCount} z ${STARTER_LIMIT} dostępnych subskrypcji.`}
            </Typography>
          </div>
        </div>

        {optimisticPlan === "starter" && (
          <div className="w-full sm:w-48">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Użycie</span>
              <span>
                {subscriptionCount} / {STARTER_LIMIT}
              </span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full transition-all",
                  usagePercent === 100 ? "bg-destructive" : "bg-primary",
                )}
                style={{ width: `${usagePercent}%` }}
              />
            </div>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {plans.map((plan) => {
          const isActive = optimisticPlan === plan.id;

          return (
            <div
              key={plan.id}
              className={cn(
                "relative rounded-2xl border p-6 flex flex-col gap-6 transition-all",
                isActive
                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                  : "border-foreground/10 bg-card",
              )}
            >
              {isActive && (
                <span className="absolute top-4 right-4 text-[10px] font-bold bg-primary text-primary-foreground rounded-full px-2 py-0.5 leading-none">
                  AKTUALNY
                </span>
              )}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {plan.id === "pro" && (
                    <Zap className="size-4 text-primary fill-primary" />
                  )}
                  <Typography size="h3" as="h2">
                    {plan.name}
                  </Typography>
                </div>
                <Typography className="text-muted-foreground text-sm">
                  {plan.description}
                </Typography>
                <div className="mt-4 flex items-end gap-1">
                  <span className="text-3xl font-bold">{plan.price} zł</span>
                  <span className="text-muted-foreground text-sm mb-0.5">
                    /miesięcznie
                  </span>
                </div>
              </div>
              <ul className="space-y-2 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className="size-4 text-primary shrink-0" />
                    {f}
                  </li>
                ))}
                {plan.unavailable.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-sm text-muted-foreground line-through"
                  >
                    <Check className="size-4 shrink-0 opacity-30" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                variant={isActive ? "outline" : "default"}
                disabled={isActive || pending}
                onClick={() => handleSwitch(plan.id)}
                className="w-full"
              >
                {isActive
                  ? "Aktualny plan"
                  : plan.id === "pro"
                    ? "Przejdź na Pro"
                    : "Wróć do Starter"}
              </Button>
            </div>
          );
        })}
      </div>
      <p className="text-xs text-muted-foreground text-center">
        To jest aplikacja demonstracyjna. Zmiana planu jest symulowana i nie
        wymaga płatności.
      </p>
    </div>
  );
}
