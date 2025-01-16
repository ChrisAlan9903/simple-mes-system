import React from "react";

interface BaseButtonProps {
  children: React.ReactNode;
  style?: string;
  className?: string;
  onClick?: () => void;
}

const BaseButton: React.FC<BaseButtonProps> = ({
  children,
  style = "filled",
  className,
  onClick,
}: BaseButtonProps) => {
  const buttonStyle =
    style === "filled"
      ? "bg-blue-800 text-white"
      : "bg-white text-blue-800 border-2 border-blue-800";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-8 py-3 rounded-md hover:bg-blue-700 transition-all duration-300 ${buttonStyle} ${className}`}
    >
      <p>{children}</p>
    </button>
  );
};

export default BaseButton;
