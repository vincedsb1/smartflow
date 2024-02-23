"use client";
import React from "react";

interface ListProps {
  title?: string;
  size?: "small" | "large";
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  itemClickAction?: "select" | "navigate";
  hasAddButton?: boolean;
  isItemSelectable?: boolean;
  secondaryInfo?: boolean;
  children: React.ReactNode;
  titleButton?: string;
}

const List: React.FC<ListProps> = ({
  title,
  size,
  leadingIcon,
  trailingIcon,
  itemClickAction,
  hasAddButton,
  isItemSelectable,
  secondaryInfo,
  children,
  titleButton,
}) => {
  const handleItemClick = (item: React.ReactNode) => {
    if (itemClickAction === "select") {
    } else if (itemClickAction === "navigate") {
    }
  };

  const handleAddButtonClick = () => {};

  const listSize = size === "large" ? "space-y-4" : "space-y-2";

  return (
    <div id="list-main-container" className="w-4/5 mx-auto">
      <div id="title-list">
        {title && (
          <h2 className="text-xl font-bold text-neutral-600 pr-1 pb-2 ">{title}</h2>
        )}
      </div>
      <div
        id="items-container "
        className={`list ${listSize} bg-gray-50 rounded-3xl flex flex-col`}
      >
        {React.Children.map(children, (child, index) => (
          <div
            id={`item-${index}`}
            className={`font-quicksand-500 font-bold text-neutral-500 bg-sky-200${
              index !== 0 ? "" : ""
            }`}
          >
            <div
              onClick={() => handleItemClick(child)}
              className="flex flex-row items-center space-x-2 h-10"
            >
              <div className="bg-blue-500 h-3 w-3 rounded-full "></div>{" "}
              {leadingIcon && <div>{leadingIcon}</div>}
              <div className="flex-grow border-b border-neutral-200 h-full flex-row align-middle">
                <div className="h-full flex items-center">{child}</div>
              </div>
              {trailingIcon && <div className="p-2">{trailingIcon}</div>}
            </div>
          </div>
        ))}
      </div>
      <div id="add-button-container" className="flex justify-end">
        {hasAddButton && (
          <button
            onClick={handleAddButtonClick}
            className="px-4 py-2 text-blue-500 rounded font-normal"
          >
            {titleButton}
          </button>
        )}
      </div>
    </div>
  );
};
export default List;
