"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BaseButton from "@/app/components/base-button";
import { Production } from "@/interface/production";
import { getOneProduction } from "@/services/production.service";
import moment from "moment";
import Link from "next/link";
import BaseDialog from "@/components/dialog";
import ProductionForm from "@/components/form-production";
import ProductionEditForm from "@/components/form-production-edit";
import ConfirmationBox from "@/components/form-confirmation";

const ProductionTrackingDetailPage = () => {
  const params = useParams();
  const pageId = Array.isArray(params.id) ? params.id[0] : params.id;

  const [productionDetail, setProductionDetail] = useState<Production>();
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] =
    useState<boolean>(false);

  function statusColor(status: string) {
    switch (status) {
      case "completed":
        return "bg-green-600";
      case "in_progress":
        return "bg-orange-400";
      case "cancelled":
        return "bg-red-600";
      case "planned":
        return "bg-blue-600";
      default:
        return "bg-slate-600";
    }
  }

  function mapStatusText(status: string) {
    switch (status) {
      case "completed":
        return "COMPLETED";
      case "in_progress":
        return "IN PROGRESS";
      case "cancelled":
        return "CANCELLED";
      case "planned":
        return "PLANNED";
      default:
        return "UNDEFINED";
    }
  }

  async function initProductionDetail() {
    try {
      const res = await getOneProduction(parseInt(pageId));
      setProductionDetail(res[0]);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete() {
    console.log("id to delete", productionDetail?.id);
  }

  useEffect(() => {
    initProductionDetail();
  }, []);

  return (
    <div className="w-full">
      <div className="pt-4">
        <Link href={"/production-tracking"}>{"< Go Back"}</Link>
      </div>
      <div className="text-3xl font-bold mt-3 mb-8">
        Production Tracking Details
      </div>

      <div className="w-[90%] sm:w-[70%] mx-auto border-2 rounded-md border-slate-300 grid grid-cols-1 gap-8 p-8 sm:grid-cols-2">
        <DetailItem label="Production Id">{productionDetail?.id}</DetailItem>
        <DetailItem label="Production Name">
          {productionDetail?.product_name}
        </DetailItem>
        <DetailItem label="Status">
          <div
            className={`px-4 py-1 text-white rounded-full w-fit ${statusColor(
              productionDetail?.status || "undefined"
            )} `}
          >
            {mapStatusText(productionDetail?.status || "undefined")}
          </div>
        </DetailItem>
        <DetailItem label="Production Quantity">
          {productionDetail?.quantity}
        </DetailItem>
        <DetailItem label="Start Time">
          {moment(productionDetail?.start_date).format("DD MMMM YYYY h:mm A") ||
            "-"}
        </DetailItem>
        <DetailItem label="Expected End Time">
          {moment(productionDetail?.expected_end_date).format(
            "DD MMMM YYYY h:mm A"
          ) || "-"}
        </DetailItem>
        <DetailItem label="Actual End Time">
          {moment(productionDetail?.actual_end_date).format(
            "DD MMMM YYYY h:mm A"
          ) || "-"}
        </DetailItem>
        <DetailItem label="Remarks">
          {productionDetail?.remarks || "-"}
        </DetailItem>
      </div>
      <div className="flex justify-between w-[90%] sm:w-[70%] mx-auto mt-8">
        <BaseButton
          onClick={() => setOpenEditModal(true)}
          style="filled"
          className="w-[40%] font-bold"
        >
          Update Detail
        </BaseButton>

        <BaseButton
          onClick={() => setOpenDeleteConfirmation(true)}
          style="outline"
          className="w-[40%] border-red-600 text-red-600 font-bold hover:bg-red-500"
        >
          Delete Record
        </BaseButton>
      </div>
      {openEditModal && (
        <BaseDialog>
          <ProductionEditForm
            data={productionDetail}
            onClose={() => setOpenEditModal(false)}
            refreshListing={initProductionDetail}
          />
        </BaseDialog>
      )}
      {openDeleteConfirmation && (
        <BaseDialog>
          <ConfirmationBox
            confirmText="Delete Production"
            onClose={() => setOpenDeleteConfirmation(false)}
            onConfirm={handleDelete}
          >
            {" Are you sure to delete this production records?"}
          </ConfirmationBox>
        </BaseDialog>
      )}
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
