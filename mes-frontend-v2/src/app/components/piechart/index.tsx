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
import { useEffect, useState } from "react";
// const chartData = [
//   { status: "planned", count: 275, color: "#2563eb" },
//   { status: "in_progress", count: 200, color: "#fb923c" },
//   { status: "cancelled", count: 287, color: "#dc2626" },
//   { status: "completed", count: 173, color: "#16a34a" },
// ];

const COLORS = ["#2563eb", "#fb923c", "#dc2626", "#16a34a", "#475569"];

interface PieChartCardProps {
  data: ProductionStatusData[];
}

export function PieChartCard({ data }: PieChartCardProps) {
  const [chartData, setChartData] =
    useState<{ status: string; count: number; colour: string }[]>();
  const totalVisitors = React.useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.count, 0);
  }, []);

  function mapStatusText(status: string) {
    switch (status) {
      case "completed":
        return "Completed";
      case "in_progress":
        return "In Progress";
      case "cancelled":
        return "Cancelled";
      case "planned":
        return "Planned";
      default:
        return "Undefined";
    }
  }
  function mapStatusColor(status: string) {
    switch (status) {
      case "planned":
        return "#2563eb";
      case "in_progress":
        return "#fb923c";
      case "cancelled":
        return "#dc2626";
      case "completed":
        return "#16a34a";
      default:
        return "#475569";
    }
  }

  function convertedChartData(data: ProductionStatusData[]) {
    return data.map((item) => ({
      status: mapStatusText(item.status),
      count: item.count,
      colour: mapStatusColor(item.status),
    }));
  }

  useEffect(() => {
    if (data) {
      const newData = convertedChartData(data);
      setChartData(newData);
    }
  }, [data]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Production Status Distribution</CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent className="flex-1 pb-0 mt-5">
        {chartData && (
          <PieChart width={320} height={350}>
            <Pie
              data={chartData}
              dataKey="count"
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
              verticalAlign="top"
              align="left"
              height={36}
              margin={{ top: 0, left: 0, right: 0, bottom: 20 }}
            />
          </PieChart>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground max-w-72 text-wrap">
          Showing production distribution by status for total production.
        </div>
      </CardFooter>
    </Card>
  );
}
