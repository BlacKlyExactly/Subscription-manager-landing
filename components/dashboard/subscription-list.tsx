import { Subscription } from "@/queries";
import { SubscriptionItem } from "./subscription-item";
import { Typography } from "@/components/ui/typography";
import { PackageOpen } from "lucide-react";

interface SubscriptionListProps {
  subscriptions: Subscription[];
}

export function SubscriptionList({ subscriptions }: SubscriptionListProps) {
  return (
    <div className="flex flex-col gap-4 py-8 ">
      <Typography size="h4" as="h2">
        Twoje subskrypcje
      </Typography>

      {subscriptions.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-20 text-center text-foreground/40">
          <PackageOpen className="size-12" strokeWidth={1.2} />
          <Typography size="large" as="p" className="text-foreground/40">
            Brak subskrypcji
          </Typography>
          <Typography size="small">
            Dodaj pierwszą subskrypcję klikając przycisk powyżej.
          </Typography>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {subscriptions.map((sub) => (
            <SubscriptionItem key={sub.id} sub={sub} />
          ))}
        </div>
      )}
    </div>
  );
}
