import BaseButton from "@/app/components/base-button";
import { Production, ProductionResponse } from "@/interface/production";
import exp from "constants";
import moment from "moment";
import React, { useState } from "react";

interface ProductionFormProps {
  onClose: VoidFunction;
}

const ProductionForm = ({ onClose }: ProductionFormProps) => {
  const [name, setName] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>("2025-01-18T16:40");
  const [expectedEndDate, setExpectedEndDate] =
    useState<string>("2018-06-12T19:30");
  const [remarks, setRemarks] = useState<string>("");

  function addProduction() {
    console.log("Add Production button clicked");
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    const newProduction: ProductionResponse = {
      product_name: name,
      quantity: quantity,
      start_date: startDate,
      expected_end_date: expectedEndDate,
      actual_end_date: null,
      status: "planned",
      remarks: remarks,
    };

    console.log(newProduction);
  }
  return (
    <div className="max-w-[50vw] max-h-[80vh] bg-slate-50 p-3 rounded-lg overflow-auto">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Add New Production</h2>
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
            Expected End Date Date:
          </label>
          <input
            type="datetime-local"
            value={expectedEndDate}
            onChange={(e) => setExpectedEndDate(e.target.value)}
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
          <BaseButton type={"submit"}>Add Production</BaseButton>
        </div>
      </form>
    </div>
  );
};

export default ProductionForm;
