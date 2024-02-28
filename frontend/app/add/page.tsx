// Dans votre composant Add
"use client";
import React from "react";
import MainButton from "../components/MainButton";
import { useFetchCardsClient } from "../actions/actionsCard";
import { FetchRules } from "../actions/actionsRule";

// interface Card {
//   id: string;
//   title: string;
//   answer: string;
// }

const Add = () => {
  //   const cards: Card[] = useFetchCardsClient();
  //      /*
  // {cards &&
  //  cards.map((card: Card) => (
  //    <div key={card.id}>
  //      <p>{card.title}</p>
  //      <p>{card.answer}</p>
  //    </div>
  //  ))}

  return (
    <div className="flex flex-row justify-center h-screen align-middle items-center">
      <p>Page add</p>

      <MainButton
        label="Ajouter une fiche"
        type="normal"
        disabled={false}
        href="#"
      />
    </div>
  );
};

export default Add;
