"use client";
import React, { useEffect } from "react";
import Header from "./components/landingPage/LandingHeader";
import Hero from "./components/landingPage/LandingHero";

import PrinciplesFeaturesSection from "./components/landingPage/PrinciplesFeaturesSection";
import MidPageGraphic from "./components/landingPage/MidPageGraphic";
import PerksCards from "./components/landingPage/PerksCards";
import Reviews from "./components/landingPage/Reviews";
import HowItWorks from "./components/landingPage/HowItWorks";
import OptimisationMemory from "./components/landingPage/OptimisationMemory";
import AOS from "aos";
import "aos/dist/aos.css";
import Title from "./components/landingPage/Title";
import ButtonBottomLanding from "./components/landingPage/ButtonBottomLanding";

const LandingPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 300,
    });
  }, []);

  return (
    <div
      id="landingPageContainer"
      className="bg-white dark:bg-neutral-900 flex flex-col justify-center pb-20"
    >
      <div id="headerStickyContainer" className="sticky top-0 z-10">
        <Header />
      </div>
      <div id="mainContentContainer" data-aos="fade-up" className="">
        <div
          id="heroContainer"
          data-aos="zoom-out"
          className="h-[66vh] flex flex-row justify-center items-center mb-14 md:mb-28"
        >
          <Hero />
        </div>
        <div
          id="principlesFeaturesContainer"
          data-aos="fade-up"
          className="w-full flex justify-center"
        >
          <PrinciplesFeaturesSection />
        </div>
        <div id="midPageGraphicContainer" data-aos="fade-up">
          <MidPageGraphic />
        </div>
        <div
          id="titleContainer"
          data-aos="fade-up"
          className="w-full flex justify-center mb-14 md:mb-28"
        >
          <div
            id="titleTextContainer"
            className="2xs:w-1/2 w-2/3 flex flex-col justify-center items-center text-center"
          >
            <Title title="Chaque journée est une leçon, chaque expérience, un enseignement." />
          </div>
        </div>
        <div id="perksCardsContainer" data-aos="fade-up">
          <PerksCards />
        </div>
        <div id="reviewsContainer" data-aos="fade-up">
          <Reviews />
        </div>
        <div id="howItWorksContainer" data-aos="fade-up">
          <HowItWorks />
        </div>
        <div id="optimisationMemoryContainer" data-aos="fade-up">
          <OptimisationMemory />
        </div>
        <div
          id="buttonBottomLandingContainer"
          className="flex items-center justify-center pb-28 mt-16"
          data-aos="fade-up"
        >
          <ButtonBottomLanding label="S'inscrire gratuitement" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
