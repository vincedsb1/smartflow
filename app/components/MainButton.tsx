"use client";
import React from "react";

interface ButtonProps {
  label: string;
  type?: "normal" | "warning" | "disabled";
  buttonType?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
  isClicked?: boolean;
}

interface ClickableButtonProps {
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  buttonType?: "button" | "submit" | "reset";
}

const ClickableButton: React.FC<ClickableButtonProps> = ({
  onClick,
  className,
  disabled,
  children,
  buttonType = "button",
}) => {
  return (
    <button type={buttonType} onClick={onClick} className={className} disabled={disabled}>
      {children}
    </button>
  );
};

const MainButton: React.FC<ButtonProps> = ({
  label,
  type = "normal",
  buttonType = "button",
  disabled = false,
  onClick = () => {},
  isClicked = false,
}) => {
  const getButtonClass = () => {
    switch (type) {
      case "warning":
        return `bg-red-500 hover:bg-red-600 w-80 rounded-2xl h-12 ${
          isClicked ? "bg-neutral-400" : ""
        }`;
      case "normal":
      default:
        return `bg-emerald-600 hover:bg-emerald-500 w-80 rounded-2xl h-12 ${
          isClicked ? "bg-neutral-400" : ""
        }`;
      case "disabled":
        return "bg-gray-500 w-80 rounded-2xl h-12";
    }
  };

  return (
      <ClickableButton
        buttonType={buttonType}
        onClick={onClick}
        className={`text-white font-bold py-3 px-9 rounded ${getButtonClass()} ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        } gap-2.5`}
        disabled={disabled}
      >
        {label}
      </ClickableButton>
  );
};

export default MainButton;
