"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Cell, Label, Legend, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ProductionStatusData } from "@/interface/dashboard";
const chartData = [
  { status: "planned", value: 275, color: "#2563eb" },
  { status: "in_progress", value: 200, color: "#fb923c" },
  { status: "cancelled", value: 287, color: "#dc2626" },
  { status: "completed", value: 173, color: "#16a34a" },
];

const COLORS = ["#2563eb", "#fb923c", "#dc2626", "#16a34a", "#475569"];

interface PieChartCardProps {
  data: ProductionStatusData[];
}

export function PieChartCard() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0);
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Production Status Distribution</CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <PieChart width={320} height={350}>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="status"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            label
            labelLine
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-bold"
                      >
                        {totalVisitors.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground text-xs"
                      >
                        Total productions
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
          <Legend
            align="left"
            height={36}
            margin={{ top: 0, left: 0, right: 0, bottom: 20 }}
          />
        </PieChart>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground max-w-72 text-wrap">
          Showing production distribution by status for total production.
        </div>
      </CardFooter>
    </Card>
  );
}
