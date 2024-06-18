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
      <div className="w-full sm:max-w-[1170px]  bg-neutral-200 sm:shadow-2xl sm:shadow-neutral-200 flex flex-row ">
        <div className="hidden sm:block">
          <DesktopMenu />
        </div>
        <div className="flex flex-row justify-center  w-full">
          <div
            id="organizeMainContainer"
            className="flex flex-col justify-between min-h-screen w-full"
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
                  className="flex flex-col mt-11 w-18/20 "
                >
                  <CardAppTitle title="Organiser" />
                </div>
                <div
                  id="organizeHint"
                  className="flex flex-col items-center w-18/20"
                >
                  <CardAppText
                    text="Que voulez-vous organiser ?"
                    icon={faTag}
                  />
                </div>
              </div>
              <div id="organizeList" className="">
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
  );
};

export default Organize;
