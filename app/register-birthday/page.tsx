"use client";
import React, { useEffect, useState } from "react";
import CardAppText from "../components/CardAppText";
import CardAppTitle from "../components/CardAppTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faBirthdayCake,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import InputBirthday from "../components/InputBirthday";
import { useUser } from "../context/UserContext";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useTheme } from "next-themes";

const InscriptionPage = () => {
  const { theme } = useTheme();
  const logo = theme === "dark" ? "/logo-dark.svg" : "/logo-light.svg";
  const router = useRouter();
  const { user, setUser, email, firstname, birthday, setBirthday } = useUser();

  useEffect(() => {}, [firstname, email]);

  const handleContinue = (event: React.FormEvent) => {
    event.preventDefault();
    if (!birthday) {
      alert("Veuillez indiquer votre date de naissance.");
      return;
    }
    const formattedBirthday = `${("0" + birthday.getDate()).slice(-2)}/${(
      "0" +
      (birthday.getMonth() + 1)
    ).slice(-2)}/${birthday.getFullYear()}`;
    const dateRegex =
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/;
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

  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const widthCondition = window.innerWidth >= 1280;
      const heightCondition = window.innerHeight >= 896;
      setShowLogo(widthCondition || heightCondition);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      id="mailAuthMainContainer"
      className="flex flex-col items-center justify-center w-full h-full min-h-screen"
    >
      <div
        id="mailAuthDesktop"
        className="hidden sm:flex h-full w-full flex-col justify-center items-center"
      >
        {showLogo && (
          <div
            id="logoContainer"
            className="absolute sm:top-0 sm:left-0 flex-row justify-start items-center h-16 w-full p-4"
          >
            <Image
              src={logo}
              alt="logo"
              width={151}
              height={38}
              priority={true}
            />
          </div>
        )}
        <div
          id="desktopVersion"
          className="hidden sm:flex w-16/20 lg:w-16/20 h-[600px] bg-white shadow-lg rounded-2xl flex-row items-start justify-between border-3 border-neutral-200 mx-auto my-auto max-w-[800px] max-h-[600px] overflow-hidden"
        >
          <div
            id="desktopImageContainer"
            className="flex w-1/2 h-full relative"
          >
            <Image
              src="/images/entryVisual.svg"
              alt="Entry Visual"
              width={400}
              height={600}
              className="object-cover w-full h-full"
            />
            <div
              id="desktopWelcomeTextContainer"
              className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <h2 className="text-4xl font-bold font-text text-cyan-900">
                Bienvenue
              </h2>
            </div>
          </div>
          <div
            id="desktopContentContainer"
            className="flex flex-col items-center dark:bg-neutral-800 w-1/2 h-full justify-between p-8 dark:rounded-tr-2xl dark:rounded-br-2xl"
          >
            <div
              id="desktopTitleContainer"
              className="flex flex-col items-start w-full mt-12"
            >
              <CardAppTitle title="Votre profil" size="big" />
              <CardAppText
                text="Quelle est votre date de naissance ?"
                icon={faBirthdayCake}
                shadow
                colorVariant
              />
            </div>
            <form
              id="formContainer"
              onSubmit={handleContinue}
              className="flex flex-col items-center w-full"
            >
              <InputBirthday
                label="Date de naissance"
                inputType="date"
                onChange={(date) => {
                  setBirthday(
                    date ? new Date(date.toISOString().substring(0, 10)) : null
                  );
                }}
              />
              <Button
                type="submit"
                color="default"
                variant="solid"
                size="lg"
                className="w-full max-w-full pr-14 pl-14 font-bold font-text"
                onClick={handleContinue}
              >
                Suivant
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div
        id="mailAuthMobile"
        className="sm:hidden w-full h-full flex flex-col flex-grow justify-between items-center "
      >
        <div
          id="MailAuthMobileTop"
          className="flex flex-col items-center justify-center w-full "
        >
          <div
            id="chevronContainer"
            className="sm:hidden flex flex-row justify-start items-center h-16 w-full mt-4 xs:mt-6 2xs:mt-8 3xs:mt-10 sm:mt-16 ml-0"
          >
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="text-neutral-800 dark:text-neutral-200 text-xs w-4 h-4 m-5 cursor-pointer"
              onClick={handleBack}
            />
          </div>
          <div
            id="mobileTitleMainContainer"
            className="flex flex-col items-center justify-center w-full mt-4 xs:mt-6 2xs:mt-8 3xs:mt-10 sm:mt-12"
          >
            <div
              id="mobileTitleContainer"
              className="flex flex-col items-start"
            >
              <CardAppTitle title="Votre profil" size="big" />
              <div
                id="mobileTextContainer"
                className="w-60 xs:w-64 2xs:w-72 3xs:w-80  mb-10"
              >
                <CardAppText
                  text="Quelle est votre date de naissance ?"
                  icon={faBirthdayCake}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          id="mailAuthMobileBottom"
          className="flex flex-col items-center pb-4 xs:pb-24 2xs:pb-24 3xs:pb-24 sm:pb-24"
        >
          <form
            id="formContainer"
            onSubmit={handleContinue}
            className="flex flex-col items-center w-full"
          >
            <div
              id="mobileInputContainer"
              className="w-full pb-10 xs:pb-12 2xs:pb-16 3xs:pb-20 sm:pb-32"
            >
              <InputBirthday
                label="Date de naissance"
                inputType="date"
                onChange={(date) => {
                  setBirthday(
                    date ? new Date(date.toISOString().substring(0, 10)) : null
                  );
                }}
              />
            </div>
            <div id="mobileButtonContainer" className="">
              <Button
                type="submit"
                color="primary"
                variant="solid"
                size="lg"
                className="w-60 xs:w-64 2xs:w-72 3xs:w-80 font-bold font-text"
                onClick={handleContinue}
              >
                Suivant
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InscriptionPage;
