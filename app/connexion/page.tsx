"use client";
import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CardAppTitle from "../components/CardAppTitle";
import CardAppText from "../components/CardAppText";
import { UserContext } from "../context/UserContext";
import { Button } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faUnlock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { Input } from "@nextui-org/react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";

const ConnexionPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();
  const logo = theme === "dark" ? "/logo-dark.svg" : "/logo-light.svg";
  const toggleVisibility = () => setIsVisible(!isVisible);
  const userContext = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!userContext) {
    throw new Error("UserContext must be used within a UserContextProvider");
  }

  const { email, firstname, birthday, setUser, onBoarding, setOnBoarding } =
    userContext;
  const [password, setPassword] = useState("");
  const [displayMessage, setDisplayMessage] = useState("");
  const message = "Le mot de passe est incorrect, veuillez réessayer.";
  const router = useRouter();

  const handlePasswordChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setPassword(e.target.value);
  };

  const handlePasswordCheck = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log("Début de la vérification du mot de passe"); // Ajout d'un log pour le début de la fonction
    try {
      console.log("Envoi de la requête à /api/users/check-password avec l'email:", email); // Log avant l'envoi de la requête
      const response = await fetch("/api/users/check-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("Réponse reçue avec le statut:", response.status); // Log du statut de la réponse
      if (response.status === 401) {
        console.log("Échec de l'authentification pour l'email:", email); // Log en cas d'échec d'authentification
        setDisplayMessage(message);
      } else if (response.status === 200) {
        const data = await response.json();
        console.log("Données reçues:", data); // Log des données reçues

        if (data.status === "ok") {
          console.log("Statut OK, mise à jour du contexte utilisateur et redirection"); // Log en cas de succès
          userContext.setToken(data.token);
          localStorage.setItem("userToken", data.token);

          console.log("Récupération des détails de l'utilisateur avec le token:", data.token); // Log avant la requête des détails de l'utilisateur
          const userResponse = await fetch("/api/users/details", {
            headers: {
              Authorization: `Bearer ${data.token}`,
            },
          });

          if (userResponse.ok) {
            const userData = await userResponse.json();
            console.log("Détails de l'utilisateur reçus:", userData); // Log des détails de l'utilisateur
            userContext.setUser({
              firstname: userData.firstname,
              email: userData.email,
              birthday: userData.birthday,
            });
          }
          setOnBoarding(data.onBoarding);
          if (data.onBoarding) {
            console.log("Redirection vers /today"); // Log de la redirection
            router.push("/today");
          } else {
            console.log("Redirection vers /onboarding"); // Log de la redirection
            router.push("/onboarding");
          }

          setUser({ email, firstname, birthday, setUser });
        }
      }
    } catch (error) {
      console.error("Erreur lors de la vérification du mot de passe:", error);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleForgotPasswordClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSendEmail = async () => {
    setIsLoading(true);
    try {
      console.log("Email for reset:", email);
      const response = await fetch('/api/users/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsModalOpen(false);
        console.log("Email de réinitialisation envoyé avec succès.");
      } else {
        const errorData = await response.json();
        console.error("Erreur lors de l'envoi de l'email de réinitialisation:", errorData.error);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email de réinitialisation:", error);
    } finally {
      setIsLoading(false);
    }
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
            className="flex flex-col items-center dark:bg-neutral-800 w-1/2 h-full justify-between p-8 "
          >
            <div
              id="desktopTitleContainer"
              className="flex flex-col items-center w-full mt-12"
            >
              <CardAppTitle title="Se connecter" size="big" />
              <CardAppText
                text="Saisissez votre mot de passe"
                icon={faUnlock}
              />
            </div>
            <form
              id="formContainer"
              onSubmit={handlePasswordCheck}
              className="flex flex-col justify-between items-center w-full mb-4"
            >
              <Input
                value={password}
                onChange={handlePasswordChange}
                isRequired
                size="md"
                type={isVisible ? "text" : "password"}
                label="Mot de passe"
                radius="lg"
                className="w-full mb-4 font-text"
                variant="bordered"
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <FontAwesomeIcon
                        icon={faEyeSlash}
                        className="ml-28 mb-1 text-xl text-default-400 pointer-events-none"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faEye}
                        className="ml-28 mb-1 text-xl text-default-400 pointer-events-none"
                      />
                    )}
                  </button>
                }
              />
              <div className="text-right w-full mb-4">
                <a
                  className="text-sm text-blue-500 hover:underline cursor-pointer"
                  onClick={handleForgotPasswordClick}
                >
                  Mot de passe oublié ?
                </a>
              </div>
              <Button
                type="submit"
                color="default"
                variant="solid"
                size="lg"
                className="w-full max-w-full pr-14 pl-14 font-bold font-text"
                onClick={handlePasswordCheck}
                disabled={password === ""}
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
        className="sm:hidden w-full h-full flex flex-col flex-grow justify-between items-center"
      >
        <div
          id="MailAuthMobileTop"
          className="flex flex-col items-center justify-center w-full"
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
            id="mobileTitleContainer"
            className="flex flex-col justify-center items-center w-full"
          >
            <CardAppTitle title="Se connecter" size="big" />
            <CardAppText text="Saisissez votre mot de passe" icon={faUnlock} />
          </div>
        </div>
        <form
          id="mobileFormContainer"
          onSubmit={handlePasswordCheck}
          className="flex flex-col items-center w-full"
        >
          <Input
            value={password}
            onChange={handlePasswordChange}
            isRequired
            size="lg"
            type={isVisible ? "text" : "password"}
            label="Mot de passe"
            radius="lg"
            className="mb-8 font-text w-10/12 mx-auto"
            variant="bordered"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <FontAwesomeIcon
                    icon={faEyeSlash}
                    className="ml-28 mb-1 text-xl text-default-400 pointer-events-none"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faEye}
                    className="ml-28 mb-1 text-xl text-default-400 pointer-events-none"
                  />
                )}
              </button>
            }
          />
          <div className="text-right w-full mb-4">
            <a
              className="text-sm text-blue-500 hover:underline cursor-pointer"
              onClick={handleForgotPasswordClick}
            >
              Mot de passe oublié ?
            </a>
          </div>
          <Button
            type="submit"
            color="default"
            variant="solid"
            size="lg"
            className="pr-14 pl-14 w-10/12 mx-auto mb-20 font-bold font-text"
            onClick={handlePasswordCheck}
            disabled={password === ""}
          >
            Suivant
          </Button>
        </form>
      </div>

      {/* Forgot Password Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalContent>
          <ModalHeader>
            Réinitialiser le mot de passe
          </ModalHeader>
          <ModalBody>
            <Input
              value={email || ""}
              isRequired
              size="md"
              type="email"
              label="Adresse e-mail"
              radius="lg"
              className="w-full mb-4 font-text"
              variant="bordered"
            />
          </ModalBody>
          <ModalFooter>
            <Button
              variant="light"
              onClick={handleCloseModal}
              className="mr-4"
            >
              Fermer
            </Button>
            <Button
              variant="solid"
              color="default"
              onClick={handleSendEmail}
              disabled={isLoading}
            >
              Envoyer
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ConnexionPage;
