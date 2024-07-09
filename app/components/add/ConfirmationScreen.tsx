import { faCheck } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import CardAppText from "../CardAppText";
import CardAppTitle from "../CardAppTitle";

const ConfirmationScreen = () => {
  return (
    <div id="confirmationScreenMainContainer" className="h-full">
      <div id="confirmationScreenDesktop" className="hidden sm:block h-full">
        <div
          id="addMainContainer"
          className="flex flex-col justify-center w-full h-1/2"
        >
          <div
            id="addTopContainer"
            className="flex flex-col justify-center w-full "
          >
            <div
              id="addHeaderContainer"
              className="flex flex-col justify-center items-center w-full"
            >
              <div id="addHint" className="flex flex-col items-center w-64">
                <CardAppText
                  text="Fiche enregistrée"
                  icon={faCheck}
                  iconColor="confirmation"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="confirmationScreenMobile" className="sm:hidden">
        <div
          id="addMainContainer"
          className="flex flex-col justify-between w-full"
        >
          <div
            id="addTopContainer"
            className="flex flex-col justify-center w-full "
          >
            <div
              id="addHeaderContainer"
              className="flex flex-col justify-center items-center w-full"
            >
              {/* <div id="addTitle" className="flex flex-col w-16/20 ">
            <CardAppTitle title="Nouvelle fiche" size="big" />
          </div> */}
              <div id="addHint" className="flex flex-col items-center w-16/20">
                <CardAppText
                  text="Fiche enregistrée"
                  icon={faCheck}
                  iconColor="confirmation"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationScreen;
