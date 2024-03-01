"use client";
import React, { useState, useEffect } from "react";
import MainButton from "../components/MainButton";
import List from "../components/List";
import CardAppTitle from "../components/CardAppTitle";
import CardAppText from "../components/CardAppText";

interface Card {
   id: number;
   title: string;
   answer: string;
}

const Add = () => {
   const [cards, setCards] = useState<Card[]>([]);
   const [isLoading, setIsLoading] = useState<boolean>(true);
   const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    fetch('/api/cards')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setCards(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className="flex flex-col justify-center mt-20 align-middle items-center">
      <div>
        <CardAppTitle title="Ajourd'hui" />
      </div>
      <div>
        <CardAppText text="Vous avez 3 fiches à réciter." />
      </div>
      <List title="Fiches">
        {cards.map((card) => (
          <div key={card.id}>
            <h2>{card.title}</h2>
            <p>{card.answer}</p>
          </div>
        ))}
      </List>
      <MainButton label="Réciter" />
    </div>
  );
}

export default Add;