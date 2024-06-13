"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import Title from "./Title";
import { FlipWords } from "../landingPage/flip-words";

const Hero = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleNavigation = () => {
    router.push("/login");
  };

  const words = ["mieux", "efficacement", " rapidement", "durablement"];

  return (
    <div
      id="containerHero"
      className="w-full relative flex flex-row items-center align-middle h-full py-16 lg:py-20 xl:py-24  "
    >
      <video
        className="w-full h-full opacity-30 absolute top-0 left-0 object-cover "
        autoPlay
        loop
        muted
      >
        <source src="/clipstudent.mp4" type="video/mp4" />
      </video>
      <div
        id="containerTitleTextButton"
        className="sm:w-1/2 max-w-[925px] flex flex-col justify-center sm:justify-center text-center sm:text-left relative h-full align-middle mx-4 sm:mx-10 lg:mx-20"
      >
        <div id="containerHeroTitle" className="mb-6 md:mb-8">
          <div
            className={`flex flex-col justify-center font-title font-bold font-primary stroke-primary`}
            id="titleLabel"
          >
            <p className="text-3xl 2xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-cyan-900 dark:text-cyan-500 break-words">
              Le hack ultime pour apprendre
            </p>
            <span className="text-3xl 2xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-cyan-900 dark:text-cyan-500 break-words">
              {isClient && <FlipWords words={words} />}
              {"\u00A0"}!
            </span>
          </div>
        </div>
        <div id="containerHeroSubTitle" className="mb-6 md:mb-8 ">
          <p className="text-cyan-950 dark:text-neutral-300 text-lg 2xs:text-xl 3xs:text-2xl md:text-3xl font-title ">
            SmartFlow vous fait apprendre à petites doses. La méthode la plus
            efficace, tout simplement.
          </p>
        </div>
        <div id="containerHeroButton" className="w-full">
          <Button
            className="bg-cyan-950 dark:bg-cyan-100 text-white w-60 dark:text-cyan-950"
            onClick={handleNavigation}
            size="lg"
            isDisabled={false}
          >
            <FontAwesomeIcon icon={faRocket} />
            Let&apos;s go
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
