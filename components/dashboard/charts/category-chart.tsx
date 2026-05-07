"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieSectorShapeProps,
  Sector,
} from "recharts";
import type { Subscription } from "@/queries";
import {
  toMonthlyPLN,
  formatPLN,
  CATEGORY_LABELS,
  CATEGORY_COLORS,
} from "@/lib/subscription-utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart as PieChartIcon } from "lucide-react";

interface CategoryChartProps {
  subscriptions: Subscription[];
}

export function CategoryChart({ subscriptions }: CategoryChartProps) {
  const active = subscriptions.filter((s) => s.isActive);

  const grouped = active.reduce(
    (acc, sub) => {
      const cat = sub.category ?? "other";
      acc[cat] = (acc[cat] ?? 0) + toMonthlyPLN(sub);
      return acc;
    },
    {} as Record<string, number>,
  );

  const data = Object.entries(grouped)
    .map(([cat, value]) => ({
      name: CATEGORY_LABELS[cat] ?? cat,
      value: Math.round(value * 100) / 100,
      color: CATEGORY_COLORS[cat] ?? CATEGORY_COLORS.other,
    }))
    .sort((a, b) => b.value - a.value);

  const isEmpty = data.length === 0;

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-2">
          <PieChartIcon className="size-4 text-primary" />
          <CardTitle className="text-sm font-medium text-foreground/60">
            Wydatki według kategorii
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex items-center justify-center">
        {isEmpty ? (
          <p className="text-sm text-muted-foreground py-10">Brak danych</p>
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={85}
                paddingAngle={3}
                shape={CustomPie}
                dataKey="value"
              />
              <Tooltip
                formatter={(value) => [formatPLN(Number(value)), "Miesięcznie"]}
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid rgba(0,0,0,0.08)",
                  fontSize: "12px",
                }}
              />
              <Legend
                iconType="circle"
                iconSize={8}
                formatter={(value) => (
                  <span style={{ fontSize: "12px" }}>{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}

const CustomPie = (props: PieSectorShapeProps) => {
  return <Sector {...props} fill={props.color} />;
};
