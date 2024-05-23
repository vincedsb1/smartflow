"use client";
import React from "react";
import Header from "./components/landingPage/LandingHeader";
import Hero from "./components/landingPage/LandingHero";

import PrinciplesFeaturesSection from "./components/landingPage/PrinciplesFeaturesSection";
import MidPageGraphic from "./components/landingPage/MidPageGraphic";
import PerksCards from "./components/landingPage/PerksCards";

const LandingPage = () => {
  return (
    <div className="bg-white dark:bg-neutral-900">
      <div className="sticky top-0">
        <Header />
        <Hero />
      </div>
      <PrinciplesFeaturesSection />
      <MidPageGraphic />
      <PerksCards />
    </div>
  );
};

export default LandingPage;
