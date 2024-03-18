import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import Link from "next/link";
import CustomModal from "./CustomModal";

interface ListRowProps {
  color?: string;
  mainLabel: string;
  secondaryLabel?: string;
  icon?: IconDefinition;
  bgcolor?: string;
  link?: string;
  colorState?: "normal" | "desactivated" | "warning";
  isModal?: boolean;
  modalTitle?: string;
  modalContent?: string;
}

interface ListProps {
  rows: ListRowProps[];
  title: string;
  isLargeRow: boolean;
  belowListLink?: string;
  onBelowListLinkClick?: () => void;
  modalIsOpen: boolean;
  setModalIsOpen: (isOpen: boolean) => void;
  setModalTitle: (title: string) => void;
  setModalContent: (content: string) => void;
  modalTitle: string;
  modalContent: string;
}

interface CustomModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  title: string;
  content: string;
}

const getColorClass = (
  colorState: "normal" | "desactivated" | "warning" | undefined
) => {
  switch (colorState) {
    case "normal":
      return "text-neutral-500";
    case "desactivated":
      return "text-gray-300";
    case "warning":
      return "text-red-500";
    default:
      return "text-neutral-500";
  }
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
}) => {
  return (
    <div id="ListContainer" className="flex flex-col mx-5">
      <div
        id="ListTitleContainer"
        className=" mb-1 font-title font-bold text-lg text-neutral-600"
      >
        {title}
      </div>
      <div
        id="ListContainer"
        className="flex flex-col bg-white rounded-xl shadow-sf"
      >
        {rows.map((row, index) => {
          const RowComponent = row.isModal ? "div" : Link;
          return (
            <RowComponent
              href={row.link || ""}
              key={index}
              onClick={
                row.isModal
                  ? () => {
                      setModalIsOpen(true);
                      setModalTitle(row.modalTitle || "");
                      setModalContent(row.modalContent || "");
                    }
                  : undefined
              }
            >
              <div
                key={index}
                id="ListRow"
                className={`flex flex-row hover:bg-emerald-300 ${
                  isLargeRow ? "h-16" : "h-12"
                } ${row.bgcolor || ""} ${index === 0 ? "mt-3" : ""} ${
                  index === rows.length - 1 ? "mb-3" : ""
                } ${getColorClass(row.colorState)}`}
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
                      className={`h-3 w-3 rounded-full ${row.color}`}
                    ></div>
                  )}
                </div>
                <div
                  id="ListRowLabels"
                  className={`flex flex-col flex-grow justify-center ${
                    rows.length > 1 && index !== rows.length - 1
                      ? "border-b border-neutral-200"
                      : ""
                  }`}
                >
                  <div id="ListRowTopLabel" className="font-text font-bold ">
                    {row.mainLabel}
                  </div>
                  {row.secondaryLabel && (
                    <div
                      id="ListRowBottomLabel"
                      className="font-text text-neutral-400"
                    >
                      {row.secondaryLabel}
                    </div>
                  )}
                </div>
                <div
                  id="ListRowEndIcon"
                  className={`w-2/20  flex flex-row justify-center items-center ${
                    rows.length > 1 && index !== rows.length - 1
                      ? "border-b border-neutral-200"
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
        className=" text-blue-500 flex flex-row justify-end items-center font-text mt-1 cursor-pointer"
        onClick={onBelowListLinkClick}
      >
        {belowListLink}
      </div>
      <CustomModal
        isOpen={modalIsOpen}
        onOpenChange={() => setModalIsOpen(!modalIsOpen)}
        title={modalTitle}
        content={modalContent}
      />
    </div>
  );
};

export default List;
