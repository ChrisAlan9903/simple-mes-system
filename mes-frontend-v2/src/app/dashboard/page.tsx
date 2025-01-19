"use client";

import React, { useEffect, useState } from "react";
import { PieChartCard } from "../components/piechart";
import MachineUtilizationCard from "../components/machine-utilization-card";
import DefectRateCard from "../components/defect-rate-card";
import BaseDialog from "@/components/dialog";
import ProductionForm from "@/components/form-production";
import {
  getDefectRate,
  getMachineUtilization,
  getProductDistribution,
} from "@/services/dashboard.service";
import {
  DefectRateData,
  MachineUtilizationData,
  ProductionStatusData,
} from "@/interface/dashboard";

const DashboardPage = () => {
  const [machineData, setMachineData] = useState<MachineUtilizationData>({
    machine_utilization: 0,
  });
  const [productionData, setProductionData] = useState<ProductionStatusData[]>([
    { status: "", count: 0 },
  ]);
  const [defectData, setDefectData] = useState<DefectRateData>({
    defect_rate: 0,
  });

  async function initDashBoard() {
    try {
      const [machineRes, productionRes, defectRes] = await Promise.all([
        getMachineUtilization(),
        getProductDistribution(),
        getDefectRate(),
      ]);

      setMachineData(machineRes[0]);
      setProductionData(productionRes);
      setDefectData(defectRes[0]);

      console.log("machineRes: ", machineRes);
      console.log("productionRes: ", productionRes);
      console.log("defectRes: ", defectRes);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    initDashBoard();
  }, []);

  return (
    <div className="w-full">
      <div className="text-3xl font-bold mt-5 mb-8">Dashboard</div>
      <div className="flex justify-between flex-wrap gap-4">
        <MachineUtilizationCard data={machineData} />
        {productionData && <PieChartCard data={productionData} />}
        <DefectRateCard data={defectData} />
      </div>
    </div>
  );
};

export default DashboardPage;
