"use client";
import Header from "./components/landingPage/header";
import Hero from "./components/landingPage/hero";

const LandingPage = () => {
  return (
    <div>
      <div className="sticky top-0">
        <Header />
        <Hero />
      </div>
    </div>
  );
};

export default LandingPage;
