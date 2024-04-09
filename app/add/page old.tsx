"use client";
import React, { useContext, useState } from "react";
// import MainButton from "../components/MainButton";
import CardAppTitle from "../components/CardAppTitle";
import CardAppText from "../components/CardAppText";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
// import ListColors from "../components/ListColors";
// import { Color } from "@prisma/client";
// import { UserContext } from "../context/UserContext";
import { useRouter } from "next/navigation";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

const CardCreation = () => {
  const [cardTitle, setcardTitle] = useState();
  // const userContext = useContext(UserContext);
  // const token = userContext ? userContext.token : null;
  // const [categories, setCategorie] = useState("");
  // const [selectedColor, setSelectedColor] = useState<Color | null>(null);

  // const router = useRouter();
  const handleContinueClick = async () => {};

  // const handleColorSelected = (color: Color) => {
  //   setSelectedColor(color);
  // };

  // const handleContinueClick = async () => {
  //   console.log("Selected color:", selectedColor);
  //   console.log("Categories:", categories);
  //   if (selectedColor && categories) {
  //     console.log("Token:", token);

  //     try {
  //       const response = await fetch("/api/categories/createCategories", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify({
  //           name: categories,
  //           colorId: selectedColor.id,
  //         }),
  //       });

  //       if (!response.ok) {
  //         console.log(await response.json());

  //         throw new Error("Erreur lors de la création de la catégorie");
  //       }

  //       const newCategory = await response.json();
  //       console.log("Nouvelle catégorie créée :", newCategory);
  //       router.push("/organize");
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // };

  return (
    <div
      id="addMainContainer"
      className="flex flex-col justify-between min-h-screen w-full"
    >
      <div
        id="addTopContainer"
        className="flex flex-col justify-center w-full mt-16"
      >
        <div
          id="addHeaderContainer"
          className="flex flex-col justify-center items-center w-full"
        >
          <div id="addTitle" className="flex flex-col mt-11 w-16/20 ">
            <CardAppTitle title="Nouvelle fiche" size="big" />
          </div>
          <div id="addHint" className="flex flex-col items-center w-16/20">
            <CardAppText
              text="Quel est le sujet de cette fiche ?"
              icon={faFileLines}
            />
          </div>
        </div>
      </div>
      <div
        id="addMiddleContainer"
        className="flex flex-col justify-center items-center w-full flex-grow"
      >
        <div id="addInputContainer" className="w-16/20">
          <Input
            value={cardTitle}
            // onChange={(e) => {
            //   setCategorie(e.target.value);
            // }}
            isRequired
            size="md"
            type="text"
            label="Titre de la fiche"
            radius="lg"
            className="w-full font-text mb-16"
          />
        </div>
      </div>
      <div
        id="addBottomContainer"
        className="flex flex-col justify-center items-center w-full mb-32 "
      >
        <div id="addFormContainer" className="flex flex-col justify-between ">
          <div className="flex items-center w-16/20"></div>
          <div
            id="addCGUContainer"
            className="flex flex-row w-16/20 justify-start mb-4 ml-14 mt-1"
          ></div>
          <Button
            type="submit"
            color="primary"
            variant="solid"
            size="lg"
            className="w-80 font-bold font-text"
            onClick={handleContinueClick}
          >
            Continuer
          </Button>
        </div>
      </div>
    </div>

    // <div className="flex flex-col justify-between min-h-screen w-full">
    //   <div className="flex flex-col justify-center items-center">
    //     <div id="title" className="mt-11 w-16/20">
    //       <CardAppTitle title="Nouvelle fiche" />
    //     </div>
    //     <div id="text" className="items-center w-16/20">
    //       <CardAppText
    //         text="Quel est le sujet de cette fiche ?"
    //         icon={faFileLines}
    //       />
    //     </div>
    //   </div>

    //   <div
    //     id="globalInput "
    //     className="flex flex-col align-center justify-center ml-10"
    //   >
    //     <div id="inputTitle" className="">
    //       <p>Titre</p>
    //     </div>
    //     <div id="input" className="flex justify-start">
    //       <input
    //         type="text"
    //         placeholder="Saisir le sujet"
    //         className="w-16/20 h-12 rounded-lg border border-gray-300 pl-4"
    //         value={categories}
    //         onChange={(e) => {
    //           setCategorie(e.target.value);
    //         }}
    //       />
    //     </div>
    //     <div id="composantColors" className="">
    //       <ListColors onColorSelected={handleColorSelected} />
    //     </div>
    //   </div>
    //   <div id="button" className="mb-28 flex justify-center">
    //     <MainButton
    //       label="Continuer"
    //       type="normal"
    //       disabled={false}
    //       onClick={handleContinueClick}
    //     />
    //   </div>
    // </div>
  );
};

export default CardCreation;
