"use client";

import { useRouter } from "next/router";
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/UserContext";

export default function CardPage() {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("UserContext must be used within a UserContextProvider");
  }
  const user = useContext(UserContext);
  const router = useRouter();
  const { id } = router.query;
  const [card, setCard] = useState({ id: "", title: "", answer: "", level: 0 });
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    let isMounted = true; // add this line

    const fetchCard = async () => {
      const response = await fetch(`/api/cards/${id}`, {
        headers: {
          Authorization: `Bearer ${userContext.token}`,
        },
      });

      const cardData = await response.json();
      if (isMounted) setCard(cardData); // modify this line
    };

    if (id) {
      fetchCard();
    }

    return () => {
      isMounted = false;
    }; // add this line
  }, [id, userContext.token]);

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleNextCard = () => {
    // Add your logic for handling the next card here
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="py-4" style={{ height: "405px", width: "270px" }}>
        <div className="pb-0 pt-2 px-4 flex-col items-center justify-center">
          <h4 className="font-bold text-large text-center">{card.title}</h4>
        </div>
        <div className="overflow-visible py-2">
          {showAnswer && <p className="text-lg">{card.answer}</p>}
        </div>
      </div>
      <div className="mt-24">
        {!showAnswer && (
          <button onClick={handleShowAnswer}>Voir la réponse</button>
        )}
        {showAnswer && (
          <div className="flex justify-between space-x-4">
            <div>
              <button
                className="rounded-full bg-green-500 text-white w-10 h-10 flex items-center justify-center"
                onClick={handleNextCard}
              >
                👍
              </button>
            </div>
            <div className="ml-auto">
              <button className="rounded-full bg-red-500 text-white w-10 h-10 flex items-center justify-center">
                👎
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
