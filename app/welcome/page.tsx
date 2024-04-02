"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import CardAppTitle from "../components/CardAppTitle";
import { useTheme } from "next-themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Welcome = () => {
  const { theme } = useTheme();
  const logo = theme === "dark" ? "/logo-dark.svg" : "/logo-light.svg";

  return (
    <div
      id="welcomeMainContainer"
      className="flex flex-col justify-around items-center w-full h-screen h-min-screen"
    >
      <div
        id="welcomeLogoContainer"
        className="flex flex-row justify-start items-center h-16 w-full relative"
      >
        <Image
          src={logo}
          alt="logo"
          fill
          // objectFit="contain"
          priority={true}
          className="absolute"
        />
      </div>
      <div
        id="welcomeTitleHintContainer"
        className="flex flex-col items-center w-full"
      >
        <CardAppTitle title="Connectez-vous" />
        <Link href="/mailauth">
          <Button
            color="default"
            variant="solid"
            size="lg"
            startContent={
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-neutral-800 dark:text-neutral-200 text-md"
              />
            }
            className="w-80"
          >
            Par email
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
