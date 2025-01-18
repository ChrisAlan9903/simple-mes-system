"use client";

import React from "react";

interface BaseButtonProps {
  children: React.ReactNode;
  type?: any;
  style?: string;
  className?: string;
  onClick?: () => void;
}

const BaseButton: React.FC<BaseButtonProps> = ({
  children,
  type = "button",
  style = "filled",
  className,
  onClick,
}: BaseButtonProps) => {
  const buttonStyle =
    style === "filled"
      ? "bg-blue-800 text-white hover:bg-blue-700 transition-all duration-300"
      : "bg-white text-blue-800 border-2 border-blue-800 hover:bg-blue-700 hover:text-white transition-all duration-300";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-8 py-3 rounded-md  ${buttonStyle} ${className}`}
    >
      <p>{children}</p>
    </button>
  );
};

export default BaseButton;
