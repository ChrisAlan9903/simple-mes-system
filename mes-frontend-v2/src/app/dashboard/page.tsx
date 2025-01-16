"use client";

import React from "react";

const DashboardPage = () => {
  return (
    <div className="w-full">
      <div className="text-3xl font-bold mt-5 mb-8">Dashboard</div>
      <div className="flex justify-between">
        <div className="border-2 border-orange-700 h-20">
          {"Production status card (use pie chart)"}
        </div>
        <div className="border-2 border-orange-700 h-20">
          {"Machine utilization card (percentage)"}
        </div>
        <div className="border-2 border-orange-700 h-20">
          {"Product defect rate card (percentage)"}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
