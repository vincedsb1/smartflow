"use client";
import React, { useEffect, useState } from "react";
import CardAppText from "../components/CardAppText";
import CardAppTitle from "../components/CardAppTitle";
import MainButton from "../components/MainButton";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import InputBirthday from "../components/InputBirthday";
import { useUser } from "../context/UserContext";

const InscriptionPage = () => {
  const router = useRouter();
  const {
    user,
    setUser,
    email,
    setEmail,
    firstname,
    setFirstname,
    birthday,
    setBirthday,
  } = useUser();

  useEffect(() => {
    console.log("Prénom stocké:", firstname);
    console.log("Email stocké:", email);
  }, [firstname, email]);

  const handleContinue = () => {
    console.log("Date de naissance stockée:", birthday);
    setUser({ ...user, email, firstname, birthday });
    router.push("/register-password");
  };


  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div>
        <Link href={"/register-firstname"}>
          <button type="button" className="absolute top-0 left-0 mt-12 ml-6">
            <FontAwesomeIcon icon={faChevronLeft} className="h-6" />
          </button>
        </Link>
      </div>
      <div className="flex flex-col">
        <CardAppTitle title="Votre Profil" />
        <CardAppText
          text="Quelle est votre date de naissance ?"
          icon={faUser}
        />
      </div>
      <div>
        <InputBirthday
          label="Date de naissance"
          inputType="date"
          onChange={(date) => {
            console.log("Date sélectionnée:", date);
            setBirthday(
              date ? new Date(date.toISOString().substring(0, 10)) : null
            );
          }}
        />
      </div>
      <div className="mt-64 flex flex-col items-center">
        <div className="flex justify-center">
          <MainButton
            label="Continuer"
            type="normal"
            onClick={handleContinue}
          />{" "}
        </div>
      </div>
    </div>
  );
};

export default InscriptionPage;
