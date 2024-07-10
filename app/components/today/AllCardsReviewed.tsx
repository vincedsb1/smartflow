import { faCheck } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import CardAppText from "../CardAppText";
import CardAppTitle from "../CardAppTitle";

const AllCardsReviewed = () => {
  return (
    <div
      id="todayMainContainer"
      className="flex flex-col justify-between align-middle items-center min-h-screen w-full sm:px-10"
    >
      <div
        id="todayTitleHintListContainer"
        className="flex flex-col w-full items-center"
      >
        <div
          id="todayTitleHintContainer"
          className="flex flex-col w-full items-center"
        >
          <div
            id="todayAllCardsReviewdTitleContainer"
            className="w-18/20 sm:w-full sm:border-b-2 dark:border-neutral-500 border-neutral-400 sm:my-6 mt-20"
          >
            <CardAppTitle title=" Journée complétée" size="big" />
          </div>
        </div>
        <div id="todayListContainer" className="w-full mb-8"></div>
      </div>
      <div
        id="allCardsReviewedMiddle"
        className="w-18/20 sm:w-full mb-24 flex justify-center"
      >
        {" "}
        <div id="allCardsReviewedHint" className="w-18/20 sm:w-1/2 mb-14">
          <CardAppText
            icon={faCheck}
            iconColor="confirmation"
            text={`Toutes les fiches du jour ont été révisées, bravo ! <br /> À demain 👋`}
          />
        </div>
      </div>
      <div
        id="allCardsReviewedBottom"
        className="w-18/20 sm:w-full mb-24 flex justify-center"
      ></div>
    </div>
  );
};

export default AllCardsReviewed;
