"use client";
import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Stepper from "./stepper";
import CardAppText from "./CardAppText";
import CardAppTitle from "./CardAppTitle";
import CardAppImage from "./CardAppImage";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { Link } from "@nextui-org/react";
import { useUser } from "../context/UserContext";
import Image from "next/image";
import { useTheme } from "next-themes";

const steps = [
  {
    title: "Bienvenue sur SmartFlow",
    text: "Découvrez une méthode révolutionnaire pour apprendre efficacement.",
    image: "/methodImages/Onboarding1.svg",
  },
  {
    title: "La méthode Leitner",
    text: "Utilisez des fiches recto/verso pour réviser et mémoriser facilement.",
    image: "/methodImages/Onboarding2.svg",
  },
  {
    title: "Étudiez et réussissez !",
    text: "Révisez chaque jour et augmentez progressivement l'intervalle de révision pour chaque fiche réussie.",
    image: "/methodImages/Onboarding3.svg",
  },
  {
    title: "Suivez vos progrès",
    text: "Visualisez votre progression et restez motivé.e tout au long de votre parcours d'apprentissage.",
    image: "/methodImages/Onboarding4.svg",
  },
  {
    title: "Prêt·e à commencer ?",
    text: "Créez votre première fiche et commencez votre voyage d'apprentissage dès aujourd'hui.",
    image: "/methodImages/Onboarding5.svg",
  },
];

function MethodSteps() {
  const [currentStep, setCurrentStep] = useState(0);
  const { user, setOnBoarding } = useUser();
  const router = useRouter();
  const { theme } = useTheme();
  const logo = theme === "dark" ? "/logo-dark.svg" : "/logo-light.svg";

  const finishOnboarding = async () => {
    console.log("Finishing onboarding for user:", user);
    if (!user?.email) {
      console.log("User email is undefined");
      return;
    }

    const response = await fetch("/api/users/onboarding", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userEmail: user?.email }),
    });

    if (!response.ok) {
      console.log("API response was not ok, status:", response.status);
      return;
    }

    const data = await response.json();
    console.log("Response from updateOnboardingStatus:", data);

    setOnBoarding(true);
    console.log(setOnBoarding);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === steps.length - 1) {
      console.log("Last step reached, finishing onboarding");
      finishOnboarding();
      router.push("/today");
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const step = steps[currentStep];

  const buttonText = () => {
    if (currentStep === 0) {
      return "Commencer";
    } else if (currentStep === steps.length - 1) {
      return "Let's Go !";
    } else {
      return "Suivant";
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div
      id="mailAuthMainContainer"
      className="flex flex-col items-center justify-center w-full h-screen min-h-screen p-4 xs:h-full sm:m-0 sm:p-0"
    >
      <div
        id="chevronContainer"
        className="md:hidden absolute top-12 left-0 flex flex-row justify-start items-center h-16 w-full p-4"
      >
        <FontAwesomeIcon
          icon={faChevronLeft}
          className="text-neutral-800 dark:text-neutral-200 text-xs w-4 h-4 m-5"
          onClick={handleBack}
        />
      </div>
      <div
        id="logoContainer"
        className="hidden md:flex flex-row justify-start items-center h-16 w-full relative p-4"
      >
        <Image src={logo} alt="logo" width={151} height={38} priority={true} />
      </div>
      {/* Mobile */}
      <div id="mobileVersion" className="flex flex-col items-center justify-center w-full md:hidden">
        <div className="w-full max-w-xs m-4 xs:m-0 2xs:mt-4 sm:mt-1">
          <CardAppTitle title={step.title} />
        </div>
        <div className="w-full max-w-xs m-4 flex items-center justify-center xs:m-0 2xs:mt-4 sm:mt-1">
          <CardAppText text={step.text} />
        </div>
        <div className="w-full max-w-xs m-4 2xs:mt-4 sm:mt-1">
          <CardAppImage src={step.image} alt={step.title} />
        </div>
        <div className="w-full max-w-xs m-4 flex flex-col items-center xs:m-2 2xs:mt-4 sm:mt-1">
          <div className="flex items-center justify-center">
            <Stepper currentStep={currentStep} numberOfSteps={steps.length} />
          </div>
        </div>
        <div className="w-full max-w-xs m-4 xs:m-0 2xs:mt-4 sm:mt-1">
          <Button
            onClick={nextStep}
            type="submit"
            color="primary"
            variant="solid"
            size="lg"
            className="w-full font-bold 2xs:mt-4"
          >
            {buttonText()}
          </Button>
        </div>
      </div>
      {/* Version desktop */}
      <div id="desktopVersion" className="hidden md:flex flex-col items-center justify-center w-3/4 lg:w-2/3 h-3/4 bg-white shadow-lg rounded-2xl border-neutral-200 mx-auto my-auto p-4 overflow-auto">
        <div className="w-full max-w-md mb-2 md:mb-0 flex justify-center">
          <CardAppTitle title={step.title} size="big" />
        </div>
        <div className="w-full mt-2 md:mt-0 max-w-md">
          <CardAppText text={step.text} />
        </div>
        <div className="w-full mt-2 md:mt-0 max-w-md">
          <CardAppImage src={step.image} alt={step.title} />
        </div>
        <div className="w-full mt-2 max-w-md md:mt-0">
          <div className="flex items-center justify-center mt-4 mb-4">
            <Stepper currentStep={currentStep} numberOfSteps={steps.length} />
          </div>
        </div>
        <div className="w-full mt-2 max-w-md">
          <Button
            onClick={nextStep}
            type="submit"
            color="default"
            variant="solid"
            size="lg"
            className="w-full font-bold pr-14 pl-14"
          >
            {buttonText()}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MethodSteps;
