"use client";
import React from "react";
import CardAppText from "../components/CardAppText";
import CardAppTitle from "../components/CardAppTitle";
import MainButton from "../components/MainButton";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useRouter } from "next/navigation";

const InscriptionPage = () => {
  const router = useRouter();

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
        <CardAppTitle title="Inscription" />
        <CardAppText text="Cliquer sur le lien reçu par email" size="large" />
      </div>
      <div className="mt-6 flex">
        <Image src="/emailSent.svg" alt="mail" width={256} height={256} />
      </div>
      <div className="mt-64 flex flex-col items-center">
        <div className="text-center">
          <p>Une fois cliqué sur le lien du mail, vous pourrez continuer</p>
        </div>
        <div className="flex justify-center">
          <MainButton
            label="Continuer"
            type="normal"
            onClick={() => router.push("/inscriptionfirstname")}
          />{" "}
        </div>
      </div>
    </div>
  );
};

export default InscriptionPage;
