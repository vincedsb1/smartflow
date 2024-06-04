import React, { FC, useEffect, useState, ChangeEvent } from "react";
import Image from "next/image";
import ButtonConnexion from "./ButtonConnexion";
import ButtonTheme from "./ButtonTheme";
import { useTheme } from "next-themes";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Input } from "@nextui-org/input";

const Header: FC = () => {
  const { theme } = useTheme();
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const { isOpen, onOpen, onClose: close } = useDisclosure();
  const [email, setEmail] = useState<string>("");
  const [isEmailSaved, setIsEmailSaved] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const logoSrc =
    windowWidth < 390
      ? "/logoOnly.svg"
      : theme === "dark"
        ? "/logo-dark.svg"
        : "/logo-light.svg";

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleEmailSubmit = async () => {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

    if (!emailRegex.test(email)) {
      console.error("Invalid email format");
      return;
    }

    const response = await fetch("/api/prospects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData);
      return;
    }

    setIsEmailSaved(true);
  };

  const handleClose = () => {
    close();
    setIsEmailSaved(false);
    setEmail("");
  };

  return (
    <div id="headerContainer" className="flex dark:bg-neutral-800 dark:bg-opacity-60 items-center justify-between h-16 bg-white bg-opacity-60 backdrop-filter backdrop-blur-lg">
      <div className="flex h-10 w-32 relative 2xs:ml-4 flex-row justify-start ">
        <Image
          id="logoHeader"
          src={logoSrc}
          alt="Logo"
          layout="fill"
          objectFit="contain"
        ></Image>
      </div>
      <div className="flex items-center">
        <div className="mr-2">
          <Button color="primary" onClick={onOpen} className="px-8" radius="lg">Rejoignez la liste d&apos;attente</Button>
        </div>
        <ButtonConnexion label="Connexion" />
        <ButtonTheme />
      </div>

      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Être averti de la sortie</ModalHeader>
          <ModalBody>
            {!isEmailSaved && <p>Saisissez votre email et soyez informé.e dès que Smartflow est disponible</p>}
            {isEmailSaved ? (
              <p>Merci, vous allez recevoir un mail pour valider votre adresse en attendant la sortie !</p>
            ) : (
              <Input
                type="email"
                placeholder="Votre email"
                value={email}
                onChange={handleEmailChange}
                className="mb-4 rounded w-full"
              />
            )}
          </ModalBody>
          <ModalFooter>
            {isEmailSaved ? (
              <Button color="primary" radius="lg" onClick={handleClose}>Fermer</Button>
            ) : (
              <>
                <Button radius="lg" onClick={handleClose}>Annuler</Button>
                <Button radius="lg" color="primary" onClick={handleEmailSubmit}>Confirmer</Button>
              </>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Header;
