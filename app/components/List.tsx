"use client";

import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useState } from "react";
import CustomModal from "./CustomModal";

interface ListRowProps {
  color?: Color;
  mainLabel: string;
  secondaryLabel?: string | null;
  icon?: IconDefinition;
  bgcolor?: string;
  link?: string;
  colorState?: "normal" | "desactivated" | "warning";
  isModal?: boolean;
  modalTitle?: string;
  modalContent?: string;

  onClick?: () => void;
  selected?: boolean;
}

interface ListProps {
  rows: ListRowProps[];
  title: string;
  isLargeRow: boolean;
  belowListLink?: string;
  onBelowListLinkClick?: () => void;
  isModal?: boolean;
  modalIsOpen?: boolean;
  setModalIsOpen?: (isOpen: boolean) => void;
  setModalTitle?: (title: string) => void;
  setModalContent?: (content: string) => void;
  modalTitle?: string;
  modalContent: React.ReactNode | string;
  selectable?: boolean;
  onSelect?: (index: number) => void;
}

interface CustomModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  title: string;
  content: React.ReactNode;
}

const getColorClass = (
  colorState: "normal" | "desactivated" | "warning" | undefined
) => {
  switch (colorState) {
    case "normal":
      return "text-neutral-600 dark:text-neutral-200";
    case "desactivated":
      return "text-gray-300";
    case "warning":
      return "text-red-500";
    default:
      return "text-neutral-600 dark:text-neutral-200";
  }
};

type Color =
  | string
  | "red-500"
  | "orange-500"
  | "yellow-500"
  | "green-500"
  | "teal-500"
  | "blue-500"
  | "indigo-500"
  | "purple-500"
  | "pink-500"
  | "red-600"
  | "orange-600"
  | "yellow-600";

const colorClasses: Record<Color, string> = {
  "red-500": "bg-red-500",
  "orange-500": "bg-orange-500",
  "yellow-500": "bg-yellow-500",
  "green-500": "bg-green-500",
  "teal-500": "bg-teal-500",
  "blue-500": "bg-blue-500",
  "indigo-500": "bg-indigo-500",
  "purple-500": "bg-purple-500",
  "pink-500": "bg-pink-500",
  "red-600": "bg-red-600",
  "orange-600": "bg-orange-600",
  "yellow-600": "bg-yellow-600",
};

const List: React.FC<ListProps> = ({
  rows,
  title,
  isLargeRow,
  belowListLink,
  onBelowListLinkClick,
  modalIsOpen,
  setModalIsOpen,
  setModalTitle,
  setModalContent,
  modalTitle,
  modalContent,
  selectable = false,
  onSelect,
}) => {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const isOpen = modalIsOpen || false;
  return (
    <div id="ListContainer" className="flex flex-col mx-5">
      <div
        id="ListTitleContainer"
        className="mb-2 font-title font-bold text-md text-neutral-600 dark:text-neutral-300"
      >
        {title}
      </div>
      <div
        id="ListContainer"
        className="flex flex-col bg-white dark:bg-neutral-800 rounded-xl shadow-sf"
      >
        {rows.map((row, index) => {
          const RowComponent = row.isModal ? "div" : Link;
          return (
            <RowComponent
              href={row.link || ""}
              key={index}
              onClick={
                selectable
                  ? () => {
                      setSelectedRow(index);
                      onSelect && onSelect(index);
                      row.onClick && row.onClick();
                      console.log("Index de la ligne sélectionnée : ", index);
                    }
                  : row.isModal
                  ? () => {
                      if (setModalIsOpen) {
                        setModalIsOpen(true);
                      }
                      if (setModalTitle) {
                        setModalTitle(row.modalTitle || "");
                      }
                      if (setModalContent) {
                        setModalContent(row.modalContent || "");
                      }
                    }
                  : row.onClick
              }
            >
              <div
                key={index}
                id="ListRow"
                className={`flex flex-row hover:bg-cyan-200 dark:hover:bg-cyan-900 ${
                  isLargeRow ? "h-16" : "h-12"
                } ${row.bgcolor || ""} ${index === 0 ? "mt-3" : ""} ${
                  index === rows.length - 1 ? "mb-3" : ""
                } ${getColorClass(row.colorState)} ${
                  selectable && selectedRow === index
                    ? "bg-cyan-300 dark:bg-cyan-700"
                    : ""
                }`}
              >
                <div
                  id="ListRowStartIconContainer"
                  className={`flex flex-row justify-center items-center ${
                    row.color ? "w-3/20" : "w-1/20 mr-1"
                  }`}
                >
                  {row.color && (
                    <div
                      id="colorIndicator"
                      className={`h-3 w-3 rounded-full ${
                        colorClasses[row.color]
                      }`}
                    ></div>
                  )}
                </div>
                <div
                  id="ListRowLabels"
                  className={`flex flex-col flex-grow justify-center ${
                    rows.length > 1 && index !== rows.length - 1
                      ? "border-b border-neutral-200 dark:border-neutral-700"
                      : ""
                  }`}
                >
                  <div id="ListRowTopLabel" className="font-text ">
                    {row.mainLabel}
                  </div>
                  {row.secondaryLabel && (
                    <div
                      id="ListRowBottomLabel"
                      className="font-text text-neutral-400 dark:text-neutral-500"
                    >
                      {row.secondaryLabel}
                    </div>
                  )}
                </div>
                <div
                  id="ListRowEndIcon"
                  className={`w-2/20  flex flex-row justify-center items-center ${
                    rows.length > 1 && index !== rows.length - 1
                      ? "border-b border-neutral-200 dark:border-neutral-700"
                      : ""
                  }`}
                >
                  {row.icon && (
                    <FontAwesomeIcon
                      icon={row.icon}
                      className=" text-xs w-4 h-4"
                    />
                  )}
                </div>
              </div>
            </RowComponent>
          );
        })}
      </div>
      <div
        id="BelowListLinkContainer"
        className=" text-cyan-500 flex flex-row justify-end items-center font-text mt-1 cursor-pointer"
        onClick={onBelowListLinkClick}
      >
        {belowListLink}
      </div>
      <CustomModal
        isOpen={modalIsOpen || false}
        onOpenChange={() => {
          if (setModalIsOpen) {
            setModalIsOpen(!modalIsOpen);
          }
        }}
        title={modalTitle || ""}
        content={modalContent}
      />
    </div>
  );
};

export default List;
