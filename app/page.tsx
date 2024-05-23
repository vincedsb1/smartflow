"use client";
import Header from "./components/landingPage/header";
import Hero from "./components/landingPage/hero";

import PrinciplesFeaturesSection from "./components/landingPage/PrinciplesFeaturesSection";
import MidPageGraphic from "./components/landingPage/MidPageGraphic";

const LandingPage = () => {
  return (
    <div>
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
