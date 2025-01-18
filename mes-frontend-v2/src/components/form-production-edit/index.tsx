import BaseButton from "@/app/components/base-button";
import { Production, ProductionResponse } from "@/interface/production";
import {
  createOneProduction,
  updateOneProduction,
} from "@/services/production.service";
import exp from "constants";
import moment from "moment";
import React, { act, useState } from "react";

interface ProductionEditFormProps {
  data?: Production;
  onClose: VoidFunction;
  refreshListing: VoidFunction;
}

const ProductionEditForm = ({
  data,
  onClose,
  refreshListing,
}: ProductionEditFormProps) => {
  const [id, setId] = useState<number | undefined>(data?.id);
  const [name, setName] = useState<string | undefined>(data?.product_name);
  const [quantity, setQuantity] = useState<number | undefined>(data?.quantity);
  const [status, setStatus] = useState<string | undefined>(data?.status);
  const [startDate, setStartDate] = useState<string>(
    moment(data?.start_date).format("YYYY-MM-DDTHH:mm")
  );
  const [expectedEndDate, setExpectedEndDate] = useState<string>(
    moment(data?.expected_end_date).format("YYYY-MM-DDTHH:mm")
  );
  const [actualEndDate, setActualEndDate] = useState<string>(
    data?.actual_end_date
      ? moment(data?.actual_end_date).format("YYYY-MM-DDTHH:mm")
      : moment().format("YYYY-MM-DDTHH:mm")
  );
  const [remarks, setRemarks] = useState<string | undefined>(data?.remarks);

  async function handleSubmit(e: any) {
    e.preventDefault();
    const newProduction: ProductionResponse = {
      id: id,
      product_name: name,
      quantity: quantity,
      start_date: startDate,
      expected_end_date: expectedEndDate,
      actual_end_date: actualEndDate,
      status: status,
      remarks: remarks,
    };

    try {
      const res = await updateOneProduction(id, newProduction);
    } catch (error) {
      console.error(error);
    } finally {
      onClose();
      refreshListing();
    }

    console.log(newProduction);
  }
  return (
    <div className="max-w-[50vw] max-h-[80vh] bg-slate-50 p-3 rounded-lg overflow-auto">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Update Production Details</h2>
        <span
          onClick={onClose}
          className="px-3 py-1  rounded-full bg-slate-300 text-center text-sm hover:cursor-pointer hover:text-slate-50"
        >
          X Close
        </span>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-5">
        <div className="flex flex-col flex-1">
          <label htmlFor="" className="text-sm">
            Production Name:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-2 border-slate-400 rounded-sm h-8 px-2 focus:outline-blue-500"
          />
        </div>
        <div className="flex flex-col flex-1">
          <label htmlFor="" className="text-sm">
            Production Quantity:
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="border-2 border-slate-400 rounded-sm h-8 px-2 focus:outline-blue-500"
          />
        </div>

        <div className="flex flex-col flex-1">
          <label htmlFor="" className="text-sm">
            Start Date:
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
            Actual End Date:
          </label>
          <input
            type="datetime-local"
            value={actualEndDate}
            onChange={(e) => setActualEndDate(e.target.value)}
            className="border-2 border-slate-400 rounded-sm h-8 px-2 focus:outline-blue-500"
          />
        </div>
        <div className="flex flex-col w-[40%]">
          <label htmlFor="" className="text-sm">
            Status:
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border-2 border-slate-400 rounded-sm h-8 px-2 focus:outline-blue-500"
          >
            <option value="planned">Planned</option>
            <option value="in_progress">In Progres</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
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
          <BaseButton type={"submit"}>Update Detail</BaseButton>
        </div>
      </form>
    </div>
  );
};

export default ProductionEditForm;
