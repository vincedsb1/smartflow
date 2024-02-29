"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Stepper from "../components/stepper";
import CardAppText from "./CardAppText";
import CardAppTitle from "./CardAppTitle";
import CardAppImage from "./CardAppImage";
import MainButton from "./MainButton";

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
    title: "Etudiez et réussissez !",
    text: "Révisez chaque jour et augmentez progressivement l'intervalle de révision pour chaque fiche réussie.",
    image: "/methodImages/Onboarding3.svg",
  },
  {
    title: "Suivez vos progrès",
    text: "Visualisez votre progression et restez motivé.e tout au long de votre parcours d'apprentissage.",
    image: "/methodImages/Onboarding4.svg",
  },
  {
    title: "Prêt.e à commencer ?",
    text: "Créez votre première fiche et commencez votre voyage d'apprentissage dès aujourd'hui.",
    image: "/methodImages/Onboarding5.svg",
  },
];

function MethodSteps() {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
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
      className="flex flex-col justify-center items-center h-screen mb-20"
      id="main-container"
    >
      <div id="icon" className="absolute top-16 left-0 m-4">
        <button type="button" onClick={prevStep}>
          <FontAwesomeIcon icon={faChevronLeft} className="h-6" />
        </button>
      </div>
      <div className="mt-10">
        <div id="title-text-container" className="mb-34">
          <CardAppTitle title={step.title} />
          <CardAppText text={step.text} />
        </div>
        <CardAppImage src={step.image} alt={step.title} />
        <div className="flex flex-col items-center mt-10">
          <div id="stepper-method" className="mt-8 mb-2 flex justify-center">
            <Stepper currentStep={currentStep} numberOfSteps={steps.length} />
          </div>
        </div>
        {currentStep === steps.length - 1 ? (
          <MainButton
            type={"normal"}
            label={buttonText()}
            href="/today"
            onClick={nextStep}
          />
        ) : (
          <MainButton isClicked={false} type={"normal"} label={buttonText()} onClick={nextStep} />
        )}
      </div>
    </div>
  );
}

export default MethodSteps;
