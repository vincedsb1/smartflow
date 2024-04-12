"use client";

import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import { colorClasses } from "./utils/colorUtils";

interface Color {
  id: number;
  name: string;
  selected: boolean;
}

interface ListColorsProps {
  onColorSelected: (color: Color) => void;
}

const AddCategory = () => {
  const initialColors = Object.keys(colorClasses).map((colorName, index) => ({
    id: index + 1,
    name: colorName,
    selected: false,
  }));

  const [colors, setColors] = useState<Color[]>(initialColors);

  const handleColorClick = (colorId: number) => {
    setColors(
      colors.map((color) =>
        color.id === colorId
          ? { ...color, selected: true }
          : { ...color, selected: false }
      )
    );
  };
  return (
    <div
      id="firstNameInputContainer"
      className="flex flex-col justify-between items-center w-full "
    >
      <Input type="text" label="Catégorie" className="mb-6 h-9 w-full" />
      <div className="flex flex-wrap justify-center bg-neutral-200 dark:bg-neutral-800 rounded-2xl">
        {colors.map((color) => (
          <div
            key={color.id}
            className={`w-8 h-8 rounded-full hover:scale-105 hover:ring-2 ring-neutral-900 dark:ring-neutral-100 active:scale-110 transition-all bg-${
              color.name
            } m-3 cursor-pointer ${
              color.selected
                ? "ring-2 ring-neutral-900 dark:ring-neutral-100"
                : ""
            }`}
            onClick={() => handleColorClick(color.id)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default AddCategory;
