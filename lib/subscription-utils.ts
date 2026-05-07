import type { Subscription } from "@/queries";

export function toMonthlyPLN(sub: Subscription): number {
  const pln = sub.price / 100;
  if (sub.billingCycle === "monthly") return pln;
  if (sub.billingCycle === "yearly") return pln / 12;
  return (pln * 52) / 12;
}

export function formatPLN(amount: number) {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
    maximumFractionDigits: 2,
  }).format(amount);
}

export function daysUntil(date: Date): number {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export const CATEGORY_LABELS: Record<string, string> = {
  streaming: "Streaming",
  music: "Muzyka",
  software: "Software",
  gaming: "Gry",
  news: "Newsy",
  fitness: "Fitness",
  other: "Inne",
};

export const CATEGORY_COLORS: Record<string, string> = {
  streaming: "#6366f1",
  music: "#8b5cf6",
  software: "#0ea5e9",
  gaming: "#10b981",
  news: "#f59e0b",
  fitness: "#ef4444",
  other: "#6b7280",
};
