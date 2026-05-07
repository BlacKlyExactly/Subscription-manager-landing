import type { Subscription } from "@/queries";
import { formatPLN, daysUntil } from "@/lib/subscription-utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface RenewalTimelineProps {
  subscriptions: Subscription[];
}

export function RenewalTimeline({ subscriptions }: RenewalTimelineProps) {
  const now = new Date();
  const in30days = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  const upcoming = subscriptions
    .filter((s) => s.isActive)
    .filter((s) => {
      const d = new Date(s.nextRenewalDate);
      return d >= now && d <= in30days;
    })
    .sort(
      (a, b) =>
        new Date(a.nextRenewalDate).getTime() -
        new Date(b.nextRenewalDate).getTime(),
    );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Calendar className="size-4 text-primary" />
          <CardTitle className="text-sm font-medium text-foreground/60">
            Odnowienia w ciągu 7 dni
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {upcoming.length === 0 ? (
          <p className="text-sm text-muted-foreground py-6 text-center">
            Brak odnowień w ciągu najbliższych 7 dni
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {upcoming.map((sub) => {
              const days = daysUntil(new Date(sub.nextRenewalDate));
              const isUrgent = days <= 3;
              const isSoon = days <= 7;
              const progress = Math.max(0, ((7 - days) / 7) * 100);

              return (
                <div key={sub.id} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-base shrink-0">
                        {sub.emoji ?? "📦"}
                      </span>
                      <span className="text-sm font-medium truncate">
                        {sub.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span
                        className={cn(
                          "text-xs font-medium px-2 py-0.5 rounded-full",
                          isUrgent
                            ? "bg-red-500/10 text-red-500"
                            : isSoon
                              ? "bg-orange-500/10 text-orange-500"
                              : "bg-foreground/5 text-foreground/50",
                        )}
                      >
                        {days === 0
                          ? "Dzisiaj"
                          : days === 1
                            ? "Jutro"
                            : `Za ${days} dni`}
                      </span>
                      <span className="text-sm font-medium text-primary">
                        {formatPLN(sub.price / 100)}
                      </span>
                    </div>
                  </div>
                  <div className="h-1 w-full rounded-full bg-foreground/5 overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all",
                        isUrgent
                          ? "bg-red-500"
                          : isSoon
                            ? "bg-orange-500"
                            : "bg-primary",
                      )}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
