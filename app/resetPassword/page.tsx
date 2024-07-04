"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@nextui-org/react";
import { faCheck, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import CardAppTitle from "../components/CardAppTitle";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "next-themes";
import React, { useState } from "react";
import Link from "next/link";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const router = useRouter();
  const { theme } = useTheme();
  const logo = theme === "dark" ? "/logo-dark.svg" : "/logo-light.svg";
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasStartedTyping, setHasStartedTyping] = useState(false);


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get('token');
    if (urlToken) {
      setToken(urlToken);
    }
  }, []);

  const passwordCriteria = [
    { validate: (password: string) => password.length >= 8, message: "8 caractères minimum" },
    { validate: (password: string) => /[A-Z]/.test(password), message: "Contient des lettres MAJUSCULES" },
    { validate: (password: string) => /[a-z]/.test(password), message: "Contient des lettres minuscules" },
    { validate: (password: string) => /\d/.test(password), message: "Contient 1 chiffre minimum" },
    { validate: (password: string) => /[!@#$%^&*(),.?":{}|<>]/.test(password), message: "Contient 1 caractère spécial minimum" },
  ];

  const areAllCriteriaMet = passwordCriteria.every(criteria => criteria.validate(password));

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setHasStartedTyping(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/users/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          password,
        }),
      });

      if (response.ok) {
        router.push("/login");
      } else {
        const data = await response.json();
        console.error("Failed to reset password:", data.error);
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const widthCondition = window.innerWidth >= 1280;
      const heightCondition = window.innerHeight >= 896;
      setShowLogo(widthCondition || heightCondition);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <div id="mailAuthMainContainer"
      className="flex flex-col items-center justify-center w-full h-full min-h-screen"
    >
      {/* Desktop version */}
      <div
        id="mailAuthDesktop"
        className="hidden sm:flex h-full w-full flex-col justify-center items-center"
      >
        {showLogo && (
          <Link href="/">
            <div
              id="logoContainer"
              className="absolute sm:top-0 sm:left-0 flex-row justify-start items-center h-16 w-full p-4 cursor-pointer"
            >
              <Image
                src={logo}
                alt="logo"
                width={151}
                height={38}
                priority={true}
              />
            </div>
          </Link>
        )}
        <div
          id="desktopVersion"
          className="hidden sm:flex w-16/20 lg:w-16/20 h-[600px] bg-white shadow-lg rounded-2xl items-center justify-center border-3 border-neutral-200 dark:border-neutral-600 mx-auto my-auto max-w-[800px] max-h-[600px] overflow-hidden"
        >
          <div
            id="desktopContentContainer"
            className="flex flex-col items-center dark:bg-neutral-800 w-1/2 h-full justify-between p-8 "
          >
            <div
              id="desktopTitleContainer"
              className="flex flex-col items-start w-full mt-12 "
            >
              <CardAppTitle title="Réinitialiser votre mot de passe" size="big" />
            </div>
            <form
              id="formContainer"
              onSubmit={handleSubmit}
              className="flex flex-col items-center w-full"
            >
              <Input
                label="Nouveau mot de passe"
                variant="bordered"
                placeholder="Nouveau mot de passe"
                value={password}
                onChange={handleChangePassword}
                required
                className="mb-2"
                type={isVisible ? "text" : "password"}
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <FontAwesomeIcon
                        icon={faEyeSlash}
                        className="text-2xl text-default-400 pointer-events-none"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faEye}
                        className="text-2xl text-default-400 pointer-events-none"
                      />
                    )}
                  </button>
                }

              />
              <div className="mt-4 mb-6 w-full">
                {passwordCriteria.map((criteria, index) => (
                  <div key={index} className="flex items-center">
                    <div className="pr-2 w-6 h-6">
                      {criteria.validate(password) ? (
                        <FontAwesomeIcon icon={faCheck} className="text-green-500 w-full h-full" />
                      ) : (
                        <div className="w-full h-full"></div>
                      )}
                    </div>
                    <p className={`text-xs ${criteria.validate(password) ? "text-green-500" : ""}`}>
                      {criteria.message}
                    </p>
                  </div>
                ))}
              </div>
              <Button
                type="submit"
                color="primary"
                className={`w-60 xs:w-64 2xs:w-72 3xs:w-80 font-bold font-text ${!areAllCriteriaMet ? "bg-gray-400 text-white" : "bg-blue-500 text-white"}`}
                disabled={!areAllCriteriaMet}
              >
                Réinitialiser le mot de passe
              </Button>
            </form>
          </div>
        </div>
      </div>
      {/* Mobile version */}
      <div
        id="mailAuthMobile"
        className="sm:hidden w-full h-full flex flex-col flex-grow justify-between items-center "
      >
        <div
          id="MailAuthMobileTop"
          className="flex flex-col items-center justify-center w-full "
        >
          <div
            id="chevronContainer"
            className="sm:hidden flex flex-row justify-start items-center h-16 w-full mt-4 xs:mt-6 2xs:mt-8 3xs:mt-10 sm:mt-16 ml-0"
          >
            <Link href="/">
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="text-neutral-800 dark:text-neutral-200 text-xs w-4 h-4 m-5 cursor-pointer"
            />
            </Link>
          </div>

          <div
            id="mobileTitleMainContainer"
            className="flex flex-col items-center justify-center w-full mt-4 xs:mt-6 2xs:mt-8 3xs:mt-10 sm:mt-12"
          >
            <div
              id="mobileTitleContainer"
              className="flex flex-col items-start"
            >
              <CardAppTitle title="Réinitialiser votre mot de passe" size="big" />
            </div>
          </div>
        </div>
        <div
          id="mailAuthMobileBottom"
          className="flex flex-col items-center pb-4 xs:pb-24 2xs:pb-24 3xs:pb-24 sm:pb-24"
        >
          <form
            id="formContainer"
            onSubmit={handleSubmit}
            className="flex flex-col items-center w-full"
          >
            <div
              id="mobileInputContainer"
              className="w-full pb-10 xs:pb-12 2xs:pb-16 3xs:pb-20 sm:pb-32"
            >
              <Input
                label="Nouveau mot de passe"
                variant="bordered"
                placeholder="Nouveau mot de passe"
                value={password}
                onChange={handleChangePassword}
                required
                type={isVisible ? "text" : "password"}
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <FontAwesomeIcon
                        icon={faEyeSlash}
                        className="text-2xl text-default-400 pointer-events-none"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faEye}
                        className="text-2xl text-default-400 pointer-events-none"
                      />
                    )}
                  </button>
                }
              />
              <div className="mt-4 mb-6 w-full">
                {passwordCriteria.map((criteria, index) => (
                  <div key={index} className="flex items-center">
                    <div className="pr-2 w-6 h-6">
                      {criteria.validate(password) ? (
                        <FontAwesomeIcon icon={faCheck} className="text-green-500 w-full h-full" />
                      ) : (
                        <div className="w-full h-full"></div>
                      )}
                    </div>
                    <p className={`text-xs ${criteria.validate(password) ? "text-green-500" : ""}`}>
                      {criteria.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div id="mobileButtonContainer" className="">
              <Button
                type="submit"
                color="default"
                variant="solid"
                size="lg"
                className={`w-60 xs:w-64 2xs:w-72 3xs:w-80 font-bold font-text ${!areAllCriteriaMet ? "bg-gray-400 text-white" : "bg-blue-500 text-white"}`}
                disabled={!areAllCriteriaMet}
              >
                Réinitialiser le mot de passe
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


export default ResetPassword;



