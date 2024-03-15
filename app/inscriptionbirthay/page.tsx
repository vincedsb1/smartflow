"use client";
import React from "react";
import CardAppText from "../components/CardAppText";
import CardAppTitle from "../components/CardAppTitle";
import MainButton from "../components/MainButton";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import InputNameBirthday from "../components/InputNameBirthday";

const InscriptionPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div>
        <Link href={"/inscriptionfirstname"}>
          <button type="button" className="absolute top-0 left-0 mt-12 ml-6">
            <FontAwesomeIcon icon={faChevronLeft} className="h-6" />
          </button>
        </Link>
      </div>
      <div className="flex flex-col">
        <CardAppTitle title="Votre Profil" />
        <CardAppText text="Quelle est votre date de naissance ?" size="large" />
      </div>
      <div>
        <InputNameBirthday label="Date de naissance" inputType="date" />
      </div>
      <div className="mt-64 flex flex-col items-center">
        <div className="flex justify-center">
          <MainButton
            label="Continuer"
            type="normal"
            onClick={() => router.push("/inscriptionbirthay")}
          />{" "}
        </div>
      </div>
    </div>
  );
};

export default InscriptionPage;
