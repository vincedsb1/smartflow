import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import CardAppText from "../CardAppText";
import CardAppTitle from "../CardAppTitle";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import DesktopMenu from "../DesktopMenu";

const NoCard: React.FC = () => {
  const router = useRouter();
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
            id="todayNoCardTitleContainer"
            className="w-18/20 sm:w-full sm:border-b-2 dark:border-neutral-500 border-neutral-400 sm:my-6 mt-20"
          >
            <CardAppTitle title="Aucune fiche" size="big" />
          </div>
          <div className="w-18/20 sm:w-full mb-14">
            <CardAppText
              icon={faPlus}
              iconColor="normal"
              text="Ajoutez votre première fiche pour commencer à apprendre."
            />
          </div>
        </div>
        <div id="todayListContainer" className="w-full mb-8"></div>
      </div>
      <div
        id="todayNoCardButtonContainer"
        className="flex flex-row justify-center w-18/20 sm:w-full mb-8"
      >
        <Button
          color="primary"
          variant="solid"
          size="lg"
          radius="lg"
          className="w-80 font-bold font-text"
          onClick={() => {
            router.push(`/add`);
          }}
        >
          Ajouter une fiche
        </Button>
      </div>
      <div
        id="todayNoCardBottomMainButton"
        className="w-18/20 mb-24 flex justify-center"
      ></div>
    </div>
  );
};

export default NoCard;
