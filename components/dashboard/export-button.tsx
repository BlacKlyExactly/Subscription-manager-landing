"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useAuth } from "@/components/auth/auth-context";
import { toast } from "sonner";
import type { Subscription } from "@/queries";
import { toMonthlyPLN } from "@/lib/subscription-utils";
import { ProBadge } from "../pro-badge";

const CYCLE_LABELS: Record<string, string> = {
  monthly: "Miesięcznie",
  yearly: "Rocznie",
  weekly: "Tygodniowo",
};

const CATEGORY_LABELS: Record<string, string> = {
  streaming: "Streaming",
  music: "Muzyka",
  software: "Software",
  gaming: "Gry",
  news: "Newsy",
  fitness: "Fitness",
  other: "Inne",
};

function generateCSV(subscriptions: Subscription[]): string {
  const headers = [
    "Nazwa",
    "Emoji",
    "Kategoria",
    "Cena (PLN)",
    "Cykl",
    "Równoważnik miesięczny (PLN)",
    "Następne odnowienie",
    "Status",
    "Notatki",
  ];

  const rows = subscriptions.map((sub) => [
    sub.name,
    sub.emoji ?? "",
    sub.category ? (CATEGORY_LABELS[sub.category] ?? sub.category) : "",
    (sub.price / 100).toFixed(2),
    CYCLE_LABELS[sub.billingCycle] ?? sub.billingCycle,
    toMonthlyPLN(sub).toFixed(2),
    new Date(sub.nextRenewalDate).toLocaleDateString("pl-PL"),
    sub.isActive ? "Aktywna" : "Wstrzymana",
    sub.notes ?? "",
  ]);

  return [headers, ...rows]
    .map((row) =>
      row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","),
    )
    .join("\n");
}

function downloadCSV(csv: string, filename: string) {
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

interface ExportButtonProps {
  subscriptions: Subscription[];
}

export function ExportButton({ subscriptions }: ExportButtonProps) {
  const { user } = useAuth();
  const isPro = user?.plan === "pro";

  const handleExport = () => {
    if (!isPro) {
      toast.error("Eksport jest dostępny tylko w planie Pro.", {
        description: "Przejdź na Pro, aby korzystać z tej funkcji.",
      });
      return;
    }

    if (subscriptions.length === 0) {
      toast.error("Brak subskrypcji do eksportu.");
      return;
    }

    const csv = generateCSV(subscriptions);
    const date = new Date().toISOString().split("T")[0];
    downloadCSV(csv, `subskrypcje-${date}.csv`);
    toast.success("Plik CSV został pobrany.");
  };

  return (
    <Button variant="outline" onClick={handleExport} className="relative w-fit">
      <Download className="size-4" />
      Eksportuj
      {!isPro && <ProBadge />}
    </Button>
  );
}
