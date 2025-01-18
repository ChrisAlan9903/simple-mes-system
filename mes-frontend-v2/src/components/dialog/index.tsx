"use client";
import React from "react";

interface BaseDialogProps {
  children: React.ReactNode;
  onOpen?: VoidFunction;
  onClose?: VoidFunction;
}

const BaseDialog = ({ children, onOpen, onClose }: BaseDialogProps) => {
  return (
    <div className="absolute w-screen h-screen z-10 bg-slate-600 bg-opacity-65 top-0 left-0 flex justify-center items-center shadow-sm">
      {children}
    </div>
  );
};

export default BaseDialog;
