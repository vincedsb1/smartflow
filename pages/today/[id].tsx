"use client";

import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { UserContext } from "../../app/context/UserContext";
import RootLayout from "../../app/layout";

export default function CardPage({
  card,
}: {
  card: { id: string; title: string; answer: string; level: number };
}) {
  const userContext = useContext(UserContext);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleNextCard = () => {
    // Add your logic for handling the next card here
  };

  return (
    <RootLayout>
      {" "}
      {/* Utilisation de RootLayout ici */}
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
    </RootLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  // Fetch the card data from your API or database here
  // For this example, I will simply return a mock object

  const card = {
    id,
    title: `Card ${id}`,
    answer: `Answer for card ${id}`, // Add a mock answer here
    level: 1, // Add a mock level here
  };

  return {
    props: {
      card,
    },
  };
};
