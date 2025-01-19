import React from "react";
import { PercentageCardBase } from "../percentage-card";
import { DefectRateData } from "@/interface/dashboard";

interface DefectRateCardProps {
  data: DefectRateData;
}
const DefectRateCard = ({ data }: DefectRateCardProps) => {
  function convertToStringPercentage(data: number) {
    return (data * 100).toString();
  }

  return (
    <div>
      <PercentageCardBase
        title="Product Defect Rate"
        footerText={<CardFooterText />}
      >
        <div className="flex items-center justify-center gap-2 font-medium leading-none h-full w-64 text-red-400">
          <div className="text-9xl ">
            {convertToStringPercentage(data?.defect_rate) || "0"}
          </div>
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
