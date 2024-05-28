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
  useEffect(() => {
  }, []);
  const router = useRouter();

  // État pour suivre si l'email est valide
  const [isEmailValid, setIsEmailValid] = useState(true);

  // Gère le changement de l'input email
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;

    // Vérifie si l'email est dans un format valide
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

  // Gère le clic sur le bouton
  const handleClick = () => {
    // Vérifie si l'email est dans un format valide
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!email || !emailRegex.test(email)) {
      alert("Veuillez entrer un email valide");
      return;
    }
  };

  return (
    <div
      id="mailAuthMainContainer"
      className="flex flex-col items-center justify-center 3xs:justify-start w-full h-screen min-h-screen"
    >
      {/* Logo pour les écrans de bureau */}
      <div
        id="mailAuthLogoContainer"
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
        id="mailAuthTitleHintContainer"
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
            <CardAppTitle title="Se connecter / S'inscrire" />
          </div>
          <div className="w-16/20 m-8">
            <CardAppText
              text="Commencez par saisir votre email"
              icon={faEnvelope}
            />
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-between items-center"
          >
            <div id="mailAuthInputContainer" className="w-16/20">
              <Input
                value={email || ""}
                defaultValue="alice@prisma.io"
                onChange={handleChangeEmail}
                isRequired
                size="md"
                type="email"
                label="Email"
                radius="lg"
                className="w-full mb-20 font-text"
              />
            </div>
            <Button
              type="submit"
              color="primary"
              variant="solid"
              size="lg"
              className="w- font-bold font-text"
              onClick={handleClick}
              disabled={!isEmailValid}
            >
              Suivant
            </Button>
          </form>
        </div>
      </div>
      {/* Version desktop */}
      <div
        id="mailAuthTitleHintContainerDesktop"
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
          <CardAppTitle title="Se connecter / S'inscrire" />
          <CardAppText
            text="Commencez par saisir votre email"
            icon={faEnvelope}
          />
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-between items-center"
          >
            <div id="mailAuthInputContainer" className="w-16/20">
              <Input
                value={email || ""}
                defaultValue="alice@prisma.io"
                onChange={handleChangeEmail}
                isRequired
                size="md"
                type="email"
                label="Email"
                radius="lg"
                className="w-full mb-20 font-text"
              />
            </div>
            <Button
              type="submit"
              color="default"
              variant="solid"
              size="lg"
              className="w-full mt-4 max-w-full pr-14 pl-14 font-bold font-text"
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
}

export default MailAuth;