"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import BaseButton from "@/app/components/base-button";
import {
  deleteOneProduction,
  getOneProduction,
} from "@/services/production.service";
import moment from "moment";
import Link from "next/link";
import BaseDialog from "@/components/dialog";
import ProductionForm from "@/components/form-production";
import ProductionEditForm from "@/components/form-production-edit";
import ConfirmationBox from "@/components/form-confirmation";
import { Inspection } from "@/interface/inspection";
import {
  deleteOneInspection,
  getOneInspection,
} from "@/services/inspection.service";
import InspectionEditForm from "@/components/form-inspection-edit";

const InspectionDetailPage = () => {
  const params = useParams();
  const pageId = Array.isArray(params.id) ? params.id[0] : params.id;
  const router = useRouter();

  const [inspectionDetail, setInspectionDetail] = useState<Inspection>();
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] =
    useState<boolean>(false);

  function statusColor(status: string) {
    switch (status) {
      case "completed":
        return "bg-green-600";
      case "ongoing":
        return "bg-orange-400";
      case "cancelled":
        return "bg-red-600";
      case "scheduled":
        return "bg-blue-600";
      default:
        return "bg-slate-600";
    }
  }

  function mapStatusText(status: string) {
    switch (status) {
      case "completed":
        return "COMPLETED";
      case "ongoing":
        return "ONGOING";
      case "cancelled":
        return "CANCELLED";
      case "scheduled":
        return "SCHEDULED";
      default:
        return "UNDEFINED";
    }
  }

  async function initInspectionDetail() {
    try {
      const res = await getOneInspection(parseInt(pageId));
      setInspectionDetail(res[0]);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete() {
    console.log("id to delete", inspectionDetail?.id);
    try {
      const res = await deleteOneInspection(inspectionDetail?.id);
    } catch (error) {
      console.error(error);
    } finally {
      router.push("/quality-control");
    }
  }

  useEffect(() => {
    initInspectionDetail();
  }, []);

  return (
    <div className="w-full mb-10">
      <div className="pt-4">
        <Link href={"/quality-control"}>{"< Go Back"}</Link>
      </div>
      <div className="text-3xl font-bold mt-3 mb-8">Inspection Details</div>

      <div className="w-[90%] sm:w-[70%] mx-auto border-2 rounded-md border-slate-300 grid grid-cols-1 gap-8 p-8 sm:grid-cols-2">
        <DetailItem label="Inspection ID">{inspectionDetail?.id}</DetailItem>
        <DetailItem label="Product ID">
          {inspectionDetail?.production_order_id}
        </DetailItem>
        <DetailItem label="Status">
          <div
            className={`px-4 py-1 text-white rounded-full w-fit ${statusColor(
              inspectionDetail?.inspection_status || "undefined"
            )} `}
          >
            {mapStatusText(inspectionDetail?.inspection_status || "undefined")}
          </div>
        </DetailItem>
        <DetailItem label="Inspection Date">
          {moment(inspectionDetail?.inspection_date).format(
            "DD MMMM YYYY h:mm A"
          ) || "-"}
        </DetailItem>
        <DetailItem label="Quantity Inspected">
          {inspectionDetail?.quantity_inspected}
        </DetailItem>
        <DetailItem label="Defect Count">
          {inspectionDetail?.defects_count || "-"}
        </DetailItem>
        <DetailItem label="Inspection Result">
          {inspectionDetail?.result?.toUpperCase() || "-"}
        </DetailItem>
        <DetailItem label="Inspector">
          {inspectionDetail?.inspector_name || "-"}
        </DetailItem>
        <DetailItem label="Remarks">
          {inspectionDetail?.remarks || "-"}
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
          <InspectionEditForm
            data={inspectionDetail}
            onClose={() => setOpenEditModal(false)}
            refreshListing={initInspectionDetail}
          />
        </BaseDialog>
      )}
      {openDeleteConfirmation && (
        <BaseDialog>
          <ConfirmationBox
            confirmText="Delete Inspection"
            onClose={() => setOpenDeleteConfirmation(false)}
            onConfirm={handleDelete}
          >
            {" Are you sure to delete this inspection records?"}
          </ConfirmationBox>
        </BaseDialog>
      )}
    </div>
  );
};

export default InspectionDetailPage;

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
