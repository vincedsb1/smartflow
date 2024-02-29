import React from "react";
import Link from "next/link";

interface ButtonProps {
  label: string;
  type?: "normal" | "warning" | "disabled";
  disabled?: boolean;
  href?: string;
  onClick?: () => void;
  isClicked?: boolean;
}

interface ClickableButtonProps {
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

const ClickableButton: React.FC<ClickableButtonProps> = ({ onClick, className, disabled, children }) => {
  return (
    <button
      onClick={onClick}
      className={className}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

const MainButton: React.FC<ButtonProps> = ({
  label,
  type = "normal",
  disabled = false,
  href = "#",
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
    <div className="absolute top-[677px]">
     <Link href={href}>
        <ClickableButton
          onClick={onClick}
          className={`text-white font-bold py-3 px-9 rounded ${getButtonClass()} ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          } gap-2.5`}
          disabled={disabled}
        >
          {label}
        </ClickableButton>
      </Link>
    </div>
  );
};

export default MainButton;
