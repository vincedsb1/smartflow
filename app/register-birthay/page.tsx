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

// Page d'inscription - Date de naissance
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

  // Affichage des données stockées
  useEffect(() => {
  }, [firstname, email]);

  // Fonction de redirection vers la page suivante
  const handleContinue = () => {
    if (!birthday) {
      alert("Veuillez sélectionner une date de naissance.");
      return;
    }
    const formattedBirthday = `${("0" + birthday.getDate()).slice(-2)}/${("0" + (birthday.getMonth() + 1)).slice(-2)}/${birthday.getFullYear()}`;
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/;
    console.log("Date de naissance formatée:", formattedBirthday);
    if (formattedBirthday && dateRegex.test(formattedBirthday)) {
      setUser({ ...user, email, firstname, birthday });
      router.push("/register-password");
    } else {
      alert("La date de naissance doit être au format JJ/MM/AAAA");
      return;
    }
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
