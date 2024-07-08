"use client";

import React, { useContext, useState, useEffect } from "react";
import { CircularProgress } from "@nextui-org/react";
import {
  fa1,
  fa2,
  fa3,
  fa4,
  fa5,
  fa6,
  fa7,
} from "@fortawesome/free-solid-svg-icons";
import { UserContext, UserCardProps } from "../context/UserContext";
import CardsToReviewList from "../components/today/CardsToReviewList";
import AllCardsReviewed from "../components/today/AllCardsReviewed";
import NoCardsToReview from "../components/today/NoCardsToReview";
import NoCard from "../components/today/NoCard";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import DesktopMenu from "../components/DesktopMenu";
import CategoryDistribution from "../components/CategoryDistribution";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import colors from "tailwindcss/colors";

ChartJS.register(ArcElement, Tooltip, Legend);

interface CardData {
  cards: UserCardProps[];
  code: number;
  categoryCount: { [key: string]: number };
  categoryColors: { [key: string]: string };
}

interface CategoryData {
  labels: string[];
  datasets: Array<{
    data: number[];
    backgroundColor: string[];
    hoverBackgroundColor: string[];
  }>;
}

const Today: React.FC = () => {
  const { useRouter } = require("next/navigation");
  const userContext = useContext(UserContext);
  const router = useRouter();

  const [cards, setCards] = useState<UserCardProps[]>([]);
  const [firstCardId, setFirstCardId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [code, setCode] = useState<number>(0);
  const [categoryData, setCategoryData] = useState<CategoryData>({
    labels: [],
    datasets: [],
  });
  const [categoryColors, setCategoryColors] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    if (!userContext?.token) {
      console.log("userContext not loaded");
    } else {
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
            console.log("Les datas : ", data.cards);
            setCards(data.cards);
            setFirstCardId(data.cards[0].id);
            userContext.setCardsToReview(data.cards);
            userContext.setNbCardsToReview(data.cards.length);

            setCategoryColors(data.categoryColors);

            const colorMap: { [key: string]: string } = {
              "red-500": "#ef4444",
              "orange-500": "#f59e0b",
              "yellow-500": "#fbbf24",
              "green-500": "#10b981",
              "teal-500": "#14b8a6",
              "blue-500": "#3b82f6",
              "indigo-500": "#6366f1",
              "purple-500": "#8b5cf6",
              "pink-500": "#ec4899",
              "red-600": "#dc2626",
              "orange-600": "#f97316",
              "yellow-600": "#f59e0b",
            };

            const labels = Object.keys(data.categoryCount);
            const values = Object.values(data.categoryCount);
            const backgroundColors = labels.map(
              (label) => colorMap[data.categoryColors[label]] || "grey"
            );
            const hoverBackgroundColors = backgroundColors;

            setCategoryData({
              labels,
              datasets: [
                {
                  data: values,
                  backgroundColor: backgroundColors,
                  hoverBackgroundColor: hoverBackgroundColors,
                },
              ],
            });
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
  }, [userContext?.token]);

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

  const levelIcons = [fa1, fa2, fa3, fa4, fa5, fa6, fa7];
  const rows = cards.map((card) => ({
    mainLabel: card.title,
    link: `/today/review?id=${card.id}&nbcard=${cards.length}&color=${
      card.categoryColorName || "white"
    }`,
    color: card.categoryColorName || "white",
    icon: levelIcons[card.level - 1],
  }));

  console.log("categoryData : ", categoryData);

  const renderContent = () => {
    switch (code) {
      case 1:
        return <NoCard />;
      case 2:
        return <NoCardsToReview />;
      case 3:
        return <AllCardsReviewed />;
      case 4:
        return (
          <>
            <CardsToReviewList
              rows={rows}
              firstCardId={firstCardId}
              data={categoryData}
              categoryColors={categoryColors}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div
      id="todayMainContainer"
      className="flex flex-row justify-center items-center"
    >
      <div
        id="todaySubMainContainer"
        className="w-full sm:max-w-[1170px] bg-neutral-200 dark:bg-neutral-700 sm:shadow-2xl sm:shadow-neutral-200 dark:sm:shadow-black flex flex-row"
      >
        <div id="todayMenuContainer" className="hidden sm:block">
          <DesktopMenu />
        </div>
        <div
          id="todayContentContainer"
          className="flex flex-row justify-center w-full sm:ml-48 md:ml-72 "
        >
          <div className="flex flex-row w-full justify-center ">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Today;
