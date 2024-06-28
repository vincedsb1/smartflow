"use client";

import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faChevronRight,
  faTrash,
  faPersonWalkingArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import List from "../components/List";
import { UserContext, useUser } from "../context/UserContext";
import { useRouter } from "next/navigation";
import DesktopMenu from "../components/DesktopMenu";

const UserProfile: React.FC = () => {
  const { firstname, email, birthday, user, token, setUser, setToken } =
    useUser();
  const userId = user?.id;
  const router = useRouter();

  useEffect(() => {
    if (!user || user === undefined || !token || token === undefined) {
      router.push("/");
    }
  }, [user, token, router]);

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    router.push("/");
  };

  const formattedBirthday = birthday
    ? new Date(birthday).toLocaleDateString("fr-FR")
    : null;

  const topRows = [
    {
      color: "",
      mainLabel: "Prénom",
      secondaryLabel: firstname || "Chargement...",
      icon: faChevronRight,
      bgcolor: "",
      link: "/user/firstname",
    },
    {
      mainLabel: "Email",
      secondaryLabel: email || "Chargement...",
      icon: faChevronRight,
      bgcolor: "",
      link: "/user/email",
    },
    {
      mainLabel: "Date de naissance",
      secondaryLabel: formattedBirthday || "Chargement...",
      icon: faChevronRight,
      bgcolor: "",
      link: "/user/birthday",
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
      link: "/cgu",
    },
    {
      mainLabel: "Se déconnecter",
      secondaryLabel: undefined,
      icon: faPersonWalkingArrowRight,
      onClick: handleLogout,
      link: "/",
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

  const [signupDate, setSignupDate] = useState('');
  const userContext = useContext(UserContext);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/users/details', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });
  
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données utilisateur');
        }
  
        const data = await response.json();
        console.log('Données utilisateur:', data.signupDate);
  
        if (data.signupDate) {
          setSignupDate(new Date(data.signupDate).toLocaleDateString('fr-FR'));
        } else {
          console.log('signupDate est undefined dans la réponse de l\'API');
          setSignupDate('Date non disponible');
        }
      } catch (error) {
        console.error('Erreur:', error);
      }
    };
  
    fetchUserData();
  }, []);

  return (
    <div className="flex flex-row justify-center items-center">
      <div className="w-full sm:max-w-[1170px]  bg-neutral-200 dark:bg-neutral-700 sm:shadow-2xl sm:shadow-neutral-200 dark:sm:shadow-black flex flex-row ">
        <div className="hidden sm:block">
          <DesktopMenu />
        </div>
        <div
          id="todayContentContainer"
          className="flex flex-row justify-center  w-full sm:ml-48 md:ml-72"
        >
          <div className="flex flex-row justify-center  w-full">
            <div
              id="userMainContainer"
              className="flex flex-col min-h-screen align-middle items-center"
            >
              <div
                id="userHeaderContainer"
                className="flex flex-row w-full mt-10 mb-4 justify-center"
              >
                <div
                  id="userTopInfosContainer"
                  className=" w-18/20 flex flex-col"
                >
                  <div
                    id="userTopNameContainer"
                    className="flex flex-row h-2/5"
                  >
                    <div
                      id="userTopName"
                      className="flex flex-row  font-title font-bold text-2xl mt-2 ml-1"
                    >
                      {firstname}
                    </div>
                  </div>
                  <div
                    id="userMemberSinceContainer"
                    className="flex flex-row  h-3/5"
                  >
                    <div
                      id="userTopMemberSince"
                      className="flex flex-row font-title text-md mt-2 ml-1 text-neutral-600"
                    >
                      {signupDate && <p>Membre depuis le {signupDate}</p>}
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
                  userId={user?.id}
                />
              </div>
              <div id="userOtherContainer" className="w-full mb-24">
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
                  userId={user?.id}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
