import BaseButton from "@/app/components/base-button";
import { InspectionResponse } from "@/interface/inspection";
import { Production, ProductionResponse } from "@/interface/production";
import { createOneInspection } from "@/services/inspection.service";
import {
  createOneProduction,
  getProductions,
} from "@/services/production.service";
import exp from "constants";
import moment from "moment";
import React, { useEffect, useState } from "react";

interface InspectionFormProps {
  onClose: VoidFunction;
  refreshListing: VoidFunction;
}

const InspectionForm = ({ onClose, refreshListing }: InspectionFormProps) => {
  const [productId, setProductId] = useState<number>();
  const [status, setStatus] = useState<string>("scheduled");
  const [startDate, setStartDate] = useState<string>(
    moment().format("YYYY-MM-DDTHH:mm")
  );
  const [inspector, setInspector] = useState<string>("");
  const [result, setResult] = useState<string>("-");
  const [quantity, setQuantity] = useState<number>(0);
  const [defect, setDefect] = useState<number>(0);
  const [remarks, setRemarks] = useState<string>("");
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
      const res = await createOneInspection(newInspection);
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
        <div className="flex flex-col w-[50%]">
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

export default InspectionForm;
