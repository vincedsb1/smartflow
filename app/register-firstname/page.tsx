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


// Page d'inscription pour le prénom
const InscriptionPage = () => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string | null>(null);
  const { user, setUser, setEmail, setFirstname } = useUser();
  const [isEmailVerified, setIsEmailVerified] = useState(false);


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
    const nameRegex = /^[a-zA-Z]+$/;
    if (firstName && nameRegex.test(firstName)) {
      setFirstname(firstName);
    } else {
      alert("Le prénom ne doit contenir que des lettres");
      return;
    }

    if (user.email && isEmailVerified) {
      router.push("/register-birthay");
    } else {
      router.push("/mailauth");
    }
  };

  return (
    <div
      id="registerMainContainer"
      className="flex flex-col justify-between items-center h-screen"
    >
      <div
        id="registerTopContainer"
        className="flex flex-col justify-center w-full"
      >
        <div
          id="registerBackIconContainer"
          className="w-full flex flex-col mt-16"
        >
          <Link href="/register">
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="text-neutral-800 dark:text-neutral-200 text-xs w-4 h-4 m-5"
            />
          </Link>
        </div>
        <div
          id="registerTitleHintContainer"
          className="flex flex-col justify-center items-center w-full"
        >
          <div id="registerTitle" className="flex flex-col mt-11 w-16/20 ">
            <CardAppTitle title="Votre profil" />
          </div>
          <div id="registerHint" className="flex flex-col items-center w-16/20">
            <CardAppText text="Quel est votre prénom ?" icon={faUser} />
          </div>
        </div>
      </div>
      <div
        id="registerBottomContainer"
        className="flex flex-col justify-center items-center mb-14 w-full"
      >
        <div
          id="registerFirstnameInputContainer"
          className="w-16/20 flex flex-col justify-center items-center mb-28 "
        >
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
        <div
          id="registerButtonTextContainer"
          className="flex flex-col w-full justify-center items-center mb-1 mt-1 "
        >
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
  );
};

export default InscriptionPage;
