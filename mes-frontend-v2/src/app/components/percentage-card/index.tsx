"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PercentageCardBaseProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  footerText?: React.ReactNode;
}

export function PercentageCardBase({
  children,
  title,
  description,
  footerText,
}: PercentageCardBaseProps) {
  return (
    <Card className="flex flex-col w-full h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="flex-1 pb-0">{children}</CardContent>
      <CardFooter className="flex-col gap-2 text-sm">{footerText}</CardFooter>
    </Card>
  );
}

// <div className="flex items-center gap-2 font-medium leading-none">
//   Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
// </div>
// <div className="leading-none text-muted-foreground">
//   Showing total visitors for the last 6 months
// </div>
