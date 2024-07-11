"use client";

import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useRouter } from "next/navigation";
import DesktopMenu from "../../components/DesktopMenu";
import ReviewQuestionButtons from "@/app/components/review/ReviewQuestionButtons";
import ReviewAnswerButtons from "@/app/components/review/ReviewAnswerButtons";
import ReviewHeaderMobile from "@/app/components/review/ReviewHeaderMobile";
import ReviewHeaderDesktop from "@/app/components/review/ReviewHeaderDesktop";
import ReviewContent from "@/app/components/review/ReviewContent";

const Review: React.FC = () => {
  const userContext = useContext(UserContext);
  const apiUrl = process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL;
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
  const [cardCount, setCardCount] = useState(1);
  const [showAnswer, setShowAnswer] = useState(false);
  const [forceRender, setForceRender] = useState(0);
  const [categoryColorName, setCategoryColorName] = useState("defaultColor");
  const calculatePercentage = (level: number): number =>
    Math.round((level * 100) / 7);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      setId(urlParams.get("id"));
      setNbcard(urlParams.get("nbcard"));
    }
  }, []);

  useEffect(() => {
    if (id) {
      fetch(`/api/cards/${id}`, {
        headers: { Authorization: `Bearer ${userContext.token}` },
      })
        .then((response) => response.json())
        .then((data) => {

          setTitle(data.title);
          setAnswer(data.answer);
          setLevel(data.level);
          setCategoryName(data.categoryName);
          const colorFromAPI = data.categoryColor;
          setCategoryColorName(colorFromAPI || "defaultColor");
        })
        .catch((error) => console.error("Fetch error:", error));
    }
  }, [id, userContext.token]);

  useEffect(() => {
  }, [categoryColorName]);

  const handleShowAnswer = () => setShowAnswer(true);

  const handleNextCard = () => {
    const updatedCardsToReview = userContext.cardsToReview.filter(
      (card) => card.id !== parseInt(id!)
    );
    userContext.setCardsToReview(updatedCardsToReview);

    if (updatedCardsToReview.length > 0) {
      const nextCard = updatedCardsToReview[0];
      setId(nextCard.id.toString());
      setTitle(nextCard.title);
      setAnswer(nextCard.answer);
      setCategoryName(nextCard.categoryName);
      setLevel(nextCard.level);
    } else {
      router.push("/today/");
    }

    setShowAnswer(false);
    setCardCount(cardCount + 1);
  };

  const handleReview = (isPositive: boolean) => {
    fetch(`/api/cards/${id}`, {
      // Utilisation du proxy
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
      body: JSON.stringify({ isReviewPositive: isPositive }),
    })
      .then((response) => response.json())
      .then(() => {
        handleNextCard();
        userContext.setNbCardsToReview(userContext.NbCardsToReview - 1);
      })
      .catch((error) => console.error("Error:", error));
  };

  const shuffle = (array: any[]) => {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  };

  const handleShuffle = () => {
    const shuffledCards = shuffle(userContext.cardsToReview);
    userContext.setCardsToReview(shuffledCards);
    setId(shuffledCards[0]?.id.toString());
    setCardCount(1);
    setForceRender((prev) => prev + 1);
  };

  return (
    <div
      id="reviewMainContainer"
      className="flex flex-row justify-center items-center"
    >
      <div
        id="ReviewSubMainContainer"
        className="w-full sm:max-w-[1170px] bg-neutral-200 dark:bg-neutral-700 sm:shadow-2xl sm:shadow-neutral-200 sm:dark:shadow-black flex flex-row pb-24 sm:pb-0"
      >
        <div id="todayMenuContainer" className="hidden sm:block">
          <DesktopMenu />
        </div>
        <div
          id="reviewPageMainContainer"
          className="flex flex-col justify-between min-h-screen w-full sm:pl-48 md:pl-72"
        >
          <ReviewHeaderMobile
            className="block sm:hidden mb-4 2xs:mb-8 3xs:mb-10 sm:mb-16"
            router={router}
            cardCount={cardCount}
            nbcard={nbcard}
            title={title}
            categoryName={categoryName}
            level={level}
            calculatePercentage={calculatePercentage}
            color={categoryColorName}
          />
          <ReviewHeaderDesktop
            className="hidden sm:flex mb-4 2xs:mb-8 3xs:mb-10 sm:mb-16"
            router={router}
            cardCount={cardCount}
            nbcard={nbcard}
            title={title}
            categoryName={categoryName}
            level={level}
            calculatePercentage={calculatePercentage}
            color={categoryColorName}
          />
          <div
            id="reviewMiddleContainer"
            className="flex flex-col justify-center items-center w-full mb-4 2xs:mb-8 3xs:mb-10 sm:mb-16"
          >
            <ReviewContent
              cardCount={cardCount}
              nbcard={nbcard}
              title={title}
              categoryName={categoryName}
              level={level}
              calculatePercentage={calculatePercentage}
              showAnswer={showAnswer}
              answer={answer}
            />
          </div>
          <div
            id="reviewPageBottomContainer"
            className="flex flex-col justify-center items-center w-full px-10 xs:px-10 sm:pb-10 "
          >
            {showAnswer ? (
              <ReviewAnswerButtons handleReview={handleReview} />
            ) : (
              <ReviewQuestionButtons
                handleShuffle={handleShuffle}
                handleShowAnswer={handleShowAnswer}
                handleNextCard={handleNextCard}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
