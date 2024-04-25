"use client";

import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useRouter } from "next/navigation";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CardAppTitle from "@/app/components/CardAppTitle";
import { Button } from "@nextui-org/button";
import { Progress } from "@nextui-org/react";

const Review: React.FC = () => {
  const userContext = useContext(UserContext);
  const router = useRouter();

  if (!userContext) {
    throw new Error("UserContext must be used within a UserContextProvider");
  }
  const [id, setId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [categoryName, setCategoryName] = useState("");
  const [nbcard, setNbcard] = useState<string | null>(null);
  const [level, setLevel] = useState(1);

  const calculatePercentage = (level: number): number => {
    return Math.round((level * 100) / 7);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get("id");
      const nbcard = urlParams.get("nbcard");
      setId(id);
      setNbcard(nbcard);
    }
  }, []);
  console.log("nbcard", nbcard);

  useEffect(() => {
    if (id) {
      const token = localStorage.getItem("token");
      fetch(`/api/cards/${id}`, {
        headers: {
          Authorization: `Bearer ${userContext.token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Card fetched review: ", data);
          setTitle(data.title);
          setAnswer(data.answer);
          setLevel(data.level);
          setCategoryName(data.categoryName);
        })
        .catch((error) => {
          console.error(
            "There has been a problem with your fetch operation:",
            error
          );
        });
    }
  }, [id, userContext.token]);

  const [cardTitle, setCardTitle] = useState("");

  const [showAnswer, setShowAnswer] = useState(false);

  const handleShowAnswer = () => {
    setShowAnswer(true);
    setCardTitle("Réponse");
  };

  const handleNextCard = () => {
    // Remove the current card from cardsToReview
    const updatedCardsToReview = userContext.cardsToReview.filter((card) => {
      if (id === null) {
        return true;
      }
      const idNumber = parseInt(id);
      return !isNaN(idNumber) && card.id !== idNumber;
    });
    userContext.setCardsToReview(updatedCardsToReview);

    // If there are still cards to review, go to the next one
    if (updatedCardsToReview.length > 0) {
      const nextCard = updatedCardsToReview[0];
      setId(nextCard.id.toString());
      setTitle(nextCard.title);
      setAnswer(nextCard.answer);
      setCategoryName(nextCard.categoryName);
      setLevel(nextCard.level);
    } else {
      // If there are no more cards to review, redirect the user
      router.push("/today");
    }

    // Reset the display of the answer
    setShowAnswer(false);
  };

  const handleIncorrectReview = () => {
    fetch(`http://localhost:3000/api/cards/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
      body: JSON.stringify({ isReviewPositive: false }),
    })
      .then((response) => response.json())
      .then((data) => {
        handleNextCard();
      })
      .catch((error) => console.error("Error:", error));
  };

  const handlePositiveReview = () => {
    fetch(`http://localhost:3000/api/cards/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
      body: JSON.stringify({ isReviewPositive: true }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Gérer la réponse de l'API ici
        handleNextCard();
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div
      id="reviewPageMainContainer"
      className="flex flex-col justify-between min-h-screen w-full"
    >
      <div
        id="reviewPageTopContainer"
        className="flex flex-col justify-center items-center w-full"
      >
        <div id="reviewBackIcon" className="w-full flex flex-row mt-16 mb-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="text-neutral-800 dark:text-neutral-200 text-xs w-4 h-4 m-5 "
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <div
            id=""
            className="flex flex-row justify-between items-center mt-2 w-14/20"
          >
            <CardAppTitle title="Réciter" size="big" />
          </div>
        </div>
        <div
          id="reviewPageHeaderContainer"
          className="flex flex-col justify-center items-center w-80"
        >
          <div
            id="reviewHeaderTopContainer"
            className="flex flex-row justify-between w-full mb-4"
          >
            <div
              id="reviewTitleCategoryColorContainer"
              className="flex flex-row "
            >
              <div id="reviewColor" className="bg-red-500 w-[6px] h-full"></div>
              <div
                id="reviewTitleCategoryContainer"
                className="flex flex-col w-full ml-2"
              >
                <div
                  id="reviewTitleContainer"
                  className="flex flex-row w-full font-title font-bold text-neutral-600 dark:text-neutral-400"
                >
                  {title}
                </div>
                <div
                  id="reviewCategoryContainer"
                  className="flex flex-row w-full font-title text-neutral-500"
                >
                  {categoryName}
                </div>
              </div>
            </div>
            <div
              id="reviewCounterContainer"
              className="flex flex-row font-title text-neutral-600 dark:text-neutral-400"
            >
              1/{nbcard}
            </div>
          </div>
          <div
            id="reviewHeaderBottomContainer"
            className="flex flex-col w-full"
          >
            <div id="reviewProgressContainer" className="flex flex-row w-full">
              <Progress
                aria-label="Loading..."
                label={`${calculatePercentage(level)} %`}
                size="md"
                value={calculatePercentage(level)}
                valueLabel={`Niveau ${level}`}
                showValueLabel={true}
                className="max-w-md text-neutral-500 text-sm font-title"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        id="reviewMiddleContainer"
        className="flex flex-col justify-center items-center w-full"
      >
        <div
          id="reviewCard"
          className="flex flex-col bg-white border-neutral-300 border-1 dark:border-neutral-700 dark:bg-neutral-800 rounded-2xl shadow-sf justify-around items-center  w-16/20 h-80 p-6 font-text"
        >
          {showAnswer ? (
            answer
          ) : (
            <>
              <div
                id="instructions"
                className="font-text text-neutral-500 dark:text-neutral-400"
              >
                Récitez la fiche
              </div>
              <div className="flex space-x-2 justify-center items-center bg-white dark:invert">
                <div className="h-2 w-2 rounded-full animate-bounce  bg-cyan-600 [animation-delay:-0.3s]"></div>
                <div className="h-2 w-2 rounded-full animate-bounce bg-cyan-600 [animation-delay:-0.15s]"></div>
                <div className="h-2 w-2 rounded-full animate-bounce bg-cyan-600 [animation-delay:-0s]"></div>
              </div>
            </>
          )}
        </div>
      </div>
      <div
        id="reviewPageBottomContainer"
        className="flex flex-col justify-center items-center w-full mb-32"
      >
        {showAnswer ? (
          <>
            <div
              id="buttonContainer"
              className="flex flex-row justify-around w-full"
            >
              <Button
                type="submit"
                color="default"
                variant="solid"
                size="lg"
                className="w-40 font-bold font-text"
                onClick={handleIncorrectReview}
              >
                Incorrect
              </Button>
              <Button
                type="submit"
                color="primary"
                variant="solid"
                size="lg"
                className="w-40 font-bold font-text"
                onClick={handlePositiveReview}
              >
                Valider
              </Button>
            </div>
          </>
        ) : (
          <Button
            type="submit"
            color="primary"
            variant="solid"
            size="lg"
            className="w-80 font-bold font-text"
            onClick={handleShowAnswer}
          >
            Voir la réponse
          </Button>
        )}
      </div>
    </div>
  );
};

export default Review;
