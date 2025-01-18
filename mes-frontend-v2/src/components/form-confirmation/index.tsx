"use client";

import BaseButton from "@/app/components/base-button";
import React from "react";
interface ConfirmationBoxProps {
  children: React.ReactNode;
  confirmText?: string;
  onClose?: VoidFunction;
  onConfirm?: VoidFunction;
}

const ConfirmationBox = ({
  children,
  confirmText,
  onClose,
  onConfirm,
}: ConfirmationBoxProps) => {
  return (
    <div className="max-w-[50vw] max-h-[80vh] bg-slate-50 p-5 rounded-lg overflow-auto ">
      <p className="my-5">{children}</p>
      <div className="min-w-[520px] w-full mt-10 flex justify-end gap-5">
        <BaseButton onClick={onClose} style="outline">
          Cancel
        </BaseButton>
        <BaseButton onClick={onConfirm} className="bg-red-600 hover:bg-red-400">
          {confirmText || "Confirm"}
        </BaseButton>
      </div>
    </div>
  );
};

export default ConfirmationBox;
