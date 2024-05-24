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
      className="w-full relative flex items-center align-middle h-full p-10"
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
        id="containerTitleTextButtun"
        className="w-1/2 flex flex-col justify-start relative gap-4 p-10 h-full align-middle"
      >
        <Title title="Passez moins de temps à apprendre mieux !" />
        <p className="text-cyan-950 dark:text-cyan-100 text-2xl font-title mb-4 max-w-1/2">
          SmartFlow vous fait apprendre à petites doses. La méthode la plus
          efficace, tout simplement.
        </p>
        <Button
          className="bg-cyan-950 text-white w-60"
          onClick={handleNavigation}
        >
          <FontAwesomeIcon icon={faRocket} />
          Let&apos;s go
        </Button>
      </div>
    </div>
  );
};

export default Hero;