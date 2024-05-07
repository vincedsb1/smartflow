"use client";

import React, { useContext, useState, useEffect } from "react";
import List from "../components/List";
import CardAppTitle from "../components/CardAppTitle";
import CardAppText from "../components/CardAppText";
import { CircularProgress } from "@nextui-org/react";
import {
  faListUl,
  fa1,
  fa2,
  fa3,
  fa4,
  fa5,
  fa6,
  fa7,
} from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../context/UserContext";
import { UserCardProps } from "../context/UserContext";
import { Button } from "@nextui-org/react";
import { Font } from "@react-email/components";
const { useRouter } = require("next/navigation");

const Today = () => {
  const userContext = useContext(UserContext);
  const router = useRouter();

  if (!userContext) {
    throw new Error("UserContext must be used within a UserContextProvider");
  }

  const { setCardsToReview } = userContext;
  const levelIcons = [fa1, fa2, fa3, fa4, fa5, fa6, fa7];
  const [cards, setCards] = useState<UserCardProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const [myModalContent, setMyModalContent] = useState("");

  const [isTokenLoaded, setIsTokenLoaded] = useState<boolean>(false);

  useEffect(() => {
    // Vérifiez si le token est disponible
    if (userContext.token) {
      setIsTokenLoaded(true);
    }
  }, [userContext.token]);

  useEffect(() => {
    // Ne faire la requête fetch que si le token est chargé
    if (isTokenLoaded) {
      fetch("/api/cards/cardByUser?toReview=true", {
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
          setCards(data);
          setCardsToReview(data);
          setIsLoading(false);
          console.log("Data received from Today", data);
        })
        .catch((error) => {
          console.error("Error:", error);
          setIsError(true);
          setIsLoading(false);
        });
    }
  }, [isTokenLoaded, setCardsToReview, userContext.token]);

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

  const handleCardClick = (cardId: number) => {
    console.log(`Card clicked: ${cardId}`);
    router.push(`/today/review?id=${cardId}`);
  };

  const rows = cards.map((card) => ({
    mainLabel: card.title,
    link: "/today/review?id=" + card.id + "&nbcard=" + cards.length,
    color: card.categoryColorName || "white",
    icon: levelIcons[card.level - 1],
  }));

  return (
    <div
      id="todayMainContainer"
      className="flex flex-col justify-between align-middle items-center min-h-screen"
    >
      <div
        id="todayTitleHintListContainer"
        className="flex flex-col w-full items-center"
      >
        <div
          id="todayTitleHintContainer"
          className="flex flex-col w-full items-center"
        >
          <div className="w-18/20 mt-20">
            <CardAppTitle title="Aujourd'hui" size="big" />
          </div>
          <div className="w-18/20 mb-14">
            <CardAppText
              icon={faListUl}
              text={`Vous avez ${cards.length} fiches à réciter.`}
            />
          </div>
        </div>
        <div id="todayListContainer" className="w-full">
          <List
            rows={rows}
            title="Fiches"
            isLargeRow={true}
            setModalContent={setMyModalContent}
            modalContent={myModalContent}
          />
        </div>
      </div>
      <div id="todayMainButton" className="w-18/20 mb-32 flex justify-center">
        <Button
          color="primary"
          variant="solid"
          size="lg"
          radius="lg"
          className="w-80 font-bold font-text"
          onClick={() => {
            router.push(`/today/review/`);
          }}
        >
          Réciter
        </Button>
      </div>
    </div>
  );
};

export default Today;
