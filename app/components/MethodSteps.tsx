"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Stepper from "./stepper";
import CardAppText from "./CardAppText";
import CardAppTitle from "./CardAppTitle";
import CardAppImage from "./CardAppImage";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { Link } from "@nextui-org/react";

interface MethodStepsProps {
  title: string;
  text: string;
  image: string;
}

interface ButtonProps {
  onClick?: () => void;
  label: string;
  type?: "normal" | "warning" | "disabled";
  disabled?: boolean;
  href?: string;
}

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
  const router = useRouter();

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === steps.length - 1) {
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

  return (
    <div
      id="methodStepsMainContainer"
      className="flex flex-col justify-between min-h-screen w-full "
    >
      <div
        id="methodStepsTopContainer"
        className="flex flex-col justify-center w-full"
      >
        <div id="themeSwitcherBackIcon" className="w-full flex flex-col mt-16">
          <Link href="/welcome">
            <FontAwesomeIcon
              icon={faChevronLeft}
              onClick={prevStep}
              className="text-neutral-800 dark:text-neutral-200 text-xs w-4 h-4 m-5"
            />
          </Link>
        </div>
        <div
          id="methodStepsHeaderContainer"
          className="flex flex-col justify-center items-center w-full"
        >
          <div id="methodStepsTitle" className="flex flex-col mt-11 w-16/20 ">
            <CardAppTitle title={step.title} />
          </div>
          <div
            id="methodStepsHint"
            className="flex flex-col items-center w-16/20 mb-20"
          >
            <CardAppText text={step.text} />
          </div>
          <div id="methodStepsImageContainer" className="w-16/20">
            <CardAppImage src={step.image} alt={step.title} />
          </div>
        </div>
      </div>
      <div
        id="methodStepsBottomContainer"
        className="flex flex-col items-center justify-center mb-14 "
      >
        <div
          id="methodStepsStepsContainer"
          className="w-16/20 flex flex-row justify-center"
        >
          <Stepper currentStep={currentStep} numberOfSteps={steps.length} />
        </div>
        <div className="flex items-center w-16/20"></div>
        <div
          id="methodStepsCGUContainer"
          className="flex flex-row w-16/20 justify-start mb-4 ml-14 mt-1"
        ></div>
        <Button
          onClick={nextStep}
          type="submit"
          color="primary"
          variant="solid"
          size="lg"
          className="w-80 font-bold font-text"
        >
          {buttonText()}
        </Button>
      </div>
    </div>
  );
}

export default MethodSteps;
