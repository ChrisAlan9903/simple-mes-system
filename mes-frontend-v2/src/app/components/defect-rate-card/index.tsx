import React from "react";
import { PercentageCardBase } from "../percentage-card";

interface DefectRateCardProps {
  data?: string;
}
const DefectRateCard = ({ data }: DefectRateCardProps) => {
  return (
    <div>
      <PercentageCardBase
        title="Product Defect Rate"
        footerText={<CardFooterText />}
      >
        <div className="flex items-center justify-center gap-2 font-medium leading-none h-full w-64 text-red-400">
          <div className="text-9xl ">{data || "0"}</div>
          <div className="flex items-baseline ">
            <span>%</span>
          </div>
        </div>
      </PercentageCardBase>
    </div>
  );
};

export default DefectRateCard;

const CardFooterText = () => {
  return (
    <div className="leading-normal text-muted-foreground max-w-64 text-wrap">
      Showing rate of defects of total production.
    </div>
  );
};
