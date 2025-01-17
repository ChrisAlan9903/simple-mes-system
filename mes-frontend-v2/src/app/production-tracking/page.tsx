"use client";

import React, { useEffect, useState } from "react";
import BaseButton from "../components/base-button";
import { useRouter } from "next/navigation";
import { Production } from "@/interface/production";
import { getProductions } from "@/services/production.service";
import moment from "moment";

const ProductionTrackingPage = () => {
  const router = useRouter();

  const header = [
    "Production ID",
    "Production Name",
    "Production Status",
    "Production Date and Time",
    "Production Quantity",
  ];

  const listingItem = [
    {
      productionId: 1,
      productionName: "Widget A",
      productionStatus: "Completed",
      productionDateAndTime: "2023-10-01 08:30:00",
      productionQuantity: 150,
    },
    {
      productionId: 2,
      productionName: "Gadget B",
      productionStatus: "In Progress",
      productionDateAndTime: "2023-10-02 09:15:00",
      productionQuantity: 200,
    },
    {
      productionId: 3,
      productionName: "Tool C",
      productionStatus: "Pending",
      productionDateAndTime: "2023-10-03 10:00:00",
      productionQuantity: 100,
    },
    {
      productionId: 4,
      productionName: "Device D",
      productionStatus: "Completed",
      productionDateAndTime: "2023-10-04 11:45:00",
      productionQuantity: 300,
    },
    {
      productionId: 5,
      productionName: "Appliance E",
      productionStatus: "In Progress",
      productionDateAndTime: "2023-10-05 12:30:00",
      productionQuantity: 250,
    },
    {
      productionId: 6,
      productionName: "Machine F",
      productionStatus: "Pending",
      productionDateAndTime: "2023-10-06 13:20:00",
      productionQuantity: 175,
    },
    {
      productionId: 6,
      productionName: "Machine F",
      productionStatus: "Pending",
      productionDateAndTime: "2023-10-06 13:20:00",
      productionQuantity: 175,
    },
    {
      productionId: 6,
      productionName: "Machine F",
      productionStatus: "Pending",
      productionDateAndTime: "2023-10-06 13:20:00",
      productionQuantity: 175,
    },
    {
      productionId: 6,
      productionName: "Machine F",
      productionStatus: "Pending",
      productionDateAndTime: "2023-10-06 13:20:00",
      productionQuantity: 175,
    },
    {
      productionId: 6,
      productionName: "Machine F",
      productionStatus: "Pending",
      productionDateAndTime: "2023-10-06 13:20:00",
      productionQuantity: 175,
    },
    {
      productionId: 6,
      productionName: "Machine F",
      productionStatus: "Pending",
      productionDateAndTime: "2023-10-06 13:20:00",
      productionQuantity: 175,
    },
    {
      productionId: 6,
      productionName: "Machine F",
      productionStatus: "Pending",
      productionDateAndTime: "2023-10-06 13:20:00",
      productionQuantity: 175,
    },
    {
      productionId: 6,
      productionName: "Machine F",
      productionStatus: "Pending",
      productionDateAndTime: "2023-10-06 13:20:00",
      productionQuantity: 175,
    },
  ];

  function handleRedirect(id: number) {
    console.log("Redirect to production tracking detail page with id: ", id);
    router.push(`/production-tracking/${id}`);
  }

  const [production, setProduction] = useState<Production[]>();

  async function initProduction() {
    try {
      const res = await getProductions();
      setProduction(res);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    initProduction();
  }, []);

  return (
    <div className="w-full">
      <div className="text-3xl font-bold mt-5 mb-8">Production Tracking</div>
      <div className="w-full flex justify-end mb-5">
        <BaseButton
          onClick={() => {
            console.log("Button clickedd !!");
          }}
        >
          + New Production
        </BaseButton>
      </div>
      <ListingHeader header={header} />
      {production &&
        production.map((item, index) => (
          <ListingItem
            key={index}
            item={item}
            onClick={(id) => handleRedirect(id)}
          />
        ))}
    </div>
  );
};

export default ProductionTrackingPage;

interface ListingHeaderProps {
  header: string[];
}
const ListingHeader = ({ header }: ListingHeaderProps) => {
  return (
    <div className="w-full bg-slate-600 h-10 flex justify-between items-center">
      {header.map((item, index) => (
        <div
          key={index}
          className={`text-white pl-4 ${
            item == "Production ID" ? "flex-[0.5]" : "flex-1"
          }`}
        >
          {item}
        </div>
      ))}
      <div></div>
    </div>
  );
};

interface ListingItemProps {
  item: Production;
  onClick: (id: number) => void;
}

const ListingItem = ({ item, onClick }: ListingItemProps) => {
  const mapProductionStatus = (status: string) => {
    switch (status) {
      case "planned":
        return (
          <span className="px-3 py-2 bg-blue-600 text-white font-medium text-xs rounded-2xl">
            PLANNED
          </span>
        );
      case "in_progress":
        return (
          <span className="px-3 py-2 bg-orange-400 text-white font-medium text-xs rounded-2xl">
            IN PROGRESS
          </span>
        );
      case "cancelled":
        return (
          <span className="px-3 py-2 bg-red-600 text-white font-medium text-xs rounded-2xl">
            CANCELLED
          </span>
        );
      case "completed":
        return (
          <span className="px-3 py-2 bg-green-600 text-white font-medium text-xs rounded-2xl">
            COMPLETED
          </span>
        );
      default:
        return (
          <span className="px-3 py-2 bg-slate-600 text-white font-medium text-xs rounded-2xl">
            UNDEFINED
          </span>
        );
    }
  };

  return (
    <div
      onClick={() => onClick(item.id)}
      className="w-full h-16 flex justify-between items-center border-b-2 border-slate-400 cursor-pointer hover:bg-slate-200 transition-all duration-300"
    >
      <div className="pl-4 flex-[0.5]">{item.id || "-"}</div>
      <div className="pl-4 flex-1">{item.product_name || "-"}</div>
      <div className="pl-4 flex-1">{mapProductionStatus(item.status)}</div>
      <div className="pl-4 flex-1">
        {moment(item.start_date).format("DD MMMM YYYY h:mm A") || "-"}
      </div>
      <div className="pl-4 flex-1 flex justify-between">
        {item.quantity || "-"}
        <span className="mr-8 text-2xl text-slate-600">{">"}</span>
      </div>
    </div>
  );
};
