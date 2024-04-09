"use client";
import React, { useState, useEffect } from "react";
import TitleCreation from "../components/add/TitleCreation";
import CategorySelection from "../components/add/CategorySelection";
import ContentInput from "../components/add/ContentInput";
import ConfirmationScreen from "../components/add/ConfirmationScreen";
import { Button } from "@nextui-org/react";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CardCreation = () => {
  const [step, setStep] = useState(1);

  const [cardTitle, setCardTitle] = useState("");
  useEffect(() => {
    if (step === 2) {
      console.log("Titre de la carte : ", cardTitle);
    }
  }, [step, cardTitle]);
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  const handleContinueClick = () => {
    if (step < 4) {
      setStep(step + 1);
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
          </button>
        </div>
        <div id="addContentContainer">
          {step === 1 && <TitleCreation onTitleChange={setCardTitle} />}
          {step === 2 && <CategorySelection />}
          {step === 3 && <ContentInput />}
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
          variant="solid"
          size="lg"
          className="w-80 font-bold font-text"
          onClick={handleContinueClick}
        >
          Continuer
        </Button>
      </div>
    </div>
  );
};

export default CardCreation;
