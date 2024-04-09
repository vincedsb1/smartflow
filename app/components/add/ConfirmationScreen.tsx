import { faTag } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import CardAppText from "../CardAppText";
import CardAppTitle from "../CardAppTitle";

const ConfirmationScreen = () => {
  return (
    <div id="addMainContainer" className="flex flex-col justify-between w-full">
      <div
        id="addTopContainer"
        className="flex flex-col justify-center w-full "
      >
        <div
          id="addHeaderContainer"
          className="flex flex-col justify-center items-center w-full"
        >
          <div id="addTitle" className="flex flex-col w-16/20 ">
            <CardAppTitle title="Nouvelle fiche" size="big" />
          </div>
          <div id="addHint" className="flex flex-col items-center w-16/20">
            <CardAppText text="Bravo !" icon={faTag} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationScreen;
