import React, { useEffect } from "react";
import Title from "./Title";
import AOS from "aos";
import "aos/dist/aos.css";

const OptimisationMemory = () => {
  useEffect(() => {
    AOS.init({
      duration: 300,
    });

    return () => {
      AOS.refresh();
    };
  }, []);
  return (
    <div>
      <div
        className="flex justify-center mb-16 px-8 text-center"
        data-aos="fade-up"
      >
        <Title title="Optimisez votre mémoire et vos résultats" />
      </div>
      <div className="" data-aos="fade-up">
        <p className="w-13/20 mx-auto text-md text-cyan-700 text-center dark:text-neutral-400">
          Découvrez comment SmartFlow peut transformer votre manière
          d&apos;apprendre. Essayez-le maintenant et améliorez votre
          mémorisation et vos résultats !
        </p>
      </div>
    </div>
  );
};

export default OptimisationMemory;
