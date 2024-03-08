"use client";
import React from "react";
import Link from "next/link";

import CardAppTitle from "../components/CardAppTitle";
import CardAppText from "../components/CardAppText";
import CardAppPasswordInput from "../components/CardAppPasswordInput";
import MainButton from "../components/MainButton";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { ChangeEvent } from "react";

const InscriptionPage = () => {
  const [password, setPassword] = useState("");

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
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
      <div className="mt-64"></div>
      <div className="">
        <MainButton
          label="Continuer"
          type={password ? "normal" : "disabled"}
          buttonType="submit"
          disabled={!password}
        />
      </div>
    </div>
  );
};

export default InscriptionPage;
