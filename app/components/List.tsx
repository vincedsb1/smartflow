import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

interface ListRowProps {
  color?: string;
  mainLabel: string;
  secondaryLabel?: string;
  icon?: IconDefinition;
  bgcolor?: string;
}

interface ListProps {
  rows: ListRowProps[];
}

const List: React.FC<ListProps> = ({ rows }) => {
  return (
    <div id="ListContainer" className="flex flex-col mx-5">
      <div
        id="ListTitleContainer"
        className=" mb-1 font-title font-bold text-lg"
      >
        Information du compte
      </div>
      <div
        id="ListContainer"
        className="flex flex-col bg-white rounded-xl shadow-sf"
      >
        {rows.map((row, index) => (
          <div
            key={index}
            id="ListRow"
            className={`flex flex-row h-16 ${row.bgcolor || ""} ${
              index === 0 ? "mt-3" : ""
            } ${index === rows.length - 1 ? "mb-3" : ""}`}
          >
            <div
              id="ListRowStartIconContainer"
              className="w-3/20  flex flex-row justify-center items-center"
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
              className="flex flex-col flex-grow justify-center "
            >
              <div
                id="ListRowTopLabel"
                className="font-text font-bold text-neutral-500"
              >
                {row.mainLabel}
              </div>
              {row.secondaryLabel && (
                <div
                  id="ListRowBottomLabel"
                  className="font-text text-neutral-500"
                >
                  {row.secondaryLabel}
                </div>
              )}
            </div>
            <div
              id="ListRowEndIcon"
              className="w-2/20  flex flex-row justify-center items-center"
            >
              {row.icon && (
                <FontAwesomeIcon
                  icon={row.icon}
                  className="text-neutral-500 text-xs"
                />
              )}
            </div>
          </div>
        ))}
      </div>
      <div
        id="BelowListLinkContainer"
        className=" text-blue-500 flex flex-row justify-end items-center font-text mt-1"
      >
        BelowListLinkContainer
      </div>
    </div>
  );
};

export default List;
