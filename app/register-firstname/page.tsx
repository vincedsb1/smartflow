"use client";
import React, { useState, useEffect, useContext } from "react";
import CardAppText from "../components/CardAppText";
import CardAppTitle from "../components/CardAppTitle";
import MainButton from "../components/MainButton";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import InputName from "../components/InputName";
import { useRouter } from "next/navigation";
import { useUser } from "../context/UserContext";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import Image from "next/image";
import { useTheme } from "next-themes";

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
      id="registerFirstnameMainContainer"
      className="flex flex-col items-center justify-center 3xs:justify-start w-full h-screen min-h-screen"
    >
      {/* Logo pour les écrans de bureau */}
      <div
        id="registerFirstnameLogoContainer"
        className="hidden 3xs:flex flex-row justify-start items-center h-16 w-full relative p-4"
      >
        <Image
          src={logo}
          alt="logo"
          width={151}
          height={38}
          priority={true}
        />
      </div>
      {/* Version mobile */}
      <div
        id="registerFirstnameTitleHintContainer"
        className="flex flex-col items-center justify-center w-full 3xs:hidden"
      >
        <div className="flex flex-row justify-center items-center h-16 w-full relative p-4 mb-44">
          <Image
            src={logo}
            alt="logo"
            width={200}
            height={40}
            priority={true}
          />
        </div>
        <div>
          <div className="w-16/20 m-8">
            <CardAppTitle title="Votre profil" />
          </div>
          <div className="w-16/20 m-8">
            <CardAppText
              text="Quel est votre prénom ?"
              icon={faUser}
            />
          </div>

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
            color="primary"
            variant="solid"
            size="lg"
            className="w-16/20 font-bold"
            onClick={handleContinue}
          >
            Suivant
          </Button>
        </div>
      </div>
      {/* Version desktop */}
      <div
        id="registerFirstnameTitleHintContainerDesktop"
        className="hidden 3xs:flex flex-col items-center w-2/3 lg:w-1/2 h-1/2 bg-white shadow-lg rounded-2xl  3xs:flex-row 3xs:items-start 3xs:justify-between border-neutral-200 border-3  mx-auto my-auto"
      >
        <div className="hidden 3xs:flex w-1/2 h-full relative">
          <Image
            src="/images/entryVisual.svg"
            alt="Entry Visual"
            width={400}
            height={600}
            className="object-cover w-full h-full rounded-2xl"
          />
          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h2 className="text-4xl font-bold font-quicksand">Bienvenue</h2>
          </div>
        </div>
        <div className="flex flex-col items-center 3xs:items-center 3xs:w-1/2 h-full justify-center p-8 ">
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
