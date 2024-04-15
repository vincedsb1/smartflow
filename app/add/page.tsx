"use client";
import React, { useState, useEffect, useContext } from "react";
import TitleCreation from "../components/add/TitleCreation";
import CategorySelection from "../components/add/CategorySelection";
import ContentInput from "../components/add/ContentInput";
import ConfirmationScreen from "../components/add/ConfirmationScreen";
import { Button } from "@nextui-org/react";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { UserContext } from "../context/UserContext";

const CardCreation = () => {
  const userContext = useContext(UserContext);
  const [step, setStep] = useState(1);

  const handleCategoryChange = (id: number) => {
    setSelectedCategoryId(id);
  };

  const [cardTitle, setCardTitle] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  useEffect(() => {
    if (step === 3) {
      // Change this line
      console.log("Titre de la carte : ", cardTitle);
      console.log("ID de la catégorie sélectionnée : ", selectedCategoryId);
    }
  }, [step, cardTitle, selectedCategoryId]);

  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (step === 4) {
      console.log("Contenu de la carte : ", content);
    }
  }, [step, content]);

  const router = useRouter();

  const handleContinueClick = () => {
    if (step === 3) {
      console.log("Route Add card");
      const token = localStorage.getItem("token");
      fetch("/api/cards/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userContext?.token ?? ""}`,
        },
        body: JSON.stringify({
          title: cardTitle,
          category: selectedCategoryId,
          content: content,
        }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => {
          console.error("Error:", error);
        });
    }

    if (step < 4) {
      setStep(step + 1);
    } else {
      router.push("/today");
    }
  };

  return (
    <div
      id="addMainContainer"
      className="flex flex-col justify-between min-h-screen w-full"
    >
      <div
        id="addTopContainer"
        className="flex flex-col justify-center w-full "
      >
        <div id="birthdayBackIcon" className="w-full flex flex-col mt-16">
          <button
            type="button"
            onClick={() => {
              if (step > 1) {
                setStep(step - 1);
              }
            }}
            className="text-neutral-800 dark:text-neutral-200 text-xs w-4 h-4 m-5"
          >
            {step > 1 && <FontAwesomeIcon icon={faChevronLeft} />}
            {/* {step > 1 && step < 4 && <FontAwesomeIcon icon={faChevronLeft} />} */}
          </button>
        </div>
        <div id="addContentContainer">
          {step === 1 && <TitleCreation onTitleChange={setCardTitle} />}
          {step === 2 && (
            <CategorySelection onCategoryChange={handleCategoryChange} />
          )}
          {step === 3 && <ContentInput onContentChange={setContent} />}
          {step === 4 && <ConfirmationScreen />}
        </div>
      </div>

      <div
        id="addBottomContainer"
        className="flex flex-col justify-center items-center w-full mb-32 "
      >
        {/* <Button onClick={handleContinueClick}>Continuer</Button> */}
        <Button
          type="submit"
          color="primary"
          isDisabled={cardTitle === "" || (step === 3 && content === "")}
          variant="solid"
          size="lg"
          className="w-80 font-bold font-text"
          onClick={handleContinueClick}
        >
          {step === 2 && selectedCategoryId === null ? "Continuer sans catégorie" : (step < 4 ? "Continuer" : "Voir la fiche")}
        </Button>
      </div>
    </div>
  );
};

export default CardCreation;
