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
          <div id="organizeTitle" className="flex flex-col mt-11 w-18/20 ">
            <CardAppTitle title="Organiser" />
          </div>
          <div id="organizeHint" className="flex flex-col items-center w-18/20">
            <CardAppText text="Que voulez-vous organiser ?" icon={faTag} />
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
  );
};

export default Organize;
