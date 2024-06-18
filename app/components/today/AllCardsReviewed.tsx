import { faCheck } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import CardAppText from "../CardAppText";
import CardAppTitle from "../CardAppTitle";

const AllCardsReviewed = () => {
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
          <div className="w-18/20 mt-20">
            <CardAppTitle title=" Journée complétée" size="big" />
          </div>
          <div className="w-18/20 mb-14">
            <CardAppText
              icon={faCheck}
              iconColor="confirmation"
              text={`Toutes les fiches du jour ont été révisées, bravo !`}
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

export default AllCardsReviewed;
