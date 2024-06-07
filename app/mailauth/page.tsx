"use client";
import React, { useContext, useState, useEffect } from "react";
import CardAppTitle from "../components/CardAppTitle";
import CardAppText from "../components/CardAppText";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { UserContext } from "../context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Link } from "@nextui-org/react";
import Image from "next/image";
import { useTheme } from "next-themes";

const MailAuth = () => {
  const userContext = useContext(UserContext);
  const { theme } = useTheme();
  const logo = theme === "dark" ? "/logo-dark.svg" : "/logo-light.svg";

  if (!userContext) {
    throw new Error("UserContext must be used within a UserContextProvider");
  }

  const { email, setEmail } = userContext;
  useEffect(() => { }, []);
  const router = useRouter();

  const [isEmailValid, setIsEmailValid] = useState(true);

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    setIsEmailValid(emailRegex.test(email));

    if (setEmail) {
      setEmail(email);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/users/checkEmail?email=${email}`);
      const data = await res.json();
      const emailExists = res.ok && data.message === "Email already exists";
      if (!emailExists) {
        router.push("/register");
        return;
      }
      router.push("/connexion");
    } catch (err) {
      console.log(`Error: ${err}`);
      alert("Une erreur s'est produite lors de la vérification de l'e-mail");
    }
  };

  const handleClick = () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!email || !emailRegex.test(email)) {
      alert("Veuillez entrer un email valide");
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
      {/* Mobile Version */}
      <div id="mobileVersion" className="flex flex-col items-center justify-center w-full sm:hidden h-screen mt-36">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="flex flex-col items-start justify-center w-full p-4">
            <CardAppTitle title="Se connecter / S'inscrire" size="big" />
            <div className="w-80 mb-10">
              <CardAppText text="Commencez par saisir votre email" icon={faEnvelope} />
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col items-center w-full mt-4 3xs:mt-0">
              <Input
                value={email || ""}
                onChange={handleChangeEmail}
                isRequired
                size="md"
                type="email"
                label="Email"
                radius="lg"
                className="w-80 mb-60 mt-16 3xs:mt-0 font-text"
              />
              <div className="mt-18">
                <Button
                  type="submit"
                  color="primary"
                  variant="solid"
                  size="lg"
                  className="w-80 font-bold font-text "
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
      {/* Desktop Version */}
      <div id="desktopVersion" className="hidden sm:flex w-16/20 lg:w-16/20 h-3/4 bg-white shadow-lg rounded-2xl flex-row items-start justify-between border-neutral-200 mx-auto my-auto">
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
        <div className="flex flex-col items-center dark:bg-neutral-800 w-1/2 h-full justify-between p-8 dark:rounded-tr-2xl dark:rounded-br-2xl">
          <div className="flex flex-col items-start w-full mt-12">
            <CardAppTitle title="Se connecter / S'inscrire" size="big" />
            <CardAppText text="Commencez par saisir votre email" icon={faEnvelope} />
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col justify-between items-center w-full mb-4">
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

  );
};

export default MailAuth;
