"use client";
import React, { useState, useEffect, useContext } from "react";
import CardAppText from "../components/CardAppText";
import CardAppTitle from "../components/CardAppTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useUser } from "../context/UserContext";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import Image from "next/image";
import { useTheme } from "next-themes";
import Link from "next/link";


// Page d'inscription pour le prénom
const InscriptionPage = () => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string | null>(null);
  const { user, setUser, setEmail, setFirstname } = useUser();
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const { theme } = useTheme();
  const logo = theme === "dark" ? "/logo-dark.svg" : "/logo-light.svg";


  // Fonction pour gérer le changement de prénom
  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFirstName(event.target.value);
  };

  // Récupérer le token de l'URL
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");
      setToken(token);
    }
  }, []);

  // Vérifier l'email
  useEffect(() => {
    const verifyEmail = async () => {
      if (token) {
        try {
          const response = await fetch(
            `/api/emailverification?token=${token}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = await response.json();
          setEmail(data.email);
          setUser({ ...user, email: data.email });
          setIsEmailVerified(true); // Ajoutez cette ligne
        } catch (error) {
          console.error(error);
          router.push("/mailauth");
        }
      }
    };

    verifyEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // Fonction pour continuer
  const handleContinue = () => {
    const nameRegex = /^[a-zA-Z ]+$/;
    if (!firstName || !nameRegex.test(firstName)) {
      alert("Veuillez entrer un prénom valide.");
      return;
    }
    setFirstname(firstName);
    router.push("/register-birthday");
  };



  return (
    <div
      id="mailAuthMainContainer"
      className="flex flex-col items-center justify-center w-full h-screen min-h-screen"
    >
      <div
        id="chevronContainer"
        className="sm:hidden absolute top-12 left-0 flex flex-row justify-start items-center h-16 w-full p-4"
      >
    <Link href="/">
      <FontAwesomeIcon
        icon={faChevronLeft}
        className="text-neutral-800 dark:text-neutral-200 text-xs w-4 h-4 m-5 cursor-pointer"
      />
    </Link>
      </div>
      <div
        id="logoContainer"
        className="hidden sm:flex flex-row justify-start items-center h-16 w-full relative p-4"
      >
        <Image src={logo} alt="logo" width={151} height={38} priority={true} />
      </div>
      {/* Mobile */}
      <div id="mobileVersion" className="flex flex-col items-center justify-center w-full sm:hidden h-screen">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="flex flex-col items-center justify-center w-full p-4">
            <CardAppTitle title="Votre profil" />
          </div>
          <div className=" w-80 m-8">
            <CardAppText
              text="Quel est votre prénom ?"
              icon={faUser}
            />
          </div>
          <div
            className="flex flex-col justify-between items-center mt-44"
          >
            <div id="registerFirstnameInputContainer">
              <Input
                onChange={handleFirstNameChange}
                isRequired
                size="md"
                type="text"
                label="Prénom"
                radius="lg"
                className="w-80 mb-20 font-text"
              />
            </div>
            <Button
              type="submit"
              color="primary"
              variant="solid"
              size="lg"
              className="w-80 font-bold font-text"
              onClick={handleContinue}
            >
              Suivant
            </Button>
          </div>
        </div>
      </div>
      {/* Version desktop */}
      <div id="desktopVersion" className="hidden sm:flex w-2/3 lg:w-1/2 h-3/4 bg-white shadow-lg rounded-2xl flex-row items-start justify-between border-neutral-200 mx-auto my-auto">
        <div className="flex w-1/2 h-full relative">
          <Image
            src="/images/entryVisual.svg"
            alt="Entry Visual"
            width={400}
            height={600}
            className="object-cover w-full h-full rounded-tl-2xl rounded-bl-2xl"
          />
          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h2 className="text-4xl font-bold font-quicksand text-cyan-900">Bienvenue</h2>
          </div>
        </div>
        <div className="flex flex-col items-center dark:bg-neutral-800 3xs:items-center 3xs:w-1/2 h-full justify-center p-8 ">
          <CardAppTitle title="Votre profil" />
          <CardAppText
            text="Quel est votre prénom ?"
            icon={faUser}
          />
          <div id="registerFirstnameInputContainer" className="w-16/20">
            <Input
              onChange={handleFirstNameChange}
              isRequired
              size="md"
              type="text"
              label="Prénom"
              radius="lg"
              className="w-full mb-20"
            />
          </div>
          <Button
            type="submit"
            color="default"
            variant="solid"
            size="lg"
            className="w-full mt-4 max-w-full pr-14 pl-14 font-bold"
            onClick={handleContinue}
          >
            Suivant
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InscriptionPage;
