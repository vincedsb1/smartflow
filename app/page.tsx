"use client";
import Header from "./components/landingPage/Header";
import Hero from "./components/landingPage/Hero";

import PrinciplesFeaturesSection from "./components/landingPage/PrinciplesFeaturesSection";
import MidPageGraphic from "./components/landingPage/MidPageGraphic";

const LandingPage = () => {
  return (
    <div className="bg-white dark:bg-neutral-900">
      <div className="sticky top-0">
        <Header />
        <Hero />
      </div>
      <PrinciplesFeaturesSection />
      <MidPageGraphic />
    </div>
  );
};

export default LandingPage;
