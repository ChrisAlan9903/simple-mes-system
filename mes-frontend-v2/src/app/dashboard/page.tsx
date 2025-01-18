"use client";

import React from "react";
import { PieChartCard } from "../components/piechart";
import MachineUtilizationCard from "../components/machine-utilization-card";
import DefectRateCard from "../components/defect-rate-card";

const DashboardPage = () => {
  return (
    <div className="w-full">
      <div className="text-3xl font-bold mt-5 mb-8">Dashboard</div>
      <div className="flex justify-between flex-wrap gap-4">
        <MachineUtilizationCard />
        <PieChartCard />
        <DefectRateCard />
      </div>
    </div>
  );
};

export default DashboardPage;
