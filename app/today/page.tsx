"use client";

import React, { useContext, useState, useEffect } from "react";
import { CircularProgress } from "@nextui-org/react";
import { fa1, fa2, fa3, fa4, fa5, fa6, fa7 } from "@fortawesome/free-solid-svg-icons";
import { UserContext, UserCardProps } from "../context/UserContext";
import CardsToReviewList from "../components/today/CardsToReviewList";
import AllCardsReviewed from "../components/today/AllCardsReviewed";
import NoCardsToReview from "../components/today/NoCardsToReview";
import NoCard from "../components/today/NoCard";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import DesktopMenu from "../components/DesktopMenu";
import CategoryDistribution from "../components/CategoryDistribution";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface CardData {
  cards: UserCardProps[];
  code: number;
}

// Données fictives pour le test
const fakeData = {
  labels: ['Catégorie 1', 'Catégorie 2', 'Catégorie 3'],
  datasets: [{
    data: [300, 50, 100],
    backgroundColor: ['red', 'blue', 'green'],
    hoverBackgroundColor: ['darkred', 'darkblue', 'darkgreen']
  }]
};

const Today = () => {
  const { useRouter } = require("next/navigation");
  const userContext = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!userContext || !userContext.token) {
      router.push('/');
    }
  }, [userContext, router]);

  if (!userContext) {
    throw new Error("UserContext must be used within a UserContextProvider");
  }

  const { setCardsToReview } = userContext;
  const levelIcons = [fa1, fa2, fa3, fa4, fa5, fa6, fa7];
  const [cards, setCards] = useState<UserCardProps[]>([]);
  const [firstCardId, setFirstCardId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [code, setCode] = useState<number>(0);
  const [categoryColor, setCategoryColor] = useState("");

  useEffect(() => {
    if (userContext.token) {
      console.log("Fetching data from Today");
      fetch("/api/cards/cardByUser?toReview=true", {
        headers: {
          Authorization: `Bearer ${userContext.token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json() as Promise<CardData>;
        })
        .then((data) => {
          if (data.cards) {
            console.log("data.cards", data.cards);
            setCards(data.cards);
            setFirstCardId(data.cards[0].id);
            setCardsToReview(data.cards);
            userContext.setNbCardsToReview(data.cards.length);
          } else {
            console.error("data.cards is undefined");
          }
          setIsLoading(false);
          setCode(data.code);
        })
        .catch((error) => {
          console.error("Error:", error);
          setIsError(true);
          setIsLoading(false);
        });
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-row justify-center items-center w-full">
        <CircularProgress aria-label="Loading..." />
      </div>
    );
  }

  if (isError) {
    return <div>Error</div>;
  }

  let rows: {
    mainLabel: string;
    link: string;
    color: string;
    icon: IconDefinition;
  }[] = [];
  if (cards) {
    rows = cards.map((card) => ({
      mainLabel: card.title,
      link: `/today/review?id=${card.id}&nbcard=${cards.length}&color=${card.categoryColorName || "white"}`,
      color: card.categoryColorName || "white",
      icon: levelIcons[card.level - 1],
    }));
  }

  switch (code) {
    case 1:
      return (
        <div className="sm:w-[640px] mx-auto">
          <NoCard />
        </div>
      );
    case 2:
      return <NoCardsToReview />;
    case 3:
      return <AllCardsReviewed />;
    case 4:
      return (
        <div id="todayMainContainer" className="flex flex-row justify-center items-center">
          <div id="todaySubMainContainer" className="w-full sm:max-w-[1170px]  bg-neutral-200 sm:shadow-2xl sm:shadow-neutral-200 flex flex-row ">
            <div id="todayMenuContainer" className="hidden sm:block">
              <DesktopMenu />
            </div>
            <div id="todayContentContainer" className="flex flex-row justify-center w-full sm:ml-48 md:ml-72">
              <CardsToReviewList rows={rows} firstCardId={firstCardId} />
              <div className="mt-72 ml-8">
                <CategoryDistribution data={fakeData} />
              </div>
            </div>
          </div>
        </div>
      );
    default:
      return <div>Unknown code</div>;
  }
};

export default Today;
