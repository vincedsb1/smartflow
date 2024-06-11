import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import CardAppTitle from "@/app/components/CardAppTitle";
import { Progress } from "@nextui-org/react";
import { useRouter } from "next/navigation";

interface ReviewHeaderDesktopProps {
  className?: string;
  router: ReturnType<typeof useRouter>;
  cardCount: number;
  nbcard: string | null;
  title: string;
  categoryName: string;
  level: number;
  calculatePercentage: (level: number) => number;
}

const ReviewHeaderDesktop: React.FC<ReviewHeaderDesktopProps> = ({
  className,
  router,
  cardCount,
  nbcard,
  title,
  categoryName,
  level,
  calculatePercentage,
}) => (
  <div
    id="reviewPageTopContainer"
    className={`${className} flex flex-col justify-center items-center w-full `}
  >
    <div
      id="reviewTopContainer"
      className="w-full flex flex-row justify-between mt-16 mb-4"
    >
      <div id="reviewBackTitle" className="flex flex-row ">
        <button
          type="button"
          onClick={() => router.back()}
          className="text-neutral-800 dark:text-neutral-200 ml-5 my-5 mr-3 "
        >
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="text-xs sm:text-xl"
          />
        </button>
        <div
          id="reviewPageTitle"
          className="flex flex-row justify-between items-center mt-2 w-14/20"
        >
          <CardAppTitle title="Réciter" size="big" />
        </div>
      </div>
      <div
        id="reviewCounterContainer"
        className="flex flex-row font-title items-center mr-8 font-bold text-neutral-600 dark:text-neutral-400"
      >
        {cardCount}/{nbcard}
      </div>
    </div>
    <div
      id="reviewPageHeaderContainer"
      className="flex flex-col justify-center items-center w-80"
    >
      <div
        id="reviewHeaderTopContainer"
        className="flex flex-row justify-between w-full mb-4"
      >
        <div id="reviewTitleCategoryColorContainer" className="flex flex-row">
          <div id="reviewColor" className="bg-red-500 w-[6px] h-full"></div>
          <div
            id="reviewTitleCategoryContainer"
            className="flex flex-col w-full ml-2"
          >
            <div
              id="reviewTitleContainer"
              className="flex flex-row w-full font-title font-bold text-neutral-600 dark:text-neutral-400"
            >
              {title}
            </div>
            <div
              id="reviewCategoryContainer"
              className="flex flex-row w-full font-title text-neutral-500 truncate"
            >
              {categoryName}
            </div>
          </div>
        </div>
      </div>
      <div id="reviewHeaderBottomContainer" className="flex flex-col w-full">
        <div id="reviewProgressContainer" className="flex flex-row w-full">
          <Progress
            aria-label="Loading..."
            label={`${calculatePercentage(level)} %`}
            size="md"
            value={calculatePercentage(level)}
            valueLabel={`Niveau ${level}`}
            showValueLabel={true}
            className="max-w-md text-neutral-500 text-sm font-title"
          />
        </div>
      </div>
    </div>
  </div>
);

export default ReviewHeaderDesktop;
