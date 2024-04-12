"use client";

import React, { useContext, useState } from "react";
import { Input } from "@nextui-org/react";
import { colorClasses } from "./utils/colorUtils";
import { UserContext } from "@/app/context/UserContext";

interface Color {
  id: number;
  name: string;
  selected: boolean;
}

interface ListColorsProps {
  onColorSelected: (color: Color) => void;
}

interface AddCategoryProps {
  onValidate: (categoryName: string, colorId: number) => void;
}

const AddCategory: React.FC<AddCategoryProps> = ({ onValidate }) => {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("UserContext must be used within a UserContextProvider");
  }
  const user = useContext(UserContext);

  const [categoryName, setCategoryName] = useState("");

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

  const createCategory = async () => {
    const selectedColor = colors.find((color) => color.selected);
    if (!selectedColor) {
      alert("Please select a color");
      return;
    }
    console.log(
      "AddCategory.tsx - Creating category with name:",
      categoryName,
      "and color ID:",
      selectedColor.id
    );
    const response = await fetch("/api/categories/createCategories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Include your JWT token here
        Authorization: `Bearer ${userContext.token}`,
      },
      body: JSON.stringify({
        name: categoryName,
        colorId: selectedColor.id,
      }),
    });

    if (!response.ok) {
      // Handle error
      console.error("Error creating category");
      return;
    }

    const data = await response.json();
    console.log("AddCategory.tsx - New category created:", data);
    console.log("New category created:", data);
    onValidate(categoryName, selectedColor.id);
  };

  return (
    <div
      id="firstNameInputContainer"
      className="flex flex-col justify-between items-center w-full "
    >
      <Input
        type="text"
        label="Catégorie"
        className="mb-6 h-9 w-full"
        value={categoryName}
        onChange={(e) => {
          setCategoryName(e.target.value);
          console.log("AddCategory.tsx - Category name input:", e.target.value);
        }}
      />
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
