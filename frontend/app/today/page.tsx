import React from "react";
import MainButton from "../components/MainButton";
import MethodSteps from "../components/MethodSteps";

const add = () => {
  return (
    <div className=" flex flex-row justify-center  h-screen align-middle items-center">
      <MethodSteps
        title="Bienvenue sur SmartFlow !"
        text="Découvrer une méthode révolutionnaire pour apprendre efficacement."
        image="/methodImages/Onboarding1.svg"
      />
      <MainButton label="Réciter" type="normal" disabled={false} href="#" />
    </div>
  );
};

export default add;
