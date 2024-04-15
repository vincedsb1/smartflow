"use client";
import React, { useContext, useState } from "react";
import MainButton from "../components/MainButton";
import CardAppTitle from "../components/CardAppTitle";
import CardAppText from "../components/CardAppText";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import ListColors from "../components/ListColors";
import { Color } from "@prisma/client";
import { UserContext } from "../context/UserContext";
import { useRouter } from "next/navigation";




const Add = () => {
const userContext = useContext(UserContext);
  const token = userContext ? userContext.token : null;
  const [categories, setCategorie] = useState("");
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);

  const router = useRouter();
  
  const handleColorSelected = (color: Color) => {
    setSelectedColor(color);
  };

  const handleContinueClick = async () => {
    console.log("Selected color:", selectedColor); 
    console.log("Categories:", categories);
    if (selectedColor && categories) {
      console.log("Token:", token);

      try {
        const response = await fetch("/api/categories/createCategories", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json', 
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: categories,
            colorId: selectedColor.id,
          }),
        });

        if (!response.ok) {
          console.log(await response.json()); 

          throw new Error("Erreur lors de la création de la catégorie");
        }

        const newCategory = await response.json();
        console.log("Nouvelle catégorie créée :", newCategory);
        router.push("/organize");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="flex flex-col justify-between min-h-screen w-full">
      <div className="flex flex-col justify-center items-center">
        <div id="title" className="mt-11 w-16/20">
          <CardAppTitle title="Nouvelle fiche" />
        </div>
        <div id="text" className="items-center w-16/20">
          <CardAppText
            text="Quel est le sujet de cette fiche ?"
            icon={faFileLines}
          />
        </div>
      </div>

      <div
        id="globalInput "
        className="flex flex-col align-center justify-center ml-10"
      >
        <div id="inputTitle" className="">
          <p>Titre</p>
        </div>
        <div id="input" className="flex justify-start">
          <input
            type="text"
            placeholder="Saisir le sujet"
            className="w-16/20 h-12 rounded-lg border border-gray-300 pl-4"
            value={categories}
            onChange={(e) => {
              setCategorie(e.target.value);
            }}
          />
        </div>
        <div id="composantColors" className="">
          <ListColors onColorSelected={handleColorSelected} />
        </div>
      </div>
      <div id="button" className="mb-28 flex justify-center">
        <MainButton
          label="Continuer"
          type="normal"
          disabled={categories === ""}
          onClick={handleContinueClick}
        />
      </div>
    </div>
  );
};

export default Add;
