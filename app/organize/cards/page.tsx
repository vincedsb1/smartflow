"use client";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import List from "../../components/List";
import DesktopMenu from "../../components/DesktopMenu";
import { UserContext } from "@/app/context/UserContext";
import { UserCardProps } from "../../context/UserContext";

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
  const [showNoCardsMessage, setShowNoCardsMessage] = useState<boolean>(false);

  useEffect(() => {
    if (userContext.token) {
      setIsTokenLoaded(true);
    }
  }, [userContext.token]);

  useEffect(() => {
    if (isTokenLoaded) {
      fetch("/api/cards/cardByUser", {
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
          if (Array.isArray(data.cards) && data.cards.length > 0) {
            setCards(data.cards);
            setCardsToReview(data.cards);
          } else {
            setCards([]);
            setCardsToReview([]);
            setShowNoCardsMessage(true);
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
    router.push(`/today/review?id=${cardId}`);
  };

  const rows = cards.map((card) => ({
    mainLabel: card.title,
    link: "/organize/cards/edit?id=" + card.id,
    color: card.categoryColorName || "white",
  }));

  return (
    <div className="flex flex-row justify-center items-center">
      <div className="w-full sm:max-w-[1170px]  bg-neutral-200 dark:bg-neutral-700 sm:shadow-2xl sm:shadow-neutral-200 sm:dark:shadow-black flex flex-row ">
        <div className="hidden sm:block">
          <DesktopMenu />
        </div>
        <div
          id="organizeCardMainContainer"
          className="w-full flex flex-col justify-between align-middle items-center min-h-screen sm:ml-48 md:ml-72 sm:px-10"
        >
          <div
            id="organizeCardTitleHintListContainer"
            className="flex flex-col w-full items-center"
          >
            <div
              id="themeSwitcherBackIcon"
              className="w-full flex flex-col mt-16"
            >
              <Link href="/organize">
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  className="text-neutral-800 dark:text-neutral-200 text-xs w-4 h-4 m-5 sm:mx-0"
                />
              </Link>
            </div>
            <div id="organizeCardListContainer" className="w-full">
              {showNoCardsMessage && (
                <p className="text-center my-8 font-text text-xl">
                  Aucune carte disponible pour le moment.
                </p>
              )}
              {!showNoCardsMessage && (
                <List
                  rows={rows}
                  title="Fiches"
                  isLargeRow={true}
                  setModalContent={setMyModalContent}
                  modalContent={myModalContent}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizeCards;
