import { faListUl } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import CardAppText from "../CardAppText";
import CardAppTitle from "../CardAppTitle";

const NoCardsToReview = () => {
  return (
    <div
      id="todayMainContainer"
      className="flex flex-col justify-between align-middle items-center min-h-screen"
    >
      <div
        id="todayTitleHintListContainer"
        className="flex flex-col w-full items-center"
      >
        <div
          id="todayTitleHintContainer"
          className="flex flex-col w-full items-center"
        >
          <div id="todayNoCardToReviewTitleContainer" className="w-18/20 mt-20">
            <CardAppTitle title="Aujourd'hui" size="big" />
          </div>
          <div className="w-18/20 mb-14">
            <CardAppText
              icon={faListUl}
              text={`Il n'y a pas de fiche à réciter aujourd'hui, revenez demain !`}
            />
          </div>
        </div>
        <div id="todayListContainer" className="w-full mb-8"></div>
      </div>
      <div
        id="todayMainButton"
        className="w-18/20 mb-24 flex justify-center"
      ></div>
    </div>
  );
};

export default NoCardsToReview;
