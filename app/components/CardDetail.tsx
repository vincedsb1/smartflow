import React from 'react';

interface Card {
  id: number;
  title: string;
  answer: string;
}

interface CardCheckProps {
  card: Card;
}

const CardCheck: React.FC<CardCheckProps> = ({ card }) => {
  return (
    <div>
      <h2>{card.title}</h2>
      <p>{card.answer}</p>
    </div>
  );
};

export default CardCheck;