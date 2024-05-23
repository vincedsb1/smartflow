"use client";
import React from "react";
import Header from "./components/landingPage/LandingHeader";
import Hero from "./components/landingPage/LandingHero";

import PrinciplesFeaturesSection from "./components/landingPage/PrinciplesFeaturesSection";
import MidPageGraphic from "./components/landingPage/MidPageGraphic";
import PerksCards from "./components/landingPage/PerksCards";
import HowItWorks from "./components/landingPage/HowItWorks";
import OptimisationMemory from "./components/landingPage/OptimisationMemory";
import ButtonConnexion from "./components/landingPage/ButtonConnexion";


const LandingPage = () => {
  return (
    <div className="bg-white dark:bg-neutral-900">
      <div className="sticky top-0 z-10">
        <Header />
      </div>
      <Hero />
      <PrinciplesFeaturesSection />
      <MidPageGraphic />
      <PerksCards />
      <HowItWorks />
      <OptimisationMemory />
      <div className="flex items-center justify-center">
        <ButtonConnexion label="S'inscrire Gratuitement" />
      </div>
    </div>
  );
};

export default LandingPage;