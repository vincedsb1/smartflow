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

const ConnexionPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();
  const logo = theme === "dark" ? "/logo-dark.svg" : "/logo-light.svg";
  const toggleVisibility = () => setIsVisible(!isVisible);
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("UserContext must be used within a UserContextProvider");
  }

  const { email, firstname, birthday, setUser, onBoarding, setOnBoarding } =
    userContext;
  const [password, setPassword] = useState("");
  const [displayMessage, setDisplayMessage] = useState("");
  const message = "Le mot de passe est incorrect, veuillez réessayer.";
  const router = useRouter();

  const handlePasswordChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPassword(e.target.value);
  };

  const handlePasswordCheck = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/users/check-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 401) {
        setDisplayMessage(message);
      } else if (response.status === 200) {
        const data = await response.json();

        if (data.status === "ok") {
          userContext.setToken(data.token);
          localStorage.setItem("userToken", data.token);

          const userResponse = await fetch("/api/users/details", {
            headers: {
              Authorization: `Bearer ${data.token}`,
            },
          });

          if (userResponse.ok) {
            const userData = await userResponse.json();
            userContext.setUser({
              firstname: userData.firstname,
              email: userData.email,
              birthday: userData.birthday,
            });
          }
          setOnBoarding(data.onBoarding);
          if (data.onBoarding) {
            router.push("/today");
          } else {
            router.push("/onboarding");
          }

          setUser({ email, firstname, birthday, setUser });
        }
      }
    } catch (error) {}
  };

  const handleBack = () => {
    router.back();
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
            id="mobileTitleMainContainer"
            className="flex flex-col items-center justify-center w-full mt-4 xs:mt-6 2xs:mt-8 3xs:mt-10 sm:mt-12"
          >
            <div
              id="mobileTitleContainer"
              className="flex flex-col items-start"
            >
              <CardAppTitle title="Se connecter" size="big" />
              <div
                id="mobileTextContainer"
                className="w-60 xs:w-64 2xs:w-72 3xs:w-80 mb-10"
              >
                <CardAppText
                  text="Saisissez votre mot de passe"
                  icon={faUnlock}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          id="mailAuthMobileBottom"
          className="flex flex-col items-center pb-4 xs:pb-24 2xs:pb-24 3xs:pb-24"
        >
          <form
            id="formContainer"
            onSubmit={handlePasswordCheck}
            className="flex flex-col justify-between items-center w-full"
          >
            <Input
              value={password}
              onChange={handlePasswordChange}
              isRequired
              size="md"
              type={isVisible ? "text" : "password"}
              label="Mot de passe"
              radius="lg"
              className="w-64 xs:w-72 2xs:w-80 3xs:w-80 mb-4 font-text"
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
            <Button
              type="submit"
              color="default"
              variant="solid"
              size="lg"
              className="w-64 xs:w-72 2xs:w-80 3xs:w-80 pr-14 pl-14 font-bold font-text"
              onClick={handlePasswordCheck}
              disabled={password === ""}
            >
              Suivant
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConnexionPage;
