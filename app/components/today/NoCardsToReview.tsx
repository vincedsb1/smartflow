import { faListUl } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import CardAppText from "../CardAppText";
import CardAppTitle from "../CardAppTitle";

const NoCardsToReview = () => {
  return (
    <div
      id="NoCardToReviewMainContainer"
      className="flex flex-col justify-between align-middle items-center min-h-screen"
    >
      <div
        id="NoCardToReviewTitleHintListContainer"
        className="flex flex-col w-full items-center"
      >
        <div
          id="NoCardToReviewTitleHintContainer"
          className="flex flex-col w-full items-center"
        >
          <div
            id="NoCardToReviewTitleContainer"
            className="w-18/20 mt-20  sm:w-full sm:border-b-2 dark:border-neutral-500 border-neutral-400 sm:my-6"
          >
            <CardAppTitle title="Aujourd'hui" size="big" />
          </div>
        </div>
        <div id="NoCardToReviewListContainer" className="w-full mb-8"></div>
      </div>
      <div
        id="NoCardToReviewMiddle"
        className="w-18/20 mb-24 flex justify-center"
      >
        <div
          id="NoCardToReviewHintContainer"
          className="w-18/20 sm:w-1/2 mb-14"
        >
          <CardAppText
            icon={faListUl}
            text={`Il n'y a pas de fiche à réciter aujourd'hui, revenez demain !`}
          />
        </div>
      </div>
      <div
        id="NoCardToReviewBottom"
        className="w-18/20 mb-24 flex justify-center"
      ></div>
    </div>
  );
};

export default NoCardsToReview;
