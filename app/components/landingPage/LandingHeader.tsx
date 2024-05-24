import React, { useEffect, useState } from "react";
import Image from "next/image";
import ButtonConnexion from "./ButtonConnexion";
import ButtonTheme from "./ButtonTheme";
import { useTheme } from "next-themes";

const Header = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      id="headerContainer"
      className="flex dark:bg-neutral-800 dark:bg-opacity-60  items-center justify-between h-16 bg-white bg-opacity-60 backdrop-filter backdrop-blur-lg"
    >
      <div className="flex h-16 w-20 relative">
        <Image
          id="logoHeader"
          src={theme === "dark" ? "/logo-dark.svg" : "/logo-light.svg"}
          alt="Logo"
          className="absolute"
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
