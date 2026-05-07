"use client";

import { useState } from "react";
import {
  SUBSCRIPTION_TEMPLATES,
  TEMPLATE_CATEGORIES,
  type ServiceTemplate,
  type Pack,
} from "@/lib/subscription-templates";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import type { BillingCycle, Category } from "@/lib/drizzle/schema";

type SelectedPack = {
  name: string;
  emoji: string;
  category: Category;
  price: number;
  billingCycle: BillingCycle;
};

interface TemplatePickerProps {
  onSelect: (pack: SelectedPack) => void;
}

const CYCLE_LABELS: Record<BillingCycle, string> = {
  monthly: "mies.",
  yearly: "rok",
  weekly: "tydz.",
};

export function TemplatePicker({ onSelect }: TemplatePickerProps) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<ServiceTemplate | null>(null);

  const filter = (templates: ServiceTemplate[]) =>
    search
      ? templates.filter((t) =>
          t.name.toLowerCase().includes(search.toLowerCase()),
        )
      : templates;

  const handlePack = (service: ServiceTemplate, pack: Pack) => {
    onSelect({
      name: service.name,
      emoji: service.emoji,
      category: service.category,
      price: pack.price,
      billingCycle: pack.billingCycle,
    });
    setSelected(null);
    setSearch("");
  };

  if (selected) {
    return (
      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={() => setSelected(null)}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
        >
          <ChevronLeft className="size-4" />
          Wróć
        </button>
        <div className="flex items-center gap-3 px-1">
          <span className="text-2xl">{selected.emoji}</span>
          <span className="font-medium">{selected.name}</span>
        </div>
        <div className="flex flex-col gap-2">
          {selected.packs.map((pack) => (
            <button
              key={pack.name}
              type="button"
              onClick={() => handlePack(selected, pack)}
              className="flex items-center gap-2 justify-between px-4 py-3 rounded-xl border border-foreground/10 hover:border-primary/50 hover:bg-primary/5 transition-all text-left"
            >
              <p className="text-sm font-medium">{pack.name}</p>
              <p className="text-sm text-primary font-semibold">
                {pack.price.toLocaleString("pl-PL", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                PLN/{CYCLE_LABELS[pack.billingCycle]}
              </p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <Input
        placeholder="Szukaj usługi..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="h-8"
      />
      {search ? (
        <div className="grid grid-cols-3 gap-2 max-h-52 overflow-y-auto">
          {filter(SUBSCRIPTION_TEMPLATES).map((t) => (
            <ServiceButton
              key={t.name}
              template={t}
              onClick={() => setSelected(t)}
            />
          ))}
          {filter(SUBSCRIPTION_TEMPLATES).length === 0 && (
            <p className="col-span-3 text-sm text-muted-foreground text-center py-6">
              Brak wyników
            </p>
          )}
        </div>
      ) : (
        <Tabs defaultValue="all">
          <div className="overflow-x-auto -mx-3 px-3">
            <TabsList className="flex w-max gap-1 h-auto rounded-xl bg-muted p-1">
              {TEMPLATE_CATEGORIES.map((cat) => (
                <TabsTrigger
                  key={cat.value}
                  value={cat.value}
                  className="rounded-lg px-2 py-1 text-xs whitespace-nowrap"
                >
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {TEMPLATE_CATEGORIES.map((cat) => {
            const templates =
              cat.value === "all"
                ? SUBSCRIPTION_TEMPLATES
                : SUBSCRIPTION_TEMPLATES.filter(
                    (t) => t.category === cat.value,
                  );
            return (
              <TabsContent key={cat.value} value={cat.value} className="mt-3">
                <div className="grid grid-cols-3 gap-2 max-h-52 overflow-y-auto">
                  {templates.map((t) => (
                    <ServiceButton
                      key={t.name}
                      template={t}
                      onClick={() => setSelected(t)}
                    />
                  ))}
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      )}
    </div>
  );
}

function ServiceButton({
  template,
  onClick,
}: {
  template: ServiceTemplate;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 p-2 rounded-xl border border-foreground/10 hover:border-primary/40 hover:bg-primary/5 transition-all"
    >
      <span className="text-2xl">{template.emoji}</span>
      <span className="text-xs text-center leading-tight font-medium line-clamp-2">
        {template.name}
      </span>
    </button>
  );
}
