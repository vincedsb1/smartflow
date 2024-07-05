import React from "react";
import { Button } from "@nextui-org/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faCircleCheck,
} from "@fortawesome/free-regular-svg-icons";

const ReviewAnswerButtons: React.FC<{
  handleReview: (isPositive: boolean) => void;
}> = ({ handleReview }) => (
  <div
    id="buttonContainer"
    className="flex flex-row justify-around w-16/20 sm:pb-20"
  >
    <Button
      type="submit"
      color="primary"
      variant="solid"
      size="lg"
      className="w-12 sm:w-24 sm:h-24 font-bold font-text bg-red-500 dark:bg-red-600 hover:scale-105 transition-all"
      onClick={() => handleReview(false)}
      radius="full"
      isIconOnly
    >
      <FontAwesomeIcon
        icon={faCircleXmark}
        className="text-3xl sm:text-5xl dark:text-neutral-100 text-neutral-50"
      />
    </Button>
    <Button
      type="submit"
      color="primary"
      variant="solid"
      size="lg"
      className="w-12 sm:w-24 sm:h-24 font-bold font-text bg-emerald-500 dark:bg-emerald-600 hover:scale-105 transition-all"
      onClick={() => handleReview(true)}
      radius="full"
      isIconOnly
    >
      <FontAwesomeIcon
        icon={faCircleCheck}
        className="text-3xl sm:text-5xl dark:text-neutral-100 text-neutral-50"
      />
    </Button>
  </div>
);

export default ReviewAnswerButtons;
