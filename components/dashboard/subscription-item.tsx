"use client";

import { Subscription } from "@/queries";
import { Card, CardContent } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Notebook, Pause, Play, Trash2 } from "lucide-react";
import { deleteSubscriptionAction, toggleSubscriptionAction } from "@/actions";
import { AddSubscriptionSheet } from "./add-subscription-sheet";
import { toast } from "sonner";
import { useTransition } from "react";
import { cn } from "@/lib/utils";

const CYCLE_LABELS: Record<string, string> = {
  monthly: "mies.",
  yearly: "rok",
  weekly: "tydz.",
};

const CATEGORY_LABELS: Record<string, string> = {
  streaming: "Streaming",
  music: "Muzyka",
  software: "Oprogramowanie",
  gaming: "Gry",
  news: "Wiadomości",
  fitness: "Fitness",
  other: "Inne",
};

function daysUntil(date: Date): number {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function SubscriptionItem({ sub }: { sub: Subscription }) {
  const [isPending, startTransition] = useTransition();

  const days = daysUntil(new Date(sub.nextRenewalDate));
  const isUrgent = days <= 3 && days >= 0;

  const onDelete = () => {
    startTransition(async () => {
      const result = await deleteSubscriptionAction(sub.id);
      if (!result.success) toast.error(result.error);
    });
  };

  const onToggle = () => {
    startTransition(async () => {
      const result = await toggleSubscriptionAction(sub.id, !sub.isActive);
      if (!result.success) toast.error(result.error);
    });
  };

  return (
    <Card
      className={cn(
        "transition-opacity",
        !sub.isActive && "opacity-50",
        isPending && "opacity-40 pointer-events-none",
      )}
    >
      <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 sm:py-3">
        <div className="text-xl w-9 h-9 flex items-center justify-center rounded-xl bg-primary/10 shrink-0">
          {sub.emoji ?? "📦"}
        </div>
        <div className="flex-1 min-w-0 flex flex-col gap-0">
          <div className="flex items-center gap-2 flex-wrap">
            <Typography size="large" as="p" className="truncate">
              {sub.name}
            </Typography>
            {sub.category && (
              <span className="text-xs px-2 py-0.5 flex items-center rounded-full bg-primary/10 text-primary font-medium shrink-0">
                {CATEGORY_LABELS[sub.category] ?? sub.category}
              </span>
            )}
            {!sub.isActive && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-foreground/10 text-foreground/50 font-medium shrink-0">
                Wstrzymana
              </span>
            )}
          </div>
          <Typography size="small">
            Odnowienie:{" "}
            {new Date(sub.nextRenewalDate).toLocaleDateString("pl-PL", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
            {isUrgent && days >= 0 && (
              <span className="ml-2 text-orange-500 font-medium">
                {days === 0 ? "· Dzisiaj!" : `· Za ${days} dni`}
              </span>
            )}
          </Typography>
          {sub.notes && (
            <div className="flex gap-2 items-center mt-1">
              <Notebook className="size-3.5 fill-foreground opacity-30 shrink-0" />
              <Typography
                size="small"
                className="italic text-foreground/40 truncate"
              >
                {sub.notes}
              </Typography>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3">
          <div className="text-left sm:text-right shrink-0">
            <Typography size="large" as="p" className="text-primary">
              {(sub.price / 100).toLocaleString("pl-PL", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              {sub.currency}
            </Typography>
            <Typography size="small">
              /{CYCLE_LABELS[sub.billingCycle]}
            </Typography>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <AddSubscriptionSheet subscription={sub} />
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground/40 hover:text-foreground"
              onClick={onToggle}
              disabled={isPending}
            >
              {sub.isActive ? (
                <Pause className="size-4" />
              ) : (
                <Play className="size-4" />
              )}
            </Button>
            <Button
              variant="destructive"
              size="icon"
              onClick={onDelete}
              disabled={isPending}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
