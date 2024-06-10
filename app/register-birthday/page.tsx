"use client";
import React, { useEffect, useState } from "react";
import CardAppText from "../components/CardAppText";
import CardAppTitle from "../components/CardAppTitle";
import MainButton from "../components/MainButton";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import InputBirthday from "../components/InputBirthday";
import { useUser } from "../context/UserContext";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { faBirthdayCake } from "@fortawesome/free-solid-svg-icons";


// Page d'inscription - Date de naissance
const InscriptionPage = () => {
  const { theme } = useTheme();
  const logo = theme === "dark" ? "/logo-dark.svg" : "/logo-light.svg";
  const router = useRouter();
  const {
    user,
    setUser,
    email,
    setEmail,
    firstname,
    setFirstname,
    birthday,
    setBirthday,
  } = useUser();

  // Affichage des données stockées
  useEffect(() => {
  }, [firstname, email]);

  // Fonction de redirection vers la page suivante
  const handleContinue = () => {
    if (!birthday) {
      alert("Veuillez sélectionner une date de naissance.");
      return;
    }
    const formattedBirthday = `${("0" + birthday.getDate()).slice(-2)}/${("0" + (birthday.getMonth() + 1)).slice(-2)}/${birthday.getFullYear()}`;
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/;
    console.log("Date de naissance formatée:", formattedBirthday);
    if (formattedBirthday && dateRegex.test(formattedBirthday)) {
      setUser({ ...user, email, firstname, birthday });
      router.push("/register-password");
    } else {
      alert("La date de naissance doit être au format JJ/MM/AAAA");
      return;
    }
  };

  const handleBack = () => {
    router.back();
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
        <FontAwesomeIcon
          icon={faChevronLeft}
          className="text-neutral-800 dark:text-neutral-200 text-xs w-4 h-4 m-5"
          onClick={handleBack}
        />
      </div>
      <div
        id="logoContainer"
        className="hidden sm:flex flex-row justify-start items-center h-16 w-full relative p-4"
      >
        <Image src={logo} alt="logo" width={151} height={38} priority={true} />
      </div>
      {/* Mobile */}
      <div id="mobileVersion" className="flex flex-col items-center justify-center w-full sm:hidden h-screen ">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="flex flex-col items-center justify-center w-full p-4">
            <CardAppTitle title="Votre profil" size="big" />
          </div>
          <div className=" w-80 m-8">
            <CardAppText text="Quelle est votre date de naissance ?" icon={faBirthdayCake} />
          </div>
          <div id="registerBirthdayInputContainer" className="w-80 mb-60 xs:mb-0 xs:mt-0 mt-16 font-text">
            <InputBirthday
              label="Date de naissance"
              inputType="date"
              onChange={(date) => {
                console.log("Date sélectionnée:", date);
                setBirthday(
                  date ? new Date(date.toISOString().substring(0, 10)) : null
                );
              }}
            />
          </div>
          <Button type="submit" color="primary" variant="solid" size="lg" className="w-80 font-bold font-text"
            onClick={handleContinue}>
            Suivant
          </Button>
        </div>
      </div>
      {/* Version desktop */}
      <div id="desktopVersion" className="hidden sm:flex w-16/20 lg:w-16/20 h-3/4 bg-white shadow-lg rounded-2xl flex-row items-start justify-between border-neutral-200 mx-auto my-auto">
        <div className="hidden 3xs:flex w-1/2 h-full relative">
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
        <div className="flex flex-col items-center dark:bg-neutral-800 w-1/2 h-full justify-between p-8 dark:rounded-tr-2xl dark:rounded-br-2xl">
          <CardAppTitle title="Votre profil" size="big" />
          <CardAppText text="Quelle est votre date de naissance ?" icon={faBirthdayCake} />
          <div id="registerBirthdayInputContainer" className="w-2/3 font-text mt-60"
          >
            <InputBirthday
              label="Date de naissance"
              inputType="date"
              onChange={(date) => {
                console.log("Date sélectionnée:", date);
                setBirthday(
                  date ? new Date(date.toISOString().substring(0, 10)) : null
                );
              }}
            />
          </div>
          <Button
            type="submit"
            color="default"
            variant="solid"
            size="lg"
            className="w-2/3 font-bold"
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
