import React, { useState } from "react";
import CustomModalColorsList from "./CustomModalColorsList";

interface Color {
  id: number;
  name: string;
  selected: boolean;
}

interface ListColorsProps {
  onColorSelected: (color: Color) => void;
}

const ListColors: React.FC<ListColorsProps> = ({ onColorSelected }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [colors, setColors] = useState<Color[]>([
    { id: 1, name: "red-500", selected: false },
    { id: 2, name: "orange-500", selected: false },
    { id: 3, name: "yellow-500", selected: false },
    { id: 4, name: "green-500", selected: false },
    { id: 5, name: "teal-500", selected: false },
    { id: 6, name: "blue-500", selected: false },
    { id: 7, name: "indigo-500", selected: false },
    { id: 8, name: "purple-500", selected: false },
    { id: 9, name: "pink-500", selected: false },
    { id: 10, name: "red-600", selected: false },
    { id: 11, name: "orange-600", selected: false },
    { id: 12, name: "yellow-600", selected: false },
  ]);

  const handleColorClick = (colorId: number) => {
    setColors(colors.map(color => color.id === colorId ? { ...color, selected: true } : { ...color, selected: false }));
  };

  const handleSaveClick = () => {
    const selectedColor = colors.find(color => color.selected);
    if (selectedColor) {
      onColorSelected(selectedColor);
      console.log(selectedColor);
    }
    setIsOpen(false);
  };

  return (
    <div>
      <button className="text-blue-500 text-sm font-regular" onClick={() => setIsOpen(true)}>
        Ajouter une catégorie
      </button>
      <CustomModalColorsList
        isOpen={isOpen}
        onOpenChange={() => setIsOpen(!isOpen)}
        title="Nouvelle catégorie"
        content={
          <div className="flex flex-wrap justify-center bg-neutral-200 rounded-lg">
            {colors.map((color) => (
              <div
                key={color.id}
                className={`w-8 h-8 rounded-full bg-${color.name} m-2 cursor-pointer ${color.selected ? 'ring-2 ring-black' : ''}`}
                onClick={() => handleColorClick(color.id)}
              ></div>
            ))}
          </div>
        }
        onSave={handleSaveClick}
      />
    </div>
  );
};


export default ListColors;