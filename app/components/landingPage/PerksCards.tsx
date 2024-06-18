"use client";

import React, { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const PerksCards = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    AOS.init({ duration: 300 });
    return () => AOS.refresh();
  }, []);

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [positions, setPositions] = useState(Array(6).fill({ x: 0, y: 0 }));
  const [opacities, setOpacities] = useState(Array(6).fill(0));

  const handleMouseMove =
    (index: number) => (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = cardRefs.current[index]?.getBoundingClientRect();
      if (rect) {
        const newPositions = [...positions];
        newPositions[index] = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
        setPositions(newPositions);
      }
    };

  const handleMouseEnter = (index: number) => () => {
    const newOpacities = [...opacities];
    newOpacities[index] = 1;
    setOpacities(newOpacities);
  };

  const handleMouseLeave = (index: number) => () => {
    const newOpacities = [...opacities];
    newOpacities[index] = 0;
    setOpacities(newOpacities);
  };

  const cardsData = [
    {
      title: "Gagnez un temps fou",
      description:
        "Dites adieu aux longues heures de bachotage inefficaces. Avec SmartFlow, apprenez plus en moins de temps.",
    },
    {
      title: "Apprentissage sur mesure",
      description:
        "SmartFlow s'adapte à votre style d'apprentissage et à vos objectifs spécifiques, que vous soyez un novice ou un expert.",
    },
    {
      title: "Sur le chemin du succès",
      description:
        "Chaque étape de votre parcours devient plus simple. Vous touchez presque vos objectifs du bout des doigts.",
    },
    {
      title: "Boostez votre productivité",
      description:
        "Optimisez votre flux de travail et atteignez vos objectifs plus rapidement avec nos outils intelligents.",
    },
    {
      title: "Améliorez vos skills",
      description:
        "Apprendre ou perfectionner une nouvelle compétences ? Ça devient plus simple avec les bons outils pour apprendre.",
    },
    {
      title: "Une interface simple",
      description:
        "Vous avez autre chose à faire qu'apprendre à vous servir d'un nouvel outils. SmartFlow, c'est ready-to-use !",
    },
  ];

  return (
    <div
      id="perksCardsContainer"
      className="flex flex-col md:flex-row justify-center items-center px-4 mb-14 md:mb-28"
    >
      <div
        id="cardsWrapper"
        className="flex flex-col md:flex-row justify-center w-full max-w-7xl"
      >
        <div
          id="oddCardsColumn"
          className="flex flex-col items-center md:m-10 space-y-10 md:space-y-20"
        >
          {cardsData.slice(0, 3).map((card, index) => (
            <div
              key={index}
              className="relative w-40 xs:w-60 2xs:w-64 3xs:w-72"
              data-aos="fade-up"
            >
              <div
                ref={(el) => (cardRefs.current[index] = el)}
                onMouseMove={handleMouseMove(index)}
                onMouseEnter={handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave(index)}
                className="w-full h-full bg-white dark:bg-neutral-800 cursor-default rounded-2xl border-3 border-slate-200 dark:border-slate-700 p-6 text-slate-100 transition-colors duration-500 placeholder:select-none placeholder:text-neutral-500 focus:border-[#E47320] focus:outline-none"
              >
                <h3 className="text-lg font-semibold mb-5 text-neutral-700 dark:text-neutral-300 font-title">
                  {card.title}
                </h3>
                <p className="font-title text-neutral-600 dark:text-neutral-300 text-sm 2xs:text-md 3xs:text-base">
                  {card.description}
                </p>
                {isClient && (
                  <div
                    style={{
                      border: `3px solid ${
                        document.documentElement.classList.contains("dark")
                          ? "RGB(156, 163, 175)"
                          : "RGB(21, 94, 117)"
                      }`,
                      opacity: opacities[index],
                      WebkitMaskImage: `radial-gradient(100% 200px at ${positions[index].x}px ${positions[index].y}px, black 45%, transparent)`,
                    }}
                    aria-hidden="true"
                    className="w-full h-full pointer-events-none absolute left-0 top-0 z-10 cursor-default rounded-2xl bg-[transparent] p-3.5 opacity-0 transition-opacity duration-500 placeholder:select-none"
                  ></div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div
          id="separatorColumn"
          className="hidden md:flex flex-col justify-between items-center"
        >
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-10 bg-neutral-200 dark:bg-neutral-700 rounded-full my-2"
              id={`separator-${i}`}
            ></div>
          ))}
        </div>
        <div
          id="evenCardsColumn"
          className="flex flex-col items-center md:m-10 mt-10 md:mt-44 space-y-10 md:space-y-20"
        >
          {cardsData.slice(3).map((card, index) => (
            <div
              key={index + 3}
              className="relative w-40 xs:w-60 2xs:w-64 3xs:w-72"
              data-aos="fade-up"
            >
              <div
                ref={(el) => (cardRefs.current[index + 3] = el)}
                onMouseMove={handleMouseMove(index + 3)}
                onMouseEnter={handleMouseEnter(index + 3)}
                onMouseLeave={handleMouseLeave(index + 3)}
                className="w-full h-full bg-white dark:bg-neutral-800 cursor-default rounded-2xl border-3 border-slate-200 dark:border-slate-700 p-6 text-slate-100 transition-colors duration-500 placeholder:select-none placeholder:text-neutral-500 focus:border-[#E47320] focus:outline-none"
              >
                <h3 className="text-lg font-semibold mb-5 text-neutral-700 dark:text-neutral-300 font-title">
                  {card.title}
                </h3>
                <p className="font-title text-neutral-600 dark:text-neutral-300 text-sm 2xs:text-md 3xs:text-base">
                  {card.description}
                </p>
                {isClient && (
                  <div
                    style={{
                      border: `3px solid ${
                        document.documentElement.classList.contains("dark")
                          ? "RGB(156, 163, 175)"
                          : "RGB(21, 94, 117)"
                      }`,
                      opacity: opacities[index + 3],
                      WebkitMaskImage: `radial-gradient(100% 200px at ${
                        positions[index + 3].x
                      }px ${positions[index + 3].y}px, black 45%, transparent)`,
                    }}
                    aria-hidden="true"
                    className="w-full h-full pointer-events-none absolute left-0 top-0 z-10 cursor-default rounded-2xl bg-[transparent] p-3.5 opacity-0 transition-opacity duration-500 placeholder:select-none"
                  ></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerksCards;
