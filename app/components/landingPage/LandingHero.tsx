import React from "react";
import { Button } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import Title from "./Title";

const Hero = () => {
  const router = useRouter();

  const handleNavigation = () => {
    router.push("/login");
  };

  return (
    <div
      id="containerHero"
      className="w-full relative flex items-center align-middle h-full py-16 lg:py-20 xl:py-24 mb-14 md:mb-28"
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
        className="sm:w-1/2 max-w-[925px] flex flex-col justify-center sm:justify-start text-center sm:text-left relative h-full align-middle mx-4 sm:mx-10 lg:mx-20"
      >
        <div id="containerHeroTitle" className="mb-6 md:mb-8">
          <Title title="Passez moins de temps à apprendre mieux !" size="big" />
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
            isDisabled={true}
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
