import React, { useEffect } from "react";
import Title from "./Title";
import AOS from "aos";
import "aos/dist/aos.css";

const HowItWorks = () => {
  useEffect(() => {
    AOS.init({
      duration: 300,
    });

    return () => {
      AOS.refresh();
    };
  }, []);
  return (
    <div className="w-full flex justify-center">
      <div className="mb-14 md:mb-28">
        <div className="flex justify-center mb-20" data-aos="fade-up">
          <Title title="Comment ça marche ?" />
        </div>
        <div className="mb-8 ml-8" data-aos="fade-up">
          <h2 className="text-xl text-cyan-950 font-bold dark:text-neutral-400">
            {" "}
            1. Fiches recto-verso ✍️
          </h2>
          <p className="text-md text-cyan-700 dark:text-neutral-400">
            Créez des fiches avec des questions d&apos;un côté et des réponses
            de l&apos;autre pour chaque sujet à mémoriser.
          </p>
        </div>
        <div className="mb-8 ml-8" data-aos="fade-up">
          <h2 className="text-xl text-cyan-950 font-bold dark:text-neutral-400">
            {" "}
            2. Niveaux de révision 📚
          </h2>
          <p className="text-md text-cyan-700 dark:text-neutral-400">
            Apprenez en six étapes avec des révisions de plus en plus espacées.
          </p>
        </div>
        <div className="mb-8 ml-8" data-aos="fade-up">
          <h2 className="text-xl text-cyan-950 font-bold dark:text-neutral-400">
            {" "}
            3. Rappels intelligents ⏰
          </h2>
          <p className="text-md text-cyan-700 dark:text-neutral-400">
            Recevez des rappels au bon moment pour renforcer vos connaissances.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
