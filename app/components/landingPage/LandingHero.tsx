"use client";

import React, { useEffect, useState, ChangeEvent, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import Title from "./Title";
import { FlipWords } from "../landingPage/flip-words";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import { Spinner } from "@nextui-org/spinner";

const Hero = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { isOpen, onOpen, onClose: close } = useDisclosure();
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleNavigation = () => {
    router.push("/login");
  };

  const words = ["mieux", "efficacement", "rapidement", "durablement"];

  const [email, setEmail] = useState<string>("");
  const [isEmailSaved, setIsEmailSaved] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleEmailSubmit = async () => {
    setIsLoading(true);
    setErrorMessage(""); // Reset the error message
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

    if (!emailRegex.test(email)) {
      setErrorMessage("Format de l'email invalide.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/prospects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 409) {
          setErrorMessage("Vous êtes déjà inscrit à dans la liste d'attente.");
        } else {
          setErrorMessage(
            "Une erreur s'est produite lors de l'enregistrement de l'email."
          );
        }
      } else {
        setIsEmailSaved(true);
      }
    } catch (error) {
      console.error("Error occurred during email submission:", error); // Debug log
      setErrorMessage(
        "Une erreur s'est produite lors de l'enregistrement de l'email."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    close();
    setIsEmailSaved(false);
    setEmail("");
    setErrorMessage(""); // Reset the error message when closing the modal
  };

  return (
    <div
      id="containerHero"
      className="w-full relative flex flex-row items-center align-middle h-full py-16 lg:py-20 xl:py-24 lg:h-full "
    >
      <video
        className="w-full h-full opacity-30 absolute top-0 left-0 object-cover "
        autoPlay
        loop
        muted
      >
        <source src="/clipstudent.mp4" type="video/mp4" />
      </video>
      <div
        id="containerTitleTextButton"
        className="sm:w-1/2 max-w-[925px] flex flex-col justify-center sm:justify-center text-center sm:text-left relative h-full align-middle mx-4 sm:mx-10 lg:mx-20"
      >
        <div id="containerHeroTitle" className="mb-6 md:mb-8">
          <div
            className={`flex flex-col justify-center font-title font-bold font-primary stroke-primary`}
            id="titleLabel"
          >
            <p className="text-3xl 2xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-cyan-900 dark:text-cyan-500 break-words">
              Le hack ultime pour apprendre
            </p>
            <span className="text-3xl 2xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-cyan-900 dark:text-cyan-500 break-words whitespace-nowrap">
              {isClient && <FlipWords words={words} />}
              <span>&nbsp;!</span>
            </span>
          </div>
        </div>
        <div id="containerHeroSubTitle" className="mb-6 md:mb-8 ">
          <p className="text-cyan-950 dark:text-neutral-300 text-lg 2xs:text-xl 3xs:text-2xl md:text-3xl font-title ">
            SmartFlow vous fait apprendre à petites doses. La méthode la plus
            efficace, tout simplement.
          </p>
        </div>
        <div
          id="containerHeroButton"
          className="w-full flex flex-row justify-center sm:justify-start"
        >
          <Button
            className="bg-cyan-950 dark:bg-cyan-100 text-white w-40 xs:w-60 dark:text-cyan-950 2xs:hidden"
            onClick={handleNavigation}
            size="sm"
            isDisabled={false}
          >
            <FontAwesomeIcon icon={faRocket} className="" />
            &nbsp;Let&apos;s go
          </Button>
          <Button
            className="bg-cyan-950 dark:bg-cyan-100 text-white w-40 xs:w-60 dark:text-cyan-950 hidden 2xs:block"
            onClick={handleNavigation}
            size="lg"
            isDisabled={false}
          >
            <FontAwesomeIcon icon={faRocket} className="" />
            &nbsp;Let&apos;s go
          </Button>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Soyez les premiers à découvrir Smartflow !
          </ModalHeader>
          <ModalBody>
            {!isEmailSaved && (
              <>
                <p>
                  Ne manquez pas le lancement ! Inscrivez-vous et recevez un
                  accès prioritaire dès que Smartflow sera disponible.
                </p>
                <Input
                  ref={inputRef}
                  type="email"
                  placeholder="Votre email"
                  value={email}
                  onChange={handleEmailChange}
                  className="mb-4 rounded w-full"
                />
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
              </>
            )}
            {isEmailSaved && (
              <>
                <p>
                  Merci ! Dernière étape pour être averti de la sortie de
                  SmartFlow :{" "}
                </p>
                <p>Veuillez cliquer sur le lien envoyé sur votre email.</p>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            {isEmailSaved ? (
              <Button color="primary" radius="lg" onClick={handleClose}>
                OK
              </Button>
            ) : (
              <>
                <Button radius="lg" onClick={handleClose}>
                  Annuler
                </Button>
                {isLoading ? (
                  <div style={{ width: "100px", textAlign: "center" }}>
                    <Spinner />
                  </div>
                ) : (
                  <Button
                    radius="lg"
                    color="primary"
                    onClick={handleEmailSubmit}
                  >
                    Confirmer
                  </Button>
                )}
              </>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Hero;
