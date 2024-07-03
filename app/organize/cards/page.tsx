"use client";

import {
  faChevronLeft,
  faChevronRight,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import List from "../../components/List";
import { UserContext, useUser } from "@/app/context/UserContext";
import { Card, CircularProgress } from "@nextui-org/react";
import Link from "next/link";
import CardAppTitle from "../../components/CardAppTitle";
import CardAppText from "../../components/CardAppText";
import { faListUl } from "@fortawesome/free-solid-svg-icons";
import { UserCardProps } from "../../context/UserContext";
import DesktopMenu from "../../components/DesktopMenu";

const { useRouter } = require("next/navigation");

const OrganizeCards = () => {
  const userContext = useContext(UserContext);
  const router = useRouter();

  if (!userContext) {
    throw new Error("UserContext must be used within a UserContextProvider");
  }

  const { setCardsToReview } = userContext;

  const [cards, setCards] = useState<UserCardProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const [myModalContent, setMyModalContent] = useState("");

  const [isTokenLoaded, setIsTokenLoaded] = useState<boolean>(false);

  useEffect(() => {
    // Vérifiez si le token est disponible
    if (userContext.token) {
      setIsTokenLoaded(true);
      console.log("vérification du token OK");
    }
  }, [userContext.token]);

  useEffect(() => {
    // Ne faire la requête fetch que si le token est chargé
    console.log("entrée dans le useEffect");
    if (isTokenLoaded) {
      console.log("entrée dans le if");
      fetch("/api/cards/cardByUser?toReview=true", {
        headers: {
          Authorization: `Bearer ${userContext.token}`,
        },
      })
        .then((response) => {
          console.log("entrée dans le then");
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("entrée dans le then 2");
          console.log("Données récupérées :", data); // Ajoutez ce log pour vérifier les données
          if (Array.isArray(data.cards)) {
            setCards(data.cards);
            setCardsToReview(data.cards);
          } else {
            setCards([]);
            setCardsToReview([]);
          }
          setIsLoading(false);
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
    link: "/organize/cards/edit?id=" + card.id,
    color: card.categoryColorName || "white",
  }));

  console.log("Rows à afficher :", rows); // Ajoutez ce log pour vérifier les rows

  return (
    <div className="flex flex-row justify-center items-center">
      <div className="w-full sm:max-w-[1170px]  bg-neutral-200 dark:bg-neutral-700 sm:shadow-2xl sm:shadow-neutral-200 sm:dark:shadow-black flex flex-row ">
        <div className="hidden sm:block">
          <DesktopMenu />
        </div>
        <div
          id="todayMainContainer"
          className="flex flex-col justify-between align-middle items-center min-h-screen"
        >
          <div
            id="todayTitleHintListContainer"
            className="flex flex-col w-full items-center"
          >
            <div
              id="themeSwitcherBackIcon"
              className="w-full flex flex-col mt-16"
            >
              <Link href="/organize">
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  className="text-neutral-800 dark:text-neutral-200 text-xs w-4 h-4 m-5"
                />
              </Link>
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
        </div>
      </div>
    </div>
  );
};

export default OrganizeCards;
