import React from "react";
import { PercentageCardBase } from "../percentage-card";

interface MachineUtilizationCardProps {
  data?: string;
}
const MachineUtilizationCard = ({ data }: MachineUtilizationCardProps) => {
  return (
    <div>
      <PercentageCardBase
        title="Machine Utilization"
        footerText={<CardFooterText />}
      >
        <div className="flex items-center justify-center gap-2 font-medium leading-none h-full w-64 text-blue-800">
          <div className="text-9xl ">{data || "0"}</div>
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
