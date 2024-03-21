"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import CardAppTitle from "../components/CardAppTitle";
import CardAppText from "../components/CardAppText";
import CardAppPasswordInput from "../components/CardAppPasswordInput";
import MainButton from "../components/MainButton";
import { UserContext } from "../context/UserContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const ConnexionPage = () => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("UserContext must be used within a UserContextProvider");
  }

  const { email, firstname, birthday, setUser } = userContext;

  const [password, setPassword] = useState("");
  const [displayMessage, setDisplayMessage] = useState("");
  const message = "Le mot de passe est incorrect, veuillez réessayer";
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const router = useRouter();

  const handlePasswordCheck = async () => {
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
      } else {
        const data = await response.json();
  
        if (data.status === "ok") {
          userContext.setToken(data.token);
  
          setUser({ email, firstname, birthday, setUser });
          router.push("/onboarding");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div>
        <Link href={"/mailauth"}>
          <button type="button" className="absolute top-0 left-0 mt-12 ml-6">
            <FontAwesomeIcon icon={faChevronLeft} className="h-6" />
          </button>
        </Link>
      </div>
      <div className="flex flex-col">
        <CardAppTitle title="Se connecter" />
        <CardAppText
          text="Saissisez votre mot de passe"
          icon={faEnvelope}
          size="large"
        />
      </div>
      <div className="mt-6">
        <div className="relative">
          <input
            className="bg-white rounded-2xl p-2 w-80 h-12 mb-1 pr-10 font-quicksand tracking-widest"
            type={passwordVisible ? "text" : "password"}
            onChange={handlePasswordChange}
          />
          <div
            className="absolute top-2 right-2"
            onClick={togglePasswordVisibility}
          >
            {passwordVisible ? (
              <FontAwesomeIcon icon={faEyeSlash} />
            ) : (
              <FontAwesomeIcon icon={faEye} />
            )}
          </div>
        </div>
        {displayMessage && (
          <p className="text-red-500 text-base font-normal">{displayMessage}</p>
        )}
      </div>

      <div className="mt-64">
        {" "}
        <MainButton
          label="Continuer"
          type={password ? "normal" : "disabled"}
          buttonType="submit"
          disabled={!password}
          onClick={handlePasswordCheck}
        />
      </div>
    </div>
  );
};

export default ConnexionPage;
