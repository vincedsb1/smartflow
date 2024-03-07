import React from "react";
import ThemeSwitcher from "../ThemeSwitcher";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
// import List from "../components/List-old";
import List from "../components/List";

const user = () => {
  const rows = [
    {
      color: "bg-blue-400",
      mainLabel: "Main Label 1",
      secondaryLabel: "Secondary Label 1",
      icon: faChevronRight,
      bgcolor: "bg-sky-300",
    },
    {
      mainLabel: "Main Label 2",
      icon: faChevronRight,
      bgcolor: "bg-yellow-300",
    },
  ];

  return (
    <div
      id="userMainContainer"
      className="flex flex-col h-screen align-middle items-center"
    >
      <div id="userHeaderContainer" className="flex flex-row w-full m-10">
        <div
          id="userPictureMainContainer"
          className=" w-1/3 flex flex-row justify-end mr-6"
        >
          <div
            id="userPictureContainer"
            className="rounded-full w-20 h-20 flex flex-row justify-center relative"
          >
            <Image
              src="/userPlaceholder.svg"
              alt="User Placeholder"
              width={200}
              height={200}
              className="rounded-full opacity-50"
            />
            <div className="absolute bottom-0 right-0 bg-emerald-600 p-1 rounded-full h-6 w-6 flex flex-row justify-center items-center shadow">
              <FontAwesomeIcon
                icon={faPenToSquare}
                className="text-white text-xs"
              />
            </div>
          </div>
        </div>
        <div id="userTopInfosContainer" className=" w-2/3 flex flex-col">
          <div id="userTopNameContainer" className="flex flex-row h-2/5">
            <div
              id="userTopName"
              className="flex flex-row  font-title font-bold text-2xl mt-2 ml-1"
            >
              Pedro
            </div>
          </div>
          <div id="userMemberSinceContainer" className="flex flex-row  h-3/5">
            <div
              id="userTopMemberSince"
              className="flex flex-rowfont-title text-md mt-2 ml-1"
            >
              Membre depuis le 19/07/2024
            </div>
          </div>
        </div>
      </div>
      <div id="userInfosContainer" className="w-full ">
        <List rows={rows} />
      </div>
      <div id="userOtherContainer" className=""></div>

      <div className="flex flex-row p-10">
        <div className=" pr-5">
          <p>Mode sombre </p>
        </div>
        <div className="">
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
};

{
  /* <List
          title="Informations du compte"
          size="large"
          hasAddButton={false}
          isItemSelectable={true}
          itemClickAction="navigate"
          titleButton=""
          colorIndicator={false}
        >
          <div>Prénom</div>
          <div>Email</div>
          <div>Date de naissance</div>
        </List> */
}

export default user;
