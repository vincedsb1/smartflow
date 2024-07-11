import React, { FC, useEffect, useState, useRef, ChangeEvent } from "react";
import Image from "next/image";
import ButtonConnexion from "./ButtonConnexion";
import ButtonTheme from "./ButtonTheme";
import { useTheme } from "next-themes";
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

const Header: FC = () => {
  const { theme } = useTheme();
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const [isEmailSaved, setIsEmailSaved] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { isOpen, onOpen, onClose: close } = useDisclosure();
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const determineLogoSrc = (): string => {
    if (windowWidth < 390) return "/logoOnly.svg";
    return theme === "dark" ? "/logo-dark.svg" : "/logo-light.svg";
  };

  const logoSrc = determineLogoSrc();

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);

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
      id="headerContainer"
      className="flex dark:bg-neutral-800 dark:bg-opacity-60 items-center justify-between h-16 bg-white bg-opacity-60 backdrop-filter backdrop-blur-lg"
    >
      <div
        id="logoContainer"
        className="flex h-10 w-32 relative ml-2 2xs:ml-4 flex-row justify-start"
      >
        <Image
          id="logoHeader"
          src={logoSrc}
          alt="Logo"
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
      <div id="buttonContainer" className="flex items-center">
        <div id="waitlistButtonContainer" className="mx-2 hidden">
          <Button
            color="primary"
            onClick={onOpen}
            className="2xs:hidden px-4"
            radius="lg"
          >
            Wait List
          </Button>
          <Button
            color="primary"
            onClick={onOpen}
            className="hidden 2xs:block 3xs:hidden px-8"
            radius="lg"
          >
            Liste d&apos;attente
          </Button>
          <Button
            color="primary"
            onClick={onOpen}
            className="hidden 3xs:block px-8"
            radius="lg"
          >
            Rejoignez la liste d&apos;attente
          </Button>
        </div>
        <div id="connexionButtonContainer" className="hidden 3xs:block">
          <ButtonConnexion label="Connexion" />
        </div>
        <ButtonTheme />
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

export default Header;
