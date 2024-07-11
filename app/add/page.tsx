"use client";
import React, { useState, useEffect, useContext, useRef } from "react";
import TitleCreation from "../components/add/TitleCreation";
import CategorySelection from "../components/add/CategorySelection";
import ContentInput from "../components/add/ContentInput";
import ConfirmationScreen from "../components/add/ConfirmationScreen";
import { Button } from "@nextui-org/react";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { UserContext } from "../context/UserContext";
import { StepProvider, useStep } from "../context/StepContext";
import DesktopMenu from "../components/DesktopMenu";

const STEP_TITLE = 1;
const STEP_CATEGORY = 2;
const STEP_CONTENT = 3;
const STEP_CONFIRMATION = 4;

const CardCreation: React.FC = () => {
  const userContext = useContext(UserContext);
  const router = useRouter();
  const { step, setStep } = useStep();
  const [cardId, setCardId] = useState<number | null>(null);
  const [cardTitle, setCardTitle] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [content, setContent] = useState("");
  const continueButtonRef = useRef<HTMLButtonElement>(null);


  useEffect(() => {
    if (step === STEP_CONTENT) {

    }
  }, [step, cardTitle, selectedCategoryId]);

  useEffect(() => {
    if (step === STEP_CONFIRMATION) {
    }
  }, [step, content]);

  const handleBackClick = () => {
    if (step > STEP_TITLE) {
      switch (step) {
        case STEP_CATEGORY:
          setCardTitle("");
          break;
        case STEP_CONTENT:
          setSelectedCategoryId(null);
          setContent("");
          break;
        case STEP_CONFIRMATION:
          setContent("");
          break;
        default:
          break;
      }
      setStep(step - 1);
    }
  };

  const handleContinueClick = () => {
    const titleRegex = /^[\p{L}\p{N}\s\p{P}\p{S}]*$/u;
    if (!titleRegex.test(cardTitle)) {
      alert(
        "Le titre de la carte ne doit contenir que des lettres et des chiffres"
      );
      return;
    }
    if (step === STEP_CONTENT) {
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
        .then((data) => {
          setCardId(data.id);
        })
        .catch((error) => {
        });
    }
    if (step < STEP_CONFIRMATION) {
      setStep(step + 1);
    } else {
      const nbCard = (userContext?.NbCardsToReview ?? 0) + 1;
      router.push(`/today/review?id=${cardId}&nbcard=${nbCard}`);
    }
  };

  return (
    <div
      id="mainContainer"
      className="flex flex-row justify-center items-center"
    >
      <div
        id="subContainer"
        className="w-full sm:max-w-[1170px] bg-neutral-200 dark:bg-neutral-700 sm:shadow-2xl sm:shadow-neutral-200 sm:dark:shadow-black flex flex-row"
      >
        <div id="desktopMenuContainer" className="hidden sm:block">
          <DesktopMenu />
        </div>
        <div
          id="todayContentContainer"
          className="flex flex-row justify-center w-full sm:ml-48 md:ml-72"
        >
          <div
            id="contentWrapper"
            className="flex flex-row justify-center w-full"
          >
            <div
              id="addMainContainer"
              className="flex flex-col justify-between min-h-screen w-full sm:px-10 sm:pt-2"
            >
              <div
                id="addTopContainer"
                className="flex flex-col justify-center w-full h-full"
              >
                <div id="addBackIcon" className="w-full flex flex-col ">
                  <button
                    type="button"
                    onClick={handleBackClick}
                    className="text-neutral-800 dark:text-neutral-200 text-xs w-4 h-4 m-5 sm:ml-0"
                  >
                    {step > STEP_TITLE && (
                      <FontAwesomeIcon icon={faChevronLeft} />
                    )}
                  </button>
                </div>
                <div id="addContentContainer" className="h-full">
                  {step === STEP_TITLE && (
                    <TitleCreation
                      onTitleChange={setCardTitle}
                      continueButtonRef={continueButtonRef}
                    />
                  )}
                  {step === STEP_CATEGORY && (
                    <CategorySelection
                      onCategoryChange={setSelectedCategoryId}
                    />
                  )}
                  {step === STEP_CONTENT && (
                    <ContentInput onContentChange={setContent} />
                  )}
                  {step === STEP_CONFIRMATION && <ConfirmationScreen />}
                </div>
              </div>
              <div
                id="addBottomContainer"
                className="flex justify-center items-center w-full mb-32"
              >
                <Button
                  ref={continueButtonRef}
                  type="submit"
                  color="primary"
                  isDisabled={
                    cardTitle === "" ||
                    (step === STEP_CONTENT &&
                      (content === "" || cardTitle === ""))
                  }
                  variant="solid"
                  size="lg"
                  className="w-18/20 sm:w-full font-bold font-text"
                  onClick={handleContinueClick}
                >
                  {step === STEP_CATEGORY && selectedCategoryId === null
                    ? "Continuer sans catégorie"
                    : step < STEP_CONFIRMATION
                    ? "Continuer"
                    : "Voir la fiche"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CardCreationWithProvider: React.FC = () => (
  <StepProvider>
    <CardCreation />
  </StepProvider>
);

export default CardCreationWithProvider;
