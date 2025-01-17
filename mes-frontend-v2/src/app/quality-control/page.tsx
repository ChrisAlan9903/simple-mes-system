"use client";
import { getInspections } from "@/services/inspection.service";
import { getProductions } from "@/services/production.service";
import React from "react";

const QualityControlPage = () => {
  async function handleTestAPI() {
    // const response = await getProductions();
    const response = await getInspections();
    console.log(`response from api: `, response);
  }
  return (
    <div className="w-full">
      <div className="text-3xl font-bold mt-5 mb-8">Quality Control</div>
      <div>Table listing</div>
      <div>
        <button
          onClick={handleTestAPI}
          className="px-6 py-4 bg-blue-500 text-white border-2 border-blue-500 rounded-md"
        >
          Test api
        </button>
      </div>
    </div>
  );
};

export default QualityControlPage;
