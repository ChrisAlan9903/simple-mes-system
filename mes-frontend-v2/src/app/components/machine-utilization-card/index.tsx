import React from "react";
import { PercentageCardBase } from "../percentage-card";
import { MachineUtilizationData } from "@/interface/dashboard";

interface MachineUtilizationCardProps {
  data: MachineUtilizationData;
}
const MachineUtilizationCard = ({ data }: MachineUtilizationCardProps) => {
  function convertToStringPercentage(data: number) {
    return (data * 100).toFixed(1).toString();
  }
  return (
    <div>
      <PercentageCardBase
        title="Machine Utilization"
        footerText={<CardFooterText />}
      >
        <div className="flex items-center justify-center gap-2 font-medium leading-none h-full w-64 text-blue-800">
          <div className="text-7xl ">
            {convertToStringPercentage(data?.machine_utilization) || "0"}
          </div>
          <div className="flex items-baseline ">
            <span>%</span>
          </div>
        </div>
      </PercentageCardBase>
    </div>
  );
};

export default MachineUtilizationCard;

const CardFooterText = () => {
  return (
    <div className="leading-normal text-muted-foreground max-w-64 text-wrap ">
      Showing percentage of machine utilization in total production.
    </div>
  );
};
