"use client";
import React, { useContext, useState, useEffect } from "react";
import CardAppTitle from "../components/CardAppTitle";
import CardAppText from "../components/CardAppText";
import { faEnvelope, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { UserContext } from "../context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input, Link } from "@nextui-org/react";
import Image from "next/image";
import { useTheme } from "next-themes";

const MailAuth = () => {
  const userContext = useContext(UserContext);
  const { theme } = useTheme();
  const logo = theme === "dark" ? "/logo-dark.svg" : "/logo-light.svg";
  const router = useRouter();

  if (!userContext) {
    throw new Error("UserContext must be used within a UserContextProvider");
  }

  const { email, setEmail } = userContext;
  const [isEmailValid, setIsEmailValid] = useState(true);

  const handleChangeEmail = (e: { target: { value: any; }; }) => {
    const email = e.target.value;
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    setIsEmailValid(emailRegex.test(email));
    setEmail(email);
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/users/checkEmail?email=${email}`);
      const data = await res.json();
      const emailExists = res.ok && data.message === "Email already exists";
      router.push(emailExists ? "/connexion" : "/register");
    } catch (err) {
      console.error(`Error: ${err}`);
      alert("Une erreur s'est produite lors de la vérification de l'e-mail");
    }
  };

  const handleClick = () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!email || !emailRegex.test(email)) {
      alert("Veuillez entrer un email valide");
    }
  };

  const handleBack = () => {
    router.back();
  };

  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const widthCondition = window.innerWidth >= 1280; // xl breakpoint
      const heightCondition = window.innerHeight >= 896; // custom height condition
      setShowLogo(widthCondition || heightCondition);
    };

    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize); // Check on resize

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      id="mailAuthMainContainer"
      className="flex flex-col items-center justify-center w-full h-full min-h-screen"
    >
      {/* Desktop version */}
      <div
        id="mailAuthDesktop"
        className="hidden sm:flex h-full w-full flex-col justify-center items-center"
      >
        {showLogo && (
          <div
            id="logoContainer"
            className="absolute sm:top-0 sm:left-0 flex-row justify-start items-center h-16 w-full p-4 "
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
          className="hidden sm:flex w-16/20 lg:w-16/20 h-[600px] bg-white shadow-lg rounded-2xl flex-row items-start justify-between border-3 border-neutral-200 dark:border-neutral-700 mx-auto my-auto max-w-[800px] max-h-[600px] overflow-hidden"
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
              className="object-cover w-full h-full brightness-90"
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
            className="flex flex-col items-center dark:bg-neutral-800 w-1/2 h-full justify-between p-8 "
          >
            <div
              id="desktopTitleContainer"
              className="flex flex-col items-start w-full mt-12"
            >
              <CardAppTitle title="Se connecter / S'inscrire" size="big" />
              <CardAppText
                text="Commencez par saisir votre email"
                icon={faEnvelope}
                shadow
              />
            </div>
            <form
              id="formContainer"
              onSubmit={handleSubmit}
              className="flex flex-col items-center w-full"
            >
              <Input
                value={email || ""}
                onChange={handleChangeEmail}
                isRequired
                size="md"
                type="email"
                label="Email"
                radius="lg"
                className="w-full mb-4 font-text"
              />
              <Button
                type="submit"
                color="default"
                variant="solid"
                size="lg"
                className="w-full max-w-full pr-14 pl-14 font-bold font-text"
                onClick={handleClick}
                disabled={!isEmailValid}
              >
                Suivant
              </Button>
            </form>
          </div>
        </div>
      </div>
      {/* Mobile version */}
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
              <CardAppTitle title="Se connecter / S'inscrire" size="big" />

              <div
                id="mobileTextContainer"
                className="w-60 xs:w-64 2xs:w-72 3xs:w-80  mb-10"
              >
                <CardAppText
                  text="Commencez par saisir votre email"
                  icon={faEnvelope}
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
            onSubmit={handleSubmit}
            className="flex flex-col items-center w-full"
          >
            <div
              id="mobileInputContainer"
              className="w-full pb-10 xs:pb-12 2xs:pb-16 3xs:pb-20 sm:pb-32"
            >
              <Input
                value={email || ""}
                onChange={handleChangeEmail}
                isRequired
                size="md"
                type="email"
                label="Email"
                radius="lg"
                className="w-60 xs:w-64 2xs:w-72 3xs:w-80 font-text"
              />
            </div>

            <div id="mobileButtonContainer" className="">
              <Button
                type="submit"
                color="primary"
                variant="solid"
                size="lg"
                className="w-60 xs:w-64 2xs:w-72 3xs:w-80 font-bold font-text"
                onClick={handleClick}
                disabled={!isEmailValid}
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

export default MailAuth;
