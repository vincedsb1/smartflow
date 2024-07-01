import { faListUl } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@nextui-org/button";
import List from "../List";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import CardAppText from "../CardAppText";
import CardAppTitle from "../CardAppTitle";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import CategoryDistribution from "../CategoryDistribution";

interface Row {
  mainLabel: string;
  link: string;
  color: string;
  icon: IconDefinition;
}

interface CategoryData {
  labels: string[];
  datasets: Array<{
    data: number[];
    backgroundColor: string[];
    hoverBackgroundColor: string[];
  }>;
}

interface CardsToReviewListProps {
  rows: Row[];
  firstCardId: number | null;
  data: CategoryData;
  categoryColors: { [key: string]: string };
}

const CardsToReviewList: React.FC<CardsToReviewListProps> = ({
  rows,
  firstCardId,
  data,
  categoryColors,
}) => {
  const [myModalContent, setMyModalContent] = useState("");
  const router = useRouter();
  return (
    <div
      id="todayMainContainer"
      className="flex flex-col justify-between align-middle items-center min-h-screen flex-grow sm:px-10"
    >
      <div
        id="todayTitleHintListContainer"
        className="flex flex-col w-full items-center "
      >
        <div
          id="todayTitleHintContainer"
          className="flex flex-col w-full items-center"
        >
          <div className="w-18/20 sm:w-full mt-2  sm:border-b-2 dark:border-neutral-500 border-neutral-400 sm:my-6">
            <CardAppTitle title="Aujourd'hui" size="big" />
          </div>
          <div className="w-18/20 sm:w-full mb-14">
            <CardAppText
              icon={faListUl}
              text={`Vous avez ${rows.length} fiches à réciter.`}
              colorVariant={false}
            />
          </div>
        </div>
        <div
          id="ListAndChart"
          className="flex flex-col justify-between lg:flex-row w-full "
        >
          <div id="todayListContainer" className="w-full mb-8 pr-0 lg:pr-4">
            <List
              rows={rows}
              title="Fiches"
              isLargeRow={true}
              setModalContent={setMyModalContent}
              modalContent={myModalContent}
            />
          </div>
          <div
            id="CategoryDistributionContainer"
            className="px-0 hidden md:block pb-10"
          >
            <div
              id="ListTitleContainer"
              className="hidden md:block mb-2 font-title font-bold text-md text-neutral-600 dark:text-neutral-300"
            >
              Répartition
            </div>
            <div id="CategoryDistribution" className="w-full">
              <CategoryDistribution
                data={data}
                categoryColors={categoryColors}
              />
            </div>
          </div>
        </div>
      </div>
      <div id="todayMainButton" className="w-18/20 mb-20 flex justify-center">
        <Button
          color="primary"
          variant="solid"
          size="lg"
          radius="lg"
          className="w-80 font-bold font-text "
          onClick={() => {
            router.push(
              `/today/review?id=${firstCardId}&nbcard=${rows.length}`
            );
          }}
        >
          Réciter
        </Button>
      </div>
    </div>
  );
};

export default CardsToReviewList;
