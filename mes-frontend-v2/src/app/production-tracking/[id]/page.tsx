"use client";
import React from "react";
import { useParams } from "next/navigation";
import BaseButton from "@/app/components/base-button";

const ProductionTrackingDetailPage = () => {
  const params = useParams();
  const pageId = params.id;
  const data = {
    productionId: pageId,
    productionName: "Widget A",
    productionStatus: "Completed",
    startTime: "2023-10-01 08:30:00",
    expectedEndTime: "2023-10-01 08:30:00",
    actualEndTime: "2023-10-01 08:30:00",
    productionQuantity: 150,
  };

  function statusColor(status: string) {
    switch (status) {
      case "Completed":
        return "bg-green-500";
      case "In Progress":
        return "bg-yellow-500";
      case "Pending":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  }

  return (
    <div className="w-full">
      <div className="text-3xl font-bold mt-5 mb-8">
        Production Tracking Details
      </div>

      <div className="w-[90%] sm:w-[70%] mx-auto border-2 rounded-md border-slate-300 grid grid-cols-1 gap-8 p-8 sm:grid-cols-2">
        <DetailItem label="Production Id">{data.productionId}</DetailItem>
        <DetailItem label="Production Name">{data.productionName}</DetailItem>
        <DetailItem label="Status">
          <div
            className={`px-4 py-1 text-white rounded-full w-fit ${statusColor(
              data.productionStatus
            )} `}
          >
            {data.productionStatus}
          </div>
        </DetailItem>
        <DetailItem label="Production Quantity">
          {data.productionQuantity}
        </DetailItem>
        <DetailItem label="Start Time">{data.startTime}</DetailItem>
        <DetailItem label="Expected End Time">
          {data.expectedEndTime}
        </DetailItem>
        <DetailItem label="Actual End Time">{data.actualEndTime}</DetailItem>
      </div>
      <div className="flex justify-between w-[90%] sm:w-[70%] mx-auto mt-8">
        <BaseButton style="filled" className="w-[40%] font-bold">
          Update Detail
        </BaseButton>

        <BaseButton
          style="outline"
          className="w-[40%] border-red-600 text-red-600 font-bold"
        >
          Delete Record
        </BaseButton>
      </div>
    </div>
  );
};

export default ProductionTrackingDetailPage;

interface DetailItemProps {
  children: React.ReactNode;
  label: string;
}

const DetailItem = ({ children, label }: DetailItemProps) => {
  return (
    <div className="">
      <label className="text-base ">{label}:</label>
      <p className="font-bold">{children}</p>
    </div>
  );
};
