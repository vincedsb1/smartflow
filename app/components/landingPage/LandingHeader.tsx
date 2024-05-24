import React, { useEffect, useState } from "react";
import Image from "next/image";
import ButtonConnexion from "./ButtonConnexion";
import ButtonTheme from "./ButtonTheme";
import { useTheme } from "next-themes";

const Header = () => {
  const { theme } = useTheme();
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Ajout de l'écouteur d'événement
    window.addEventListener("resize", handleResize);
    // Appel initial pour définir la largeur initiale
    handleResize();

    // Nettoyage de l'écouteur d'événement
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Détermination de la source de l'image en fonction de la largeur de la fenêtre et du thème
  const logoSrc =
    windowWidth < 390
      ? "/logoOnly.svg"
      : theme === "dark"
      ? "/logo-dark.svg"
      : "/logo-light.svg";

  return (
    <div
      id="headerContainer"
      className="flex dark:bg-neutral-800 dark:bg-opacity-60 items-center justify-between h-16 bg-white bg-opacity-60 backdrop-filter backdrop-blur-lg"
    >
      <div className="flex h-10 w-32 relative 2xs:ml-4 flex-row justify-start ">
        <Image
          id="logoHeader"
          src={logoSrc}
          alt="Logo"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className="flex items-center">
        <ButtonConnexion label="Connexion" />
        <ButtonTheme />
      </div>
    </div>
  );
};

export default Header;
