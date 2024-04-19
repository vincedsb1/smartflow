"use client";

import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useRouter } from "next/navigation";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CardAppTitle from "@/app/components/CardAppTitle";
import { Button } from "@nextui-org/button";
import { Bs1Circle } from "react-icons/bs";

const Review: React.FC = () => {
  const userContext = useContext(UserContext);
  const router = useRouter();

  if (!userContext) {
    throw new Error("UserContext must be used within a UserContextProvider");
  }
  const [id, setId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get("id");
      setId(id);
    }
  }, []);

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
    // Add your logic for handling the next card here
  };

  return (
    // <div>
    //   <h1>Review for card with ID: {id}</h1>
    //   <h2>Title: {title}</h2>
    //   <p>Answer: {answer}</p>
    // </div>

    <div
      id="reviewPageMainContainer"
      className="flex flex-col justify-between min-h-screen w-full"
    >
      <div
        id="reviewPageTopContainer"
        className="flex flex-col justify-center w-full"
      >
        <div id="reviewBackIcon" className="w-full flex flex-row mt-16 ">
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
            <CardAppTitle title="Réciter" size="small" />
          </div>
        </div>
        <div
          id="reviewPageHeaderContainer"
          className="flex flex-col justify-center items-center w-full "
        >
          <div
            id="reviewPageTitle"
            className="flex flex-row justify-between items-center w-16/20 mb-6"
          >
            {title}
            <Bs1Circle className="mb-2" />
          </div>
          <div
            id="reviewCard"
            className="flex flex-col bg-white dark:bg-neutral-800 rounded-xl shadow-sf justify-center items-center  w-14/20 h-96"
          >
            {showAnswer ? answer : title}
          </div>
        </div>
      </div>
      <div
        id="reviewPageBottomContainer"
        className="flex flex-col justify-center items-center w-full mb-32"
      >
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
      </div>
    </div>

    // <div className="flex flex-col items-center justify-center h-screen">
    //   <div className="py-4" style={{ height: "405px", width: "270px" }}>
    //     <div className="pb-0 pt-2 px-4 flex-col items-center justify-center">
    //       <h4 className="font-bold text-large text-center">{title}</h4>
    //     </div>
    //     <div className="overflow-visible py-2">
    //       {showAnswer && <p className="text-lg">{answer}</p>}
    //     </div>
    //   </div>
    //   <div className="mt-24">
    //     {!showAnswer && (
    //       <button onClick={handleShowAnswer}>Voir la réponse</button>
    //     )}
    //     {showAnswer && (
    //       <div className="flex justify-between space-x-4">
    //         <div>
    //           <button
    //             className="rounded-full bg-green-500 text-white w-10 h-10 flex items-center justify-center"
    //             onClick={handleNextCard}
    //           >
    //             👍
    //           </button>
    //         </div>
    //         <div className="ml-auto">
    //           <button className="rounded-full bg-red-500 text-white w-10 h-10 flex items-center justify-center">
    //             👎
    //           </button>
    //         </div>
    //       </div>
    //     )}
    //   </div>
    // </div>
  );
};

export default Review;
