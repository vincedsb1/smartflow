"use client";

import React, { useContext, useState, useEffect } from "react";
import MainButton from "../components/MainButton";
import List from "../components/List";
import CardAppTitle from "../components/CardAppTitle";
import CardAppText from "../components/CardAppText";
import { CircularProgress } from "@nextui-org/react";
import { faListUl } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../context/UserContext";

interface Card {
  id: number;
  title: string;
  answer: string;
}

const Today = () => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("UserContext must be used within a UserContextProvider");
  }

  const [cards, setCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [myModalIsOpen, setMyModalIsOpen] = useState(false);
  const [myModalTitle, setMyModalTitle] = useState("");
  const [myModalContent, setMyModalContent] = useState("");

  useEffect(() => {
    if (!userContext.token) {
      console.error("Token is not defined");
      setIsError(true);
      setIsLoading(false);
      return;
    }

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
        setCards(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsError(true);
        setIsLoading(false);
      });
  }, [userContext.token]);

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

  const rows = cards.map((card) => ({
    mainLabel: card.title,
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
          <div className="w-16/20 mt-20">
            <CardAppTitle title="Aujourd'hui" />
          </div>
          <div className="w-16/20 mb-14">
            <CardAppText icon={faListUl} text="Vous avez 3 fiches à réciter." />
          </div>
        </div>
        <div id="todayListContainer" className="w-18/20">
          <List
            rows={rows}
            title="Fiches"
            isLargeRow={false}
            setModalIsOpen={setMyModalIsOpen}
            setModalTitle={setMyModalTitle}
            setModalContent={setMyModalContent}
            modalContent={myModalContent}
          />
        </div>
      </div>
      <div id="todayMainButton" className="w-16/20 mb-32">
        <MainButton label="Réciter" />
      </div>
    </div>
  );
};

export default Today;