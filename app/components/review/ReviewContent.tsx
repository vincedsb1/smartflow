import React from "react";

interface ReviewContentProps {
  cardCount: number;
  nbcard: string | null;
  title: string;
  categoryName: string;
  level: number;
  calculatePercentage: (level: number) => number;
  showAnswer: boolean;
  answer: string | null;
}

const ReviewContent: React.FC<ReviewContentProps> = ({
  showAnswer,
  answer,
  title,
  categoryName,
  level,
  calculatePercentage,
}) => (
  <div
    id="reviewMiddleContainer"
    className="flex flex-col justify-center items-center w-full px-10"
  >
    <div
      id="reviewCard"
      className="flex flex-col bg-white border-neutral-300 border-3 dark:border-neutral-700 dark:bg-neutral-800 rounded-2xl shadow-sf justify-around items-center w-full h-80 p-6 font-text"
    >
      {showAnswer ? (
        answer
      ) : (
        <>
          <div
            id="instructions"
            className="font-text text-neutral-500 dark:text-neutral-400 text-md 2xs:text-lg 3xs:text-xl"
          >
            Récitez la fiche
          </div>
          <div className="flex space-x-2 justify-center items-center bg-white dark:bg-neutral-800">
            <div className="h-2 w-2 rounded-full animate-bounce bg-cyan-600 [animation-delay:-0.3s]"></div>
            <div className="h-2 w-2 rounded-full animate-bounce bg-cyan-600 [animation-delay:-0.15s]"></div>
            <div className="h-2 w-2 rounded-full animate-bounce bg-cyan-600 [animation-delay:-0s]"></div>
          </div>
        </>
      )}
    </div>
  </div>
);

export default ReviewContent;
