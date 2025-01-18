"use client";

import React, { useEffect, useState } from "react";
import BaseButton from "../components/base-button";
import { useRouter } from "next/navigation";
import { Production } from "@/interface/production";
import { getProductions } from "@/services/production.service";
import moment from "moment";
import BaseDialog from "@/components/dialog";
import ProductionForm from "@/components/form-production";
import { Inspection } from "@/interface/inspection";
import { getInspections } from "@/services/inspection.service";

const ProductionTrackingPage = () => {
  const router = useRouter();

  const header = [
    "Inspection ID",
    "Product ID",
    "Inspection Status",
    "Date",
    "Inspector",
    "Quantity",
  ];

  function handleRedirect(id?: number) {
    console.log("Redirect to Quality Control detail page with id: ", id);
    router.push(`/quality-control/${id}`);
  }

  const [inspection, setInspection] = useState<Inspection[]>();
  const [openModal, setOpenModal] = useState<boolean>(false);

  async function initInspection() {
    try {
      const res = await getInspections();
      setInspection(res);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    initInspection();
  }, []);

  return (
    <div className="w-full">
      <div className="text-3xl font-bold mt-5 mb-8">Quality Inspection</div>
      <div className="w-full flex justify-end mb-5">
        <BaseButton
          onClick={() => {
            setOpenModal(true);
          }}
        >
          + Schedule Inspection
        </BaseButton>
      </div>
      <ListingHeader header={header} />
      {inspection &&
        inspection.map((item, index) => (
          <ListingItem
            key={index}
            item={item}
            onClick={(id) => handleRedirect(id)}
          />
        ))}
      {openModal && (
        <BaseDialog>
          <ProductionForm
            onClose={() => setOpenModal(false)}
            refreshListing={initInspection}
          />
        </BaseDialog>
      )}
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
            item == "Product ID" || item == "Inspection ID"
              ? "flex-[0.5]"
              : "flex-1"
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
  item: Inspection;
  onClick: (id: number | undefined) => void;
}

const ListingItem = ({ item, onClick }: ListingItemProps) => {
  const mapProductionStatus = (status: string | undefined) => {
    switch (status) {
      case "scheduled":
        return (
          <span className="px-3 py-2 bg-blue-600 text-white font-medium text-xs rounded-2xl">
            SCHEDULED
          </span>
        );
      case "ongoing":
        return (
          <span className="px-3 py-2 bg-orange-400 text-white font-medium text-xs rounded-2xl">
            ONGOING
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
      <div className="pl-4 flex-[0.5]">{item.production_order_id || "-"}</div>
      <div className="pl-4 flex-1">
        {mapProductionStatus(item.inspection_status)}
      </div>
      <div className="pl-4 flex-1">
        {moment(item.inspection_date).format("DD MMMM YYYY h:mm A") || "-"}
      </div>
      <div className="pl-4 flex-1">{item.inspector_name || "-"}</div>
      <div className="pl-4 flex-1 flex justify-between">
        {item.quantity_inspected || "-"}
        <span className="mr-8 text-2xl text-slate-600">{">"}</span>
      </div>
    </div>
  );
};
