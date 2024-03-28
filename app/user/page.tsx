"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faChevronRight,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import List from "../components/List";
import { UserContext, useUser } from "../context/UserContext";

interface ListRowProps {
  secondaryLabel: string | null;
}

const UserProfile: React.FC = () => {
  const { firstname, email, birthday } = useUser();
  console.log(firstname, email, birthday)

  const formattedBirthday = birthday?.toLocaleDateString('fr-FR');

  const topRows = [
    {
      color: "",
      mainLabel: "Prénom",
      secondaryLabel: firstname,
      icon: faChevronRight,
      bgcolor: "",
      link: "/user/firstname",
    },
    {
      mainLabel: "Email",
      secondaryLabel: email,
      icon: faChevronRight,
      bgcolor: "",
    },
    {
      mainLabel: "Date de naissance",
      secondaryLabel: formattedBirthday || "",
      icon: faChevronRight,
      bgcolor: "",
    },
  ];


  const bottomRows = [
    {
      color: "",
      mainLabel: "Mode sombre",
      secondaryLabel: undefined,
      icon: faChevronRight,
      bgcolor: "",
      link: "/user/darkmode",
    },
    {
      mainLabel: "Information légales",
      secondaryLabel: undefined,
      icon: faChevronRight,
      bgcolor: "",
    },
    {
      mainLabel: "Supprimer mon compte",
      secondaryLabel: undefined,
      icon: faTrash,
      bgcolor: "",
      colorState: "warning" as
        | "normal"
        | "desactivated"
        | "warning"
        | undefined,
      isModal: true,
      modalTitle: "Confirmation de suppression",
      modalContent: "Êtes-vous sûr de vouloir supprimer votre compte ?",
    },
  ];

  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");

  return (
    <div
      id="userMainContainer"
      className="flex flex-col min-h-screen align-middle items-center"
    >
      <div id="userHeaderContainer" className="flex flex-row w-full m-10">
        <div
          id="userPictureMainContainer"
          className=" w-1/3 flex flex-row justify-end pr-6"
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
              {firstname}
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
      <div id="userInfosContainer" className="w-full pb-8">
        <List
          rows={topRows}
          title={"Informations du compte"}
          isLargeRow={true}
          belowListLink={""}
          onBelowListLinkClick={() => setModalIsOpen(true)}
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
          setModalTitle={setModalTitle}
          setModalContent={setModalContent}
          modalTitle={modalTitle}
          modalContent={modalContent}
        />
      </div>
      <div id="userOtherContainer" className="w-full ">
        <List
          rows={bottomRows}
          title={"Autre"}
          isLargeRow={true}
          belowListLink={""}
          onBelowListLinkClick={() => setModalIsOpen(true)}
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
          setModalTitle={setModalTitle}
          setModalContent={setModalContent}
          modalTitle={modalTitle}
          modalContent={modalContent}
        />
      </div>
      <div id="userOtherContainer" className=""></div>
    </div>
  );
};

export default UserProfile;
