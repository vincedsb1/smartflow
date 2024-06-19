"use client";
import React, { useEffect, useState, ChangeEvent } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Input } from "@nextui-org/input";
import { Spinner } from "@nextui-org/spinner";

interface ButtonConnexionProps {
  label: string;
  labelSmall: string;
}

const ButtonConnexion: React.FC<ButtonConnexionProps> = ({
  label,
  labelSmall,
}) => {
  const router = useRouter();

  const handleNavigation = () => {
    router.push("/login");
  };

  const { isOpen, onOpen, onClose: close } = useDisclosure();
  const [email, setEmail] = useState<string>("");
  const [isEmailSaved, setIsEmailSaved] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleEmailSubmit = async () => {
    setIsLoading(true);
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

    if (!emailRegex.test(email)) {
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
      return;
    }

    setIsEmailSaved(true);
    setIsLoading(false);
  };

  const handleClose = () => {
    close();
    setIsEmailSaved(false);
    setEmail("");
  };

  return (
    <div>
      <Button
        onClick={onOpen}
        id="buttonConnexion"
        color="primary"
        className="xs:hidden bg-cyan-950 dark:bg-cyan-100 text-white dark:text-cyan-950"
        size="lg"
      >
        {labelSmall}
      </Button>
      <Button
        onClick={onOpen}
        id="buttonConnexion"
        color="primary"
        className="hidden xs:block bg-cyan-950 dark:bg-cyan-100 text-white dark:text-cyan-950"
        size="lg"
      >
        {label}
      </Button>
      {/* <Button
        onClick={handleNavigation}
        id="buttonConnexion"
        color="primary"
        className="xs:hidden bg-cyan-950 dark:bg-cyan-100 text-white"
        size="lg"
      >
        {labelSmall}
      </Button>
      <Button
        onClick={handleNavigation}
        id="buttonConnexion"
        color="primary"
        className="hidden xs:block bg-cyan-950 dark:bg-cyan-100 text-white"
        size="lg"
      >
        {label}
      </Button> */}

      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Soyez les premiers à découvrir Smartflow !
          </ModalHeader>
          <ModalBody>
            {!isEmailSaved && (
              <p>
                Ne manquez pas le lancement ! Inscrivez-vous et recevez un accès
                prioritaire dès que Smartflow sera disponible.
              </p>
            )}
            {isEmailSaved ? (
              <>
                <p>
                  Merci ! Dernière étape pour être averti de la sortie de
                  SmartFlow :{" "}
                </p>
                <p>Veuillez cliquer sur le lien envoyé sur votre email.</p>
              </>
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

export default ButtonConnexion;
