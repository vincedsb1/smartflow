import React, { useContext, useState, useEffect, useRef } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { colorClasses } from "../utils/colorUtils";
import { UserContext } from "@/app/context/UserContext";

interface Color {
  id: number;
  name: string;
  selected: boolean;
}

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onValidate: (categoryName: string, colorId: number) => void;
}

const initialColors = Object.keys(colorClasses).map((colorName, index) => ({
  id: index + 1,
  name: colorName,
  selected: index === 0,
}));

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
  isOpen,
  onClose,
  onValidate,
}) => {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("UserContext must be used within a UserContextProvider");
  }

  const [categoryName, setCategoryName] = useState("");
  const [colors, setColors] = useState<Color[]>(initialColors);
  const [isNameEmpty, setIsNameEmpty] = useState(true);
  const [isColorSelected, setIsColorSelected] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCategoryName("");
      setColors(initialColors);
      setIsNameEmpty(true);
      setIsColorSelected(false);
    }
  }, [isOpen]);

  useEffect(() => {
    setIsNameEmpty(categoryName === "");
  }, [categoryName]);

  useEffect(() => {
    setIsColorSelected(colors.some((color) => color.selected));
  }, [colors]);

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
    const nameRegex = /^[\p{L}\s\p{P}\p{S}]*$/u;
    if (!nameRegex.test(categoryName)) {
      alert(
        "Le nom de la catégorie ne doit contenir que des lettres et des chiffres"
      );
      return;
    }

    const selectedColor = colors.find((color) => color.selected);
    if (!selectedColor) {
      alert("Sélectionnez une couleur pour la catégorie");
      return;
    }
    const response = await fetch("/api/categories/createCategories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
      body: JSON.stringify({
        name: categoryName,
        colorId: selectedColor.id,
      }),
    });

    if (!response.ok) {
      console.error("Error creating category");
      return;
    }

    const data = await response.json();
    onValidate(categoryName, selectedColor.id);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Ajouter une catégorie</ModalHeader>
        <ModalBody>
          <div
            id="firstNameInputContainer"
            className="flex flex-col justify-between items-center w-full"
          >
            <Input
              type="text"
              size="md"
              radius="lg"
              label="Catégorie"
              className="mb-6 w-full font-text h-14"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              ref={inputRef}
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
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Annuler</Button>
          <Button
            color="primary"
            onClick={createCategory}
            isDisabled={isNameEmpty || !isColorSelected}
          >
            Créer la catégorie
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddCategoryModal;
