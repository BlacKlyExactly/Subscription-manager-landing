import Link from "next/link";
import { Lock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProBadge } from "@/components/pro-badge";
import { CategoryChart } from "./category-chart";
import { CostChart } from "./cost-chart";
import { RenewalTimeline } from "./renewal-timeline";
import type { Subscription } from "@/queries";

const now = new Date();
const day = (offset: number) => new Date(now.getTime() + offset * 86_400_000);

const FAKE_SUBS: Subscription[] = [
  {
    id: 1,
    userId: 0,
    name: "Netflix",
    emoji: "🎬",
    price: 4900,
    currency: "PLN",
    billingCycle: "monthly",
    nextRenewalDate: day(3),
    category: "streaming",
    notes: null,
    isActive: true,
    createdAt: now,
  },
  {
    id: 2,
    userId: 0,
    name: "Spotify",
    emoji: "🎵",
    price: 2399,
    currency: "PLN",
    billingCycle: "monthly",
    nextRenewalDate: day(5),
    category: "music",
    notes: null,
    isActive: true,
    createdAt: now,
  },
  {
    id: 3,
    userId: 0,
    name: "Adobe CC",
    emoji: "🎨",
    price: 24900,
    currency: "PLN",
    billingCycle: "monthly",
    nextRenewalDate: day(12),
    category: "software",
    notes: null,
    isActive: true,
    createdAt: now,
  },
  {
    id: 4,
    userId: 0,
    name: "Xbox Game Pass",
    emoji: "🎮",
    price: 3999,
    currency: "PLN",
    billingCycle: "monthly",
    nextRenewalDate: day(1),
    category: "gaming",
    notes: null,
    isActive: true,
    createdAt: now,
  },
  {
    id: 5,
    userId: 0,
    name: "NYT",
    emoji: "📰",
    price: 1500,
    currency: "PLN",
    billingCycle: "monthly",
    nextRenewalDate: day(6),
    category: "news",
    notes: null,
    isActive: true,
    createdAt: now,
  },
  {
    id: 6,
    userId: 0,
    name: "Disney+",
    emoji: "✨",
    price: 2899,
    currency: "PLN",
    billingCycle: "monthly",
    nextRenewalDate: day(2),
    category: "streaming",
    notes: null,
    isActive: true,
    createdAt: now,
  },
];

export function ProChartGate() {
  return (
    <div className="relative">
      <div className="blur-sm pointer-events-none select-none opacity-70 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CategoryChart subscriptions={FAKE_SUBS} />
          <CostChart subscriptions={FAKE_SUBS} />
        </div>
        <RenewalTimeline subscriptions={FAKE_SUBS} />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
        <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center">
          <Lock className="size-5 text-primary" />
        </div>
        <div className="text-center space-y-1">
          <p className="font-semibold text-sm">
            Wykresy dostępne tylko w planie <ProBadge />
          </p>
          <p className="text-xs text-muted-foreground max-w-xs">
            Przejdź na Pro, aby odblokować zaawansowane analizy i wykresy swoich
            subskrypcji.
          </p>
        </div>
        <Link href="/dashboard/billing">
          <Button size="sm">
            <Zap className="size-3.5" />
            Przejdź na Pro
          </Button>
        </Link>
      </div>
    </div>
  );
}
