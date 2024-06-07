"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import CardAppTitle from "../components/CardAppTitle";
import { useTheme } from "next-themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

const LoginMethod = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const logo = theme === "dark" ? "/logo-dark.svg" : "/logo-light.svg";

  const handleBack = () => {
    router.back();
  };

  return (
    <div
      id="mailAuthMainContainer"
      className="flex flex-col items-center justify-center w-full h-screen min-h-screen "
    >
      {/* Chevron for mobile */}
      <div
        id="chevronContainer"
        className="sm:hidden absolute top-0 left-0 flex flex-row justify-start items-center h-16 w-full p-4"
      >
        <FontAwesomeIcon icon={faChevronLeft} onClick={handleBack} />
      </div>

      {/* Logo for desktop */}
      <div
        id="logoContainer"
        className="hidden sm:flex flex-row justify-start items-center h-16 w-full relative p-4"
      >
        <Image
          src={logo}
          alt="logo"
          width={151}
          height={38}
          priority={true}
        />
      </div>
      {/* Mobile Version */}
      <div
        id="mobileVersion"
        className="flex flex-col items-center justify-center w-full sm:hidden"
      >
        <div className="flex flex-row justify-center items-center h-16 w-full relative p-4 mb-44 ">
          <Image
            src={logo}
            alt="logo"
            width={200}
            height={40}
            priority={true}
          />
        </div>
        <div className="sm:text ">
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
              className="w-80 mx-auto xs:w-60"
            >
              Par email
            </Button>
          </Link>
        </div>
      </div>

      {/* Desktop Version */}
      <div id="desktopVersion" className="hidden sm:flex w-16/20 lg:w-16/20 h-3/4 bg-white shadow-lg rounded-2xl flex-row items-start justify-between border-neutral-200 mx-auto my-auto">
        <div className="flex w-1/2 h-full relative">
          <Image
            src="/images/entryVisual.svg"
            alt="Entry Visual"
            width={400}
            height={600}
            className="object-cover w-full h-full rounded-tl-2xl rounded-bl-2xl"
          />
          <div className="absolute  top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h2 className="text-4xl sm:text-xl md:text-2xl  lg:text-4xl font-bold font-text text-cyan-900">Bienvenue</h2>
          </div>
        </div>
        <div className="flex flex-col items-center dark:bg-neutral-800 w-1/2 h-full justify-center dark:rounded-tr-2xl dark:rounded-br-2xl">
          <CardAppTitle title="Connectez-vous" size="big" />
          <div className="">
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
                className="md:w-52 mt-2"
              >
                Par email
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginMethod;
