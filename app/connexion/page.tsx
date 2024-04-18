"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import CardAppTitle from "../components/CardAppTitle";
import CardAppText from "../components/CardAppText";
import { UserContext } from "../context/UserContext";
import { Button } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faUnlock } from "@fortawesome/free-solid-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Input } from "@nextui-org/react";

const ConnexionPage = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("UserContext must be used within a UserContextProvider");
  }

  const { email, firstname, birthday, setUser, onBoarding, setOnBoarding } = userContext;
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
          console.log("Token set in userContext"); // Log after setting the token in userContext
        
          const userResponse = await fetch('/api/users/details', {
            headers: {
              Authorization: `Bearer ${data.token}`,
            },
          });
        
          if (userResponse.ok) {
            const userData = await userResponse.json();
            console.log("User data received from API:", userData); // Log the user data
            userContext.setUser({
              firstname: userData.firstname,
              email: userData.email,
              birthday: userData.birthday
            }); // Set user data in the context
            console.log("User set in userContext:", userData);
            console.log("User id:", userData.id);
          }
          // Log the value of data.onBoarding
          console.log("Value of data.onBoarding:", data.onBoarding);
        
          // Set onBoarding state
          setOnBoarding(data.onBoarding);
        
          // Redirect user based on onBoarding state
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


  return (
    <div
      id="connexionMainContainer"
      className="flex flex-col justify-between min-h-screen w-full "
    >
      <div
        id="connexionTopContainer"
        className="flex flex-col justify-center w-full"
      >
        <div id="themeSwitcherBackIcon" className="w-full flex flex-col mt-16">
          <Link href="/welcome">
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="text-neutral-800 dark:text-neutral-200 text-xs w-4 h-4 m-5"
            />
          </Link>
        </div>
        <div
          id="connexionHeaderContainer"
          className="flex flex-col justify-center items-center w-full"
        >
          <div id="connexionTitle" className="flex flex-col mt-10 w-16/20 ">
            <CardAppTitle title="Se connecter" />
          </div>
          <div
            id="connexionHint"
            className="flex flex-col items-center w-16/20"
          >
            <CardAppText text="Saissisez votre mot de passe" icon={faUnlock} />
          </div>
        </div>
      </div>
      <div
        id="connexionBottomContainer"
        className="flex flex-col justify-center items-center mb-14 "
      >
        <div className="flex flex-col justify-between items-center w-16/20">
          <div id="connexionInputContainer" className="w-full mb-1">
            <Input
              size="md"
              className="font-text"
              radius="lg"
              type={isVisible ? "text" : "password"}
              label="Mot de passe"
              value={password}
              onChange={handlePasswordChange}
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
              fullWidth={true}
            />
          </div>
          <div id="connexionMessageContainer" className="mb-32 h-9 w-full ml-5">
            {displayMessage && (
              <p className="text-red-500 text-xs font-text">{displayMessage}</p>
            )}
          </div>
        </div>
        <div className="flex items-center w-16/20"></div>
        <div
          id="connexionCGUContainer"
          className="flex flex-row w-16/20 justify-start"
        ></div>
        <Button
          type="submit"
          color="primary"
          variant="solid"
          size="lg"
          className="w-80 font-bold font-text"
          onClick={handlePasswordCheck}
          isDisabled={password === ""}
        >
          Suivant
        </Button>
      </div>
    </div>
  );
};

export default ConnexionPage;
