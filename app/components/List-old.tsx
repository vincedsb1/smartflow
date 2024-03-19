"use client";
import React from "react";

interface ListProps {
  title?: string;
  size?: "small" | "large";
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  itemClickAction?: "select" | "navigate";
  isItemSelectable?: boolean;
  children: React.ReactNode;
  titleButton?: string;
  hasAddButton?: boolean;
  secondaryInfo?: string;
  colorIndicator?: boolean; // Added colorIndicator prop
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
  colorIndicator, // Added colorIndicator prop
}) => {
  const handleItemClick = (item: React.ReactNode) => {
    if (itemClickAction === "select") {
    } else if (itemClickAction === "navigate") {
    }
  };

  const handleAddButtonClick = () => {};

  const listSize = size === "large" ? "h-12" : "h-12";

  return (
    <div id="list-main-container">
      <div id="title-list">
        {title && (
          <h2 className="font-bold text-neutral-600 pr-1 pb-2 ">{title}</h2>
        )}
      </div>
      <div
        id="items-container"
        className="bg-neutral-300 dark:bg-neutral-700 rounded-3xl flex flex-col w-7/10"
      >
        {React.Children.map(children, (child, index) => (
          <div
            id={`item-${index}`}
            className={`list ${listSize} font-quicksand-500 font-bold text-neutral-500 items-center ${
              index === 0 ? "mt-4" : ""
            }`}
          >
            <div
              onClick={() => handleItemClick(child)}
              className="flex flex-row items-center h-10 "
            >
              {colorIndicator && (
                <div className="h-3 w-3 rounded-full ml-2 mr-1 "></div>
              )}{" "}
              {leadingIcon && <div>{leadingIcon}</div>}
              <div id="item-list" className="h-full flex items-center">
                {child}
              </div>
              {trailingIcon && <div className="p-2">{trailingIcon}</div>}
            </div>
            {children && index !== React.Children.count(children) - 1 && (
              <div className="border-t border-neutral-200 mr-0 w-11/12 mt-0"></div>
            )}
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
