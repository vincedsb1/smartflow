"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import CardAppTitle from "../components/CardAppTitle";
import { useTheme } from "next-themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const LoginMethod = () => {
  const { theme } = useTheme();
  const logo = theme === "dark" ? "/logo-dark.svg" : "/logo-light.svg";

  return (
    <div
      id="welcomeMainContainer"
      className="flex flex-col items-center justify-center 3xs:justify-start w-full h-screen min-h-screen"
    >
      {/* Logo pour les écrans de bureau */}
      <div
        id="welcomeLogoContainer"
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
        id="welcomeTitleHintContainer"
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
          <div>
            <CardAppTitle title="Connectez-vous" />
          </div>
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
      {/* Version desktop */}
      <div
        id="welcomeTitleHintContainerDesktop"
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
              className="w-full mt-4 max-w-full pr-14 pl-14"
            >
              Par email
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginMethod;
