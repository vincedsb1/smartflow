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
import { Button } from "@nextui-org/react";

const Register = () => {
  const router = useRouter();

  return (
    <div
      id="registerMainContainer"
      className="flex flex-col justify-between items-center h-screen"
    >
      <div
        id="registerTopContainer"
        className="flex flex-col justify-center w-full"
      >
        <div
          id="registerBackIconContainer"
          className="w-full flex flex-col mt-16"
        >
          <Link href="/mailauth">
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="text-neutral-800 dark:text-neutral-200 text-xs w-4 h-4 m-5"
            />
          </Link>
        </div>
        <div
          id="registerTitleHintContainer"
          className="flex flex-col justify-center items-center w-full"
        >
          <div id="registerTitle" className="flex flex-col mt-11 w-16/20 ">
            <CardAppTitle title="S'inscrire" />
          </div>
          <div id="registerHint" className="flex flex-col items-center w-16/20">
            <CardAppText text="Cliquer sur le lien reçu par email" />
          </div>
        </div>
      </div>
      <div
        id="registerBottomContainer"
        className="flex flex-col justify-center mb-14"
      >
        <div
          id="registerImageContainer"
          className="flex flex-col justify-center items-center mb-28 mr-14"
        >
          <Image src="/emailSent.svg" alt="mail" width={350} height={350} />
        </div>
        <div
          id="registerButtonTextContainer"
          className="flex flex-col w-full justify-center items-center mb-1 mt-1 "
        >
          {" "}
          <div
            id="registerTextContainer"
            className="flex flex-col justify-center items-center w-16/20 mb-2"
          >
            <p className="font-text text-sm leading-4 text-neutral-600 dark:text-neutral-400">
              Une fois cliqué sur le lien du mail, vous pourrez continuer
            </p>
          </div>
          <Button
            type="submit"
            color="primary"
            variant="solid"
            size="lg"
            className="w-80 font-bold font-text"
            onClick={() => router.push("/register-firstname")}
          >
            Suivant
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
