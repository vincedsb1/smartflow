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

const ConnexionPage = () => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("UserContext must be used within a UserContextProvider");
  }
  
  const { email, firstname, birthday } = userContext;

  // Log the values
  console.log('Email:', email);
  console.log('Prénom:', firstname);
  console.log('Date de naissance:', birthday);

  const [password, setPassword] = useState("");

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

      const data = await response.json();

      if (data.status === "ok") {
        router.push("/onboarding");
      } else {
        alert("Mot de passe incorrect");
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
        <CardAppPasswordInput onChange={handlePasswordChange} />
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
