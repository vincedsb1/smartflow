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

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen min-h-screen">
      {/* Version mobile */}
      <div
        id="methodStepsMobile"
        className="flex flex-col items-center justify-center w-full lg:hidden"
      >
        <div className="w-full flex justify-between items-center mt-16 p-4">
          <Link href="/welcome">
            <FontAwesomeIcon
              icon={faChevronLeft}
              onClick={prevStep}
              className="text-neutral-800 dark:text-neutral-200 text-xs w-4 h-4"
            />
          </Link>
        </div>
        <div className="w-16/20 m-8">
          <CardAppTitle title={step.title} />
        </div>
        <div className="w-16/20 m-8 flex items-center justify-center">
          <CardAppText text={step.text} />
        </div>
        <div className="w-16/20 m-8">
          <CardAppImage src={step.image} alt={step.title} />
        </div>
        <div className="w-16/20 m-8 flex flex-col items-center">
          <Stepper currentStep={currentStep} numberOfSteps={steps.length} />
        </div>
        <div className="w-16/20 m-8">
          <Button
            onClick={nextStep}
            type="submit"
            color="primary"
            variant="solid"
            size="lg"
            className="w-full font-bold"
          >
            {buttonText()}
          </Button>
        </div>
      </div>
      {/* Version desktop */}
      <div
        id="methodStepsDesktop"
        className="hidden lg:flex flex-col lg:flex-row items-center justify-center w-2/3 lg:w-1/2 h-2/3 bg-white shadow-lg rounded-2xl border-neutral-200 border-3 mx-auto my-auto"
      >
        <div className="w-1/2 h-full relative">
          <Image
            src="/images/entryVisual.svg"
            alt="Entry Visual"
            width={400}
            height={600}
            className="object-cover w-full h-full rounded-2xl"
          />
        </div>
        <div className="flex flex-col items-center 3xs:items-center 3xs:w-1/2 h-full justify-center p-8  ">
          <CardAppTitle title={step.title} size="big" />
          <CardAppText text={step.text} />
          <div className="p-4">
            <CardAppImage src={step.image} alt={step.title} />
          </div>
          <Stepper currentStep={currentStep} numberOfSteps={steps.length} />
          <Button
            onClick={nextStep}
            type="submit"
            color="default"
            variant="solid"
            size="lg"
            className="w-full mt-4 max-w-full pr-14 pl-14"
          >
            {buttonText()}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MethodSteps;
