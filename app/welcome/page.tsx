"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import CardAppTitle from "../components/CardAppTitle";

const reception = () => {
  return (
    <div
      id="welcomeMainContainer"
      className="flex flex-col justify-around items-center w-full h-screen h-min-screen"
    >
      <div
        id="welcomeLogoContainer"
        className="flex flex-row justify-start items-center h-16 w-full relative"
      >
        <Image
          src="/logo.svg"
          alt="logo"
          layout="fill"
          objectFit="contain"
          className="absolute"
        />
      </div>
      <div
        id="welcomeTitleHintContainer"
        className="flex flex-col items-center w-full"
      >
        <CardAppTitle title="Connectez-vous" />
        <Link href="/mailauth">
          <Button
            color="default"
            variant="solid"
            size="lg"
            startContent={
              <Image
                src="/faEnvelope.svg"
                alt="envelope icon"
                width={20}
                height={20}
              />
            }
            className="w-80"
          >
            Par email
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default reception;
