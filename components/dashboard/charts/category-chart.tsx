"use client";

import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieSectorShapeProps,
  Sector,
  LegendProps,
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
          <ResponsiveContainer width="100%" height={260}>
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
                content={() => (
                  <div className="w-full gap-4 flex justify-center items-center flex-wrap">
                    {data.map(({ name, color }) => (
                      <div className="flex gap-1 items-center" key={name}>
                        <div
                          className="size-2 rounded-full"
                          style={{ background: color }}
                        />
                        <span style={{ fontSize: "12px", color: color }}>
                          {name}
                        </span>
                      </div>
                    ))}
                  </div>
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

const CustomLegend = (props: LegendProps) => {
  return <div>xd</div>;
};
