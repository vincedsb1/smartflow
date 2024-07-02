"use client";

import {
  faChevronLeft,
  faChevronRight,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import CardAppText from "../components/CardAppText";
import CardAppTitle from "../components/CardAppTitle";
import List from "../components/List";
import DesktopMenu from "../components/DesktopMenu";

const Organize = () => {
  const rows = [
    {
      mainLabel: "Fiches",
      icon: faChevronRight,
      link: "/organize/cards",
    },
    {
      mainLabel: "Catégories",
      icon: faChevronRight,
      link: "/organize/categories",
    },
  ];
  const [myModalIsOpen, setMyModalIsOpen] = useState(false);
  const [myModalTitle, setMyModalTitle] = useState("");
  const [myModalContent, setMyModalContent] = useState("");

  return (
    <div className="flex flex-row justify-center items-center">
      <div className="w-full sm:max-w-[1170px]  bg-neutral-200 dark:bg-neutral-700 sm:shadow-2xl sm:shadow-neutral-200 sm:dark:shadow-black flex flex-row ">
        <div className="hidden sm:block">
          <DesktopMenu />
        </div>
        <div
          id="todayContentContainer"
          className="flex flex-row justify-center  w-full sm:ml-48 md:ml-72"
        >
          <div className="flex flex-row justify-center  w-full">
            <div
              id="organizeMainContainer"
              className="flex flex-col justify-between min-h-screen w-full sm:w-18/20"
            >
              <div
                id="organizeContainer"
                className="flex flex-col justify-center w-full"
              >
                <div
                  id="organizeHeaderContainer"
                  className="flex flex-col justify-center items-center w-full mb-20"
                >
                  <div
                    id="organizeTitle"
                    className="flex flex-col mt-11 w-18/20 sm:w-full "
                  >
                    <CardAppTitle title="Organiser" size="big" />
                  </div>
                  <div
                    id="organizeHint"
                    className="flex flex-col items-center w-18/20 sm:w-full"
                  >
                    <CardAppText
                      text="Que voulez-vous organiser ?"
                      icon={faTag}
                    />
                  </div>
                </div>
                <div id="organizeList" className="w-full flex justify-center">
                  <List
                    rows={rows}
                    title="Élements"
                    isLargeRow={false}
                    setModalIsOpen={setMyModalIsOpen}
                    setModalTitle={setMyModalTitle}
                    setModalContent={setMyModalContent}
                    modalContent={myModalContent}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Organize;
