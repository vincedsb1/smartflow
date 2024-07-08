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
    <div id="registerMainContainer" className="">
      <div
        id="registerDesktopContainer"
        className="hidden sm:flex h-screen  flex-col justify-center"
      >
        <div
          id="desktopVersion"
          className="hidden sm:flex w-16/20 lg:w-16/20 h-3/4 bg-white shadow-lg rounded-2xl flex-row items-start justify-between border-3 border-neutral-200 dark:border-neutral-700 mx-auto my-auto max-w-[800px] max-h-[600px] overflow-hidden"
        >
          <div className="flex w-1/2 h-full relative">
            <Image
              src="/images/entryVisual.svg"
              alt="Entry Visual"
              width={400}
              height={600}
              className="object-cover w-full h-full dark:brightness-90"
            />
            <div className="absolute  top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <h2 className="text-4xl sm:text-xl md:text-2xl  lg:text-4xl font-bold font-text text-cyan-900">
                Bienvenue
              </h2>
            </div>
          </div>
          <div
            id="registerDesktopLeft"
            className="flex flex-col items-center justify-around dark:bg-neutral-800 w-1/2 h-full px-10"
          >
            <div id="registerDestopRightTop" className="">
              <div
                id="registerDesktopTitleContainer"
                className="w-full flex flex-row justify-start"
              >
                <CardAppTitle title="Une dernière étape" size="big" />
              </div>
              <div id="registerHintContainer" className="">
                <CardAppText
                  text="Merci ! Vérifiez votre boîte mail pour finaliser votre inscription."
                  shadow
                  colorVariant
                />
              </div>
            </div>
            <div id="registerDestopRightBottom" className="">
              <Image src="/emailSent.svg" alt="mail" width={350} height={350} />
            </div>
          </div>
        </div>
      </div>
      <div
        id="registerMobileContainer"
        className="sm:hidden flex flex-col justify-between items-center h-screen"
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
            className="flex flex-col justify-center items-center w-full "
          >
            <div id="registerHint" className="flex flex-col items-center w-80 ">
              <CardAppText
                text="Merci ! Vérifiez votre boîte mail pour finaliser votre inscription."
                shadow
                colorVariant
              />
              {/* <CardAppTitle title="S'inscrire" size="big" /> */}
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
              className="flex flex-col justify-center items-center w-16/20 sm:w-full mb-2 "
            >
              <p className="font-text text-sm leading-4 text-neutral-600 dark:text-neutral-400">
                Une fois cliqué sur le lien du mail, vous pourrez continuer
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
