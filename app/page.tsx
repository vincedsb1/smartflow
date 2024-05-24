"use client";
import React from "react";
import Header from "./components/landingPage/LandingHeader";
import Hero from "./components/landingPage/LandingHero";

import PrinciplesFeaturesSection from "./components/landingPage/PrinciplesFeaturesSection";
import MidPageGraphic from "./components/landingPage/MidPageGraphic";
import PerksCards from "./components/landingPage/PerksCards";
import Reviews from "./components/landingPage/Reviews";
import HowItWorks from "./components/landingPage/HowItWorks";
import OptimisationMemory from "./components/landingPage/OptimisationMemory";
import ButtonConnexion from "./components/landingPage/ButtonConnexion";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const LandingPage = () => {

  useEffect(() => {
    AOS.init({
      duration: 300,
    });
  }, []);

  return (
    <div className="bg-white dark:bg-neutral-900">
      <div className="sticky top-0 z-10">
        <Header />
      </div>
      <div data-aos="fade-up">
        <div data-aos="zoom-out">
          <Hero />
        </div>
        <div data-aos="fade-up">
          <PrinciplesFeaturesSection />
        </div>
        <div data-aos="fade-up">
          <MidPageGraphic />
        </div>
        <div data-aos="fade-up">
          <PerksCards />
        </div>
        <div data-aos="fade-up">
          <Reviews />
        </div>
        <div data-aos="fade-up">
          <HowItWorks />
        </div>
        <div data-aos="fade-up">
          <OptimisationMemory />
        </div>
        <div className="flex items-center justify-center pb-28 mt-16" data-aos="fade-up">
          <ButtonConnexion label="S'inscrire Gratuitement" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;