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

interface Card {
  category: any;
  id: number;
  title: string;
  answer: string;
}

const OrganizeCards = () => {
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
  const user = useContext(UserContext);
  const { setSelectedCard } = useUser();

  useEffect(() => {
    if (!userContext.token || !userContext.user) {
      console.error("User or token is not defined");
      setIsError(true);
      setIsLoading(false);
      return;
    }

    console.log("Token:", userContext.token);

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
  }, [userContext.token, userContext.user]);

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
    link: "/organize/cards/edit-cards",
    onClick: () => {
      setSelectedCard({
        id: card.id,
        title: card.title,
        answer: card.answer,
        category: card.category,
        categoryName: card.category?.name,
        level: card.category?.level,
        categoryColorName: card.category?.colorName,
      });
      console.log("Selected card:", card);
      console.log("Selected category:", card.category);
    },
  }));

  return (
    <div
      id="organizeMainContainer"
      className="flex flex-col justify-between min-h-screen w-full"
    >
      <div
        id="organizeContainer"
        className="flex flex-col justify-center w-full"
      >
        <div id="themeSwitcherBackIcon" className="w-full flex flex-col mt-16">
          <Link href="/organize">
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="text-neutral-800 dark:text-neutral-200 text-xs w-4 h-4 m-5"
            />
          </Link>
        </div>
        <div
          id="organizeHeaderContainer"
          className="flex flex-col justify-center items-center w-full"
        ></div>
        <div id="organizeList" className="">
          <List
            rows={rows}
            title="Fiches"
            isLargeRow={false}
            belowListLink={""}
            setModalIsOpen={setMyModalIsOpen}
            setModalTitle={setMyModalTitle}
            setModalContent={setMyModalContent}
            modalContent={myModalContent}
          />
        </div>
      </div>
    </div>
  );
};

export default OrganizeCards;
function setSelectedCard(arg0: {
  id: number;
  title: string;
  answer: string;
  category: any;
}) {
  throw new Error("Function not implemented.");
}
