"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  BarShapeProps,
  Sector,
} from "recharts";
import type { Subscription } from "@/queries";
import { toMonthlyPLN, formatPLN } from "@/lib/subscription-utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2 } from "lucide-react";

const getValue = (sub: Subscription) =>
  Math.round(toMonthlyPLN(sub) * 100) / 100;

interface CostChartProps {
  subscriptions: Subscription[];
}

export function CostChart({ subscriptions }: CostChartProps) {
  const active = subscriptions.filter((s) => s.isActive);

  const max =
    Math.max(
      ...subscriptions.map((sub) => Math.round(toMonthlyPLN(sub) * 100) / 100),
    ) || 1;

  const data = active
    .map((sub) => ({
      name: `${sub.emoji ?? "📦"} ${sub.name}`,
      value: getValue(sub),
      color: `oklch(0.55 0.22 ${270 - (getValue(sub) / max) * 60})`,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);

  const isEmpty = data.length === 0;

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-2">
          <BarChart2 className="size-4 text-primary" />
          <CardTitle className="text-sm font-medium text-foreground/60">
            Koszt subskrypcji / mies.
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex items-center justify-center">
        {isEmpty ? (
          <p className="text-sm text-muted-foreground py-10">Brak danych</p>
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <BarChart
              data={data}
              layout="vertical"
              margin={{ left: 8, right: 24, top: 4, bottom: 4 }}
            >
              <XAxis
                type="number"
                tickFormatter={(v) => `${v} zł`}
                tick={{ fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="name"
                width={110}
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                labelClassName="text-black"
                formatter={(value) => [formatPLN(Number(value)), "Miesięcznie"]}
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid rgba(0,0,0,0.08)",
                  fontSize: "12px",
                }}
                cursor={{ fill: "rgba(0,0,0,0.04)" }}
              />
              <Bar
                shape={CustomBar}
                dataKey="value"
                radius={[0, 6, 6, 0]}
                maxBarSize={20}
              ></Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}

const CustomBar = ({ x, y, width, height, color }: BarShapeProps) => {
  return <rect x={x} y={y} width={width} height={height} fill={color} />;
};
