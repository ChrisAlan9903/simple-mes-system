import BaseButton from "@/app/components/base-button";
import { Inspection, InspectionResponse } from "@/interface/inspection";
import { Production, ProductionResponse } from "@/interface/production";
import {
  createOneInspection,
  updateOneInspection,
} from "@/services/inspection.service";
import {
  createOneProduction,
  getProductions,
} from "@/services/production.service";
import moment from "moment";

import React, { useEffect, useState } from "react";

interface InspectionFormProps {
  data?: Inspection;
  onClose: VoidFunction;
  refreshListing: VoidFunction;
}

const InspectionEditForm = ({
  data,
  onClose,
  refreshListing,
}: InspectionFormProps) => {
  const [productId, setProductId] = useState<number | undefined>(
    data?.production_order_id
  );
  const [status, setStatus] = useState<string | undefined>(
    data?.inspection_status
  );
  const [startDate, setStartDate] = useState<string>(
    moment(data?.inspection_date).format("YYYY-MM-DDTHH:mm")
  );
  const [inspector, setInspector] = useState<string | undefined>(
    data?.inspector_name
  );
  const [result, setResult] = useState<string | undefined>(data?.result);
  const [quantity, setQuantity] = useState<number | undefined>(
    data?.quantity_inspected
  );
  const [defect, setDefect] = useState<number>(data?.defects_count || 0);
  const [remarks, setRemarks] = useState<string>(data?.remarks || "-");
  const [productions, setProduction] = useState<ProductionResponse[]>([]);

  async function handleSubmit(e: any) {
    e.preventDefault();
    const newInspection: InspectionResponse = {
      production_order_id: productId || productions[0].id,
      inspection_status: status,
      inspection_date: startDate,
      inspector_name: inspector,
      result: result,
      quantity_inspected: quantity,
      defects_count: defect,
      remarks: remarks,
    };

    try {
      const res = await updateOneInspection(data?.id, newInspection);
    } catch (error) {
      console.error(error);
    } finally {
      onClose();
      refreshListing();
    }

    console.log(newInspection);
  }

  async function getProductionLists() {
    try {
      const res: any = await getProductions();
      setProduction(res);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getProductionLists();
  }, []);

  return (
    <div className="max-w-[50vw]  bg-slate-50 p-3 rounded-lg overflow-auto">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Schedule New Inspection</h2>
        <span
          onClick={onClose}
          className="px-3 py-1  rounded-full bg-slate-300 text-center text-sm hover:cursor-pointer hover:text-slate-50"
        >
          X Close
        </span>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-5">
        <div className="flex flex-col w-[45%]">
          <label htmlFor="" className="text-sm">
            Product ID
          </label>
          <select
            value={productId}
            onChange={(e) => setProductId(parseInt(e.target.value))}
            className="border-2 border-slate-400 rounded-sm h-8 px-2 focus:outline-blue-500"
          >
            {productions?.map((item, index) => (
              <option key={index} value={item.id}>
                {item.id}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col w-[45%]">
          <label htmlFor="" className="text-sm">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border-2 border-slate-400 rounded-sm h-8 px-2 focus:outline-blue-500"
          >
            <option value={"scheduled"}>Scheduled</option>
            <option value={"ongoing"}>Ongoing</option>
            <option value={"completed"}>Completed</option>
            <option value={"cancelled"}>Cancelled</option>
          </select>
        </div>
        <div className="flex flex-col flex-1">
          <label htmlFor="" className="text-sm">
            Inspection Quantity:
          </label>
          <input
            type="number"
            value={quantity}
            min={0}
            max={productions?.find((item) => item.id == productId)?.quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="border-2 border-slate-400 rounded-sm h-8 px-2 focus:outline-blue-500"
          />
        </div>
        <div className="flex flex-col flex-1">
          <label htmlFor="" className="text-sm">
            Defect Quantity:
          </label>
          <input
            type="number"
            value={defect}
            min={0}
            max={productions?.find((item) => item.id == productId)?.quantity}
            onChange={(e) => setDefect(parseInt(e.target.value))}
            className="border-2 border-slate-400 rounded-sm h-8 px-2 focus:outline-blue-500"
          />
        </div>
        <div className="flex flex-col flex-1">
          <label htmlFor="" className="text-sm">
            Inspection Date:
          </label>
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border-2 border-slate-400 rounded-sm h-8 px-2 focus:outline-blue-500"
          />
        </div>
        <div className="flex flex-col flex-1">
          <label htmlFor="" className="text-sm">
            Inspector Name
          </label>
          <input
            type="string"
            value={inspector}
            onChange={(e) => setInspector(e.target.value)}
            className="border-2 border-slate-400 rounded-sm h-8 px-2 focus:outline-blue-500"
          />
        </div>
        <div className="flex flex-col w-[45%]">
          <label htmlFor="" className="text-sm">
            Result
          </label>
          <select
            disabled={status != "completed"}
            value={result}
            onChange={(e) => setResult(e.target.value)}
            className={`border-2 border-slate-400 rounded-sm h-8 px-2 focus:outline-blue-500 ${
              status != "completed" ? "opacity-30 hover:cursor-not-allowed" : ""
            }`}
          >
            <option value={"pass"}>Pass</option>
            <option value={"fail"}>Fail</option>
          </select>
        </div>
        <div className="flex flex-col w-full h-40">
          <label htmlFor="" className="text-sm">
            Remarks:
          </label>
          <textarea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            className="border-2 border-slate-400 rounded-sm w-full h-full resize-none p-2 focus:outline-blue-500"
          />
        </div>
        <div className="w-full mt-4 flex justify-end gap-5">
          <BaseButton onClick={onClose} style="outline">
            Cancel
          </BaseButton>
          <BaseButton type={"submit"}>Schedule Inspection</BaseButton>
        </div>
      </form>
    </div>
  );
};

export default InspectionEditForm;
