"use client";
import React, { useContext, useState } from "react";
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

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const router = useRouter();

  const handlePasswordCheck = async () => {
    console.log("handlePasswordCheck called");
    try {
      console.log("Sending request to /api/users/check-password");
      const response = await fetch("/api/users/check-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("Response received from /api/users/check-password", response);

      if (response.status === 401) {
        console.log("Password incorrect");
        setDisplayMessage(message);
      } else if (response.status === 200) {
        console.log("Password correct");
        const data = await response.json();

        if (data.status === "ok") {
          console.log("Token received from API (Page connexion):", data.token);
          userContext.setToken(data.token);
          console.log("Token set in userContext");

          const userResponse = await fetch("/api/users/details", {
            headers: {
              Authorization: `Bearer ${data.token}`,
            },
          });

          if (userResponse.ok) {
            const userData = await userResponse.json();
            console.log("User data received from API:", userData);
            userContext.setUser({
              firstname: userData.firstname,
              email: userData.email,
              birthday: userData.birthday,
            });
            console.log("User set in userContext:", userData);
            console.log("User id:", userData.id);
          }
          console.log("Value of data.onBoarding:", data.onBoarding);
          setOnBoarding(data.onBoarding);
          if (data.onBoarding) {
            router.push("/today");
            console.log("Redirected to /today");
          } else {
            router.push("/onboarding");
            console.log("Redirected to /onboarding");
          }

          setUser({ email, firstname, birthday, setUser });
          console.log("User set");
        }
      }
    } catch (error) {
      console.error("Error in handlePasswordCheck", error);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div
      id="mailAuthMainContainer"
      className="flex flex-col items-center justify-center w-full h-screen min-h-screen"
    >
      {/* Desktop */}
      <div
        id="logoContainer"
        className="sm:flex hidden flex-row justify-start items-center h-16 w-full relative p-4"
      >
        <Image src={logo} alt="logo" width={151} height={38} priority={true} />
      </div>
      {/* Mobile */}
      <div
        id="chevronContainer"
        className="sm:hidden flex flex-row justify-start items-center h-16 w-full relative p-4"
      >
        <FontAwesomeIcon icon={faChevronLeft} onClick={handleBack} />
      </div>
      {/* Mobile Version */}
      <div
        id="mobileVersion"
        className="flex flex-col items-center justify-center w-full sm:hidden h-screen mt-36 3xs:m-0"
      >
        <div className="flex flex-col items-center justify-center h-full ">
          <div className="flex flex-col items-start justify-center w-full p-4 ">
            <CardAppTitle title="Se connecter" size="big" />
            <div className="w-80 mb-10">
              <CardAppText
                text="Saisissez votre mot de passe"
                icon={faUnlock}
              />
            </div>
            <form
              onSubmit={handlePasswordCheck}
              className="flex flex-col items-center w-full mt-4"
            >
              <Input
                value={password}
                onChange={handlePasswordChange}
                isRequired
                size="md"
                type={isVisible ? "text" : "password"}
                label="Mot de passe"
                radius="lg"
                className="w-80 mb-60 mt-16 font-text"
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
              <div className="mt-18 3xs:mb-16">
                <Button
                  type="submit"
                  color="primary"
                  variant="solid"
                  size="lg"
                  className="w-80 font-bold font-text"
                  onClick={handlePasswordCheck}
                  disabled={password === ""}
                >
                  Suivant
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Desktop Version */}
      <div
        id="desktopVersion"
        className="hidden sm:flex w-16/20 lg:w- h-3/4 bg-white shadow-lg rounded-2xl flex-row items-start justify-between border-neutral-200 dark:border-neutral-700 mx-auto my-auto overflow-hidden border-3"
      >
        <div className="flex w-1/2 h-full relative">
          <Image
            src="/images/entryVisual.svg"
            alt="Entry Visual"
            width={400}
            height={600}
            className="object-cover w-full h-full rounded-tl-2xl rounded-bl-2xl brightness-90"
          />
          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h2 className="text-4xl font-bold font-text text-cyan-900">
              Bienvenue
            </h2>
          </div>
        </div>
        <div className="flex flex-col items-center dark:bg-neutral-800 w-1/2 h-full justify-between p-8 ">
          <div className="flex flex-col items-center w-full mt-12">
            <CardAppTitle title="Se connecter" size="big" />
            <CardAppText text="Saisissez votre mot de passe" icon={faUnlock} />
          </div>
          <form
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
  );
};

export default ConnexionPage;
