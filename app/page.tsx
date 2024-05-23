"use client";

import PrinciplesFeaturesSection from "./components/landingPage/PrinciplesFeaturesSection";
import MidPageGraphic from "./components/landingPage/MidPageGraphic";

const LandingPage = () => {
  return (
    <div
      id="landingPageMainContainer"
      className="flex flex-col justify-around items-center w-full h-screen h-min-screen"
    >
      LandingPage
      <PrinciplesFeaturesSection />
      <MidPageGraphic />
    </div>
  );
};

export default LandingPage;
