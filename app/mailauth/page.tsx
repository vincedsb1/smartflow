"use client";
import React, { useContext, useState, useEffect } from "react";
import CardAppTitle from "../components/CardAppTitle";
import CardAppText from "../components/CardAppText";
import { faEnvelope, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { UserContext } from "../context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input } from "@nextui-org/react";
import Image from "next/image";
import { useTheme } from "next-themes";

const MailAuth = () => {
  const userContext = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const { theme } = useTheme();
  const logo = theme === "dark" ? "/logo-dark.svg" : "/logo-light.svg";
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleChangeEmail = (e: { target: { value: any } }) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setIsEmailValid(validateEmail(emailValue)); // Valider l'email à chaque changement
    console.log("handleChangeEmail: emailValue =", emailValue);
  };

  const handleBlurEmail = () => {
    setEmailTouched(true);
  };

  const handleClickNext = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setEmailTouched(true);
    console.log("handleClickNext: ", email);
    if (email) {
      setIsEmailValid(validateEmail(email));
      handleSubmit(e);
    } else {
      setIsEmailValid(false);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("handleSubmit: ", email);
    handleBlurEmail();
    if (!validateEmail(email)) return;

    try {
      const res = await fetch(`/api/users/checkEmail?email=${email}`);
      const data = await res.json();
      const emailExists = res.ok && data.message === "Email already exists";

      userContext?.setEmail(email);

      router.push(emailExists ? "/connexion" : "/register");
    } catch (err) {
      alert("Une erreur s'est produite lors de la vérification de l'e-mail");
    }
  };

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
          className="hidden sm:flex w-16/20 lg:w-16/20 h-[600px] bg-white shadow-lg rounded-2xl flex-row items-start justify-between border-3 border-neutral-200 dark:border-neutral-600 mx-auto my-auto max-w-[800px] max-h-[600px] overflow-hidden"
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
              className="object-cover w-full h-full dark:brightness-90"
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
                colorVariant={true}
              />
            </div>
            <form
              id="formContainer"
              onSubmit={handleSubmit}
              className="flex flex-col justify-between items-center w-full mb-4"
            >
              <Input
                isRequired
                onChange={handleChangeEmail}
                onBlur={handleBlurEmail}
                size="md"
                type="email"
                label="Votre email"
                radius="lg"
                color="default"
                variant="bordered"
                className="w-full mb-4 font-text "
                errorMessage={
                  emailTouched && !isEmailValid && email
                    ? "Veuillez entrer un email valide"
                    : ""
                }
                isInvalid={emailTouched && !!(!isEmailValid && email)}
              />
              <Button
                type="submit"
                color="default"
                variant="solid"
                size="lg"
                className="w-full max-w-full pr-14 pl-14 font-bold font-text"
                onClick={handleClickNext}
                isDisabled={!email || !isEmailValid}
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
            className="sm:hidden flex flex-row justify-start items-center xs:h-6 2xs:h-10 3xs:h-16 w-full mt-4 xs:mt-2 2xs:mt-8 3xs:mt-10 sm:mt-16 ml-0"
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
              <CardAppTitle title="Se connecter / S'inscrirefsdq" size="big" />

              <div
                id="mobileTextContainer"
                className="w-60 xs:w-64 2xs:w-72 3xs:w-80 mb-10"
              >
                <CardAppText
                  text="Commencez par saisir votre email"
                  icon={faEnvelope}
                  colorVariant={true}
                  shadow={true}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          id="mailAuthMobileBottom"
          className="flex flex-col items-center pb-4 xs:pb-2 2xs:pb-4 3xs:pb-8 sm:pb-10 w-60 xs:w-64 2xs:w-72 3xs:w-80"
        >
          <form
            id="formContainer"
            onSubmit={handleSubmit}
            className="flex flex-col justify-between items-center w-full mb-4"
          >
            <Input
              isRequired
              onChange={handleChangeEmail}
              onBlur={handleBlurEmail}
              size="md"
              type="email"
              label="Votre email"
              radius="lg"
              color="default"
              variant="bordered"
              className="w-full mb-4 font-text "
              errorMessage={
                emailTouched && !isEmailValid && email
                  ? "Veuillez entrer un email valide"
                  : ""
              }
              isInvalid={emailTouched && !!(!isEmailValid && email)}
            />
            <Button
              type="submit"
              color="default"
              variant="solid"
              size="lg"
              className="w-full max-w-full pr-14 pl-14 font-bold font-text"
              onClick={handleClickNext}
              isDisabled={!email || !isEmailValid}
            >
              Suivant
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MailAuth;
