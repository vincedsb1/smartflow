import React from "react";
import { Button } from "@nextui-org/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRandom, faForward } from "@fortawesome/free-solid-svg-icons";

const ReviewQuestionButtons: React.FC<{
  handleShuffle: () => void;
  handleShowAnswer: () => void;
  handleNextCard: () => void;
}> = ({ handleShuffle, handleShowAnswer, handleNextCard }) => (
  <div
    id="controlButtonContainer"
    className="flex flex-row justify-between gap-2 w-full pb-4"
  >
    <Button
      color="default"
      size="lg"
      onClick={handleShuffle}
      isIconOnly
      className="font-bold font-text"
      radius="lg"
    >
      <FontAwesomeIcon icon={faRandom} />
    </Button>
    <Button
      type="submit"
      color="primary"
      variant="solid"
      size="lg"
      className="font-bold font-text dark:text-white w-full"
      onClick={handleShowAnswer}
      radius="lg"
    >
      Réponse
    </Button>
    <Button
      id="nextContainer"
      color="default"
      size="lg"
      onClick={handleNextCard}
      isIconOnly
      className="font-bold font-text"
      radius="lg"
    >
      <FontAwesomeIcon icon={faForward} />
    </Button>
  </div>
);

export default ReviewQuestionButtons;
