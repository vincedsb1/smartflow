import React, { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const PerksCards: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 300,
    });

    return () => {
      AOS.refresh();
    };
  }, []);

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const divRef0 = useRef<HTMLDivElement>(null);
  const divRef1 = useRef<HTMLDivElement>(null);
  const divRef2 = useRef<HTMLDivElement>(null);
  const divRef3 = useRef<HTMLDivElement>(null);
  const divRef4 = useRef<HTMLDivElement>(null);
  const divRef5 = useRef<HTMLDivElement>(null);

  const [position0, setPosition0] = useState({ x: 0, y: 0 });
  const [position1, setPosition1] = useState({ x: 0, y: 0 });
  const [position2, setPosition2] = useState({ x: 0, y: 0 });
  const [position3, setPosition3] = useState({ x: 0, y: 0 });
  const [position4, setPosition4] = useState({ x: 0, y: 0 });
  const [position5, setPosition5] = useState({ x: 0, y: 0 });

  const [opacity0, setOpacity0] = useState(0);
  const [opacity1, setOpacity1] = useState(0);
  const [opacity2, setOpacity2] = useState(0);
  const [opacity3, setOpacity3] = useState(0);
  const [opacity4, setOpacity4] = useState(0);
  const [opacity5, setOpacity5] = useState(0);

  const handleMouseMove0 = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef0.current) return;
    const rect = divRef0.current.getBoundingClientRect();
    setPosition0({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseMove1 = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef1.current) return;
    const rect = divRef1.current.getBoundingClientRect();
    setPosition1({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };
  const handleMouseMove2 = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef2.current) return;
    const rect = divRef2.current.getBoundingClientRect();
    setPosition2({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };
  const handleMouseMove3 = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef3.current) return;
    const rect = divRef3.current.getBoundingClientRect();
    setPosition3({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };
  const handleMouseMove4 = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef4.current) return;
    const rect = divRef4.current.getBoundingClientRect();
    setPosition4({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };
  const handleMouseMove5 = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef5.current) return;
    const rect = divRef5.current.getBoundingClientRect();
    setPosition5({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter0 = () => setOpacity0(1);
  const handleMouseEnter1 = () => setOpacity1(1);
  const handleMouseEnter2 = () => setOpacity2(1);
  const handleMouseEnter3 = () => setOpacity3(1);
  const handleMouseEnter4 = () => setOpacity4(1);
  const handleMouseEnter5 = () => setOpacity5(1);

  const handleMouseLeave0 = () => setOpacity0(0);
  const handleMouseLeave1 = () => setOpacity1(0);
  const handleMouseLeave2 = () => setOpacity2(0);
  const handleMouseLeave3 = () => setOpacity3(0);
  const handleMouseLeave4 = () => setOpacity4(0);
  const handleMouseLeave5 = () => setOpacity5(0);

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
          <div className="relative w-40 xs:w-60 2xs:w-64 3xs:w-72">
            <div
              id="card-0"
              ref={divRef0}
              onMouseMove={handleMouseMove0}
              onMouseEnter={handleMouseEnter0}
              onMouseLeave={handleMouseLeave0}
              className="w-full h-full bg-white cursor-default rounded-2xl border-3 border-slate-200 p-6 text-slate-100 transition-colors duration-500 placeholder:select-none placeholder:text-neutral-500 focus:border-[#E47320] focus:outline-none"
            >
              <h3 className="text-lg font-semibold mb-5 text-neutral-700 dark:text-neutral-300 font-title">
                Gagnez un temps fou
              </h3>
              <p className="font-title text-neutral-600 dark:text-neutral-300 text-sm 2xs:text-md 3xs:text-base">
                Dites adieu aux longues heures de bachotage inefficaces. Avec
                SmartFlow, apprenez plus en moins de temps.
              </p>
              <div
                style={{
                  border: "3px solid RGB(21, 94, 117)",
                  opacity: opacity0,
                  WebkitMaskImage: `radial-gradient(100% 200px at ${position0.x}px ${position0.y}px, black 45%, transparent)`,
                }}
                aria-hidden="true"
                className="w-full h-full pointer-events-none absolute left-0 top-0 z-10 cursor-default rounded-2xl bg-[transparent] p-3.5 opacity-0 transition-opacity duration-500 placeholder:select-none"
              ></div>
            </div>
          </div>
          {/* <div
            ref={(el) => (cardRefs.current[0] = el)}
            onMouseMove={(e) => handleMouseMove(e, 0)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            data-aos="fade-up"
            className="border-3 border-neutral-100 dark:border-neutral-700 rounded-3xl p-7 shadow-lg shadow-cyan-100 dark:shadow-neutral-950 bg-white dark:bg-neutral-800 max-w-72 my-6 md:m-10 cursor-default transition-colors duration-500 focus:border-[#E47320] focus:outline-none"
            id="card-0"
          >
            <h3 className="text-lg font-semibold mb-5 text-neutral-700 dark:text-neutral-300 font-title">
              Gagnez un temps fou
            </h3>
            <p className="text-base font-title text-neutral-600 dark:text-neutral-300">
              Dites adieu aux longues heures de bachotage inefficaces. Avec
              SmartFlow, apprenez plus en moins de temps.
            </p>
            <div
              style={{
                border: "3px solid rgb(228 115 32)", // Assurez-vous que l'épaisseur de la bordure est la même
                opacity,
                WebkitMaskImage: `radial-gradient(30% 30px at ${position.x}px ${position.y}px, black 45%, transparent)`,
              }}
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 z-10 h-full w-full rounded-3xl bg-[transparent] opacity-0 transition-opacity duration-500"
            />
          </div> */}
          <div className="relative w-40 xs:w-60 2xs:w-64 3xs:w-72">
            <div
              id="card-1"
              ref={divRef1}
              onMouseMove={handleMouseMove1}
              onMouseEnter={handleMouseEnter1}
              onMouseLeave={handleMouseLeave1}
              className="w-full h-full bg-white cursor-default rounded-2xl border-3 border-slate-200 p-6 text-slate-100 transition-colors duration-500 placeholder:select-none placeholder:text-neutral-500 focus:border-[#E47320] focus:outline-none"
            >
              <h3 className="text-lg font-semibold mb-5 text-neutral-700 dark:text-neutral-300 font-title">
                Apprentissage sur mesure
              </h3>
              <p className=" text-sm 2xs:text-md 3xs:text-base font-title text-neutral-600 dark:text-neutral-300">
                SmartFlow s&apos;adapte à votre style d&apos;apprentissage et à
                vos objectifs spécifiques, que vous soyez un novice ou un
                expert.
              </p>
              <div
                style={{
                  border: "3px solid RGB(21, 94, 117)",
                  opacity: opacity1,
                  WebkitMaskImage: `radial-gradient(100% 200px at ${position1.x}px ${position1.y}px, black 45%, transparent)`,
                }}
                aria-hidden="true"
                className="w-full h-full pointer-events-none absolute left-0 top-0 z-10 cursor-default rounded-2xl bg-[transparent] p-3.5 opacity-0 transition-opacity duration-500 placeholder:select-none"
              ></div>
            </div>
          </div>
          {/* <div
            ref={(el) => (cardRefs.current[2] = el)}
            onMouseMove={handleMouseMove1}
            onMouseEnter={handleMouseEnter1}
            onMouseLeave={handleMouseLeave1}
            data-aos="fade-up"
            className="relative border-2 border-cyan-300 dark:border-neutral-700 rounded-3xl p-7 shadow-lg shadow-cyan-100 dark:shadow-neutral-950 bg-white dark:bg-neutral-800 max-w-72 my-6 md:m-10"
            id="card-2"
          >
            <h3 className="text-lg font-semibold mb-5 text-neutral-700 dark:text-neutral-300 font-title">
              Apprentissage sur mesure
            </h3>
            <p className="text-base font-title text-neutral-600 dark:text-neutral-300">
              SmartFlow s&apos;adapte à votre style d&apos;apprentissage et à
              vos objectifs spécifiques, que vous soyez un novice ou un expert.
            </p>
            <div
              style={{
                border: "1px solid rgb(228 115 32)",
                opacity,
                WebkitMaskImage: `radial-gradient(30% 30px at ${position.x}px ${position.y}px, black 45%, transparent)`,
              }}
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 z-10 h-full w-full rounded-3xl bg-[transparent] opacity-0 transition-opacity duration-500"
            />
          </div> */}
          <div className="relative w-40 xs:w-60 2xs:w-64 3xs:w-72">
            <div
              id="card-2"
              ref={divRef2}
              onMouseMove={handleMouseMove2}
              onMouseEnter={handleMouseEnter2}
              onMouseLeave={handleMouseLeave2}
              className="w-full h-full bg-white cursor-default rounded-2xl border-3 border-slate-200 p-6 text-slate-100 transition-colors duration-500 placeholder:select-none placeholder:text-neutral-500 focus:border-[#E47320] focus:outline-none"
            >
              <h3 className="text-lg font-semibold mb-5 text-neutral-700 dark:text-neutral-300 font-title">
                Sur le chemin du succès
              </h3>
              <p className=" text-sm 2xs:text-md 3xs:text-base font-title text-neutral-600 dark:text-neutral-300">
                Chaque étape de votre parcours devient plus simple. Vous touchez
                presque vos objectifs du bout des doigts.
              </p>
              <div
                style={{
                  border: "3px solid RGB(21, 94, 117)",
                  opacity: opacity2,
                  WebkitMaskImage: `radial-gradient(100% 200px at ${position2.x}px ${position2.y}px, black 45%, transparent)`,
                }}
                aria-hidden="true"
                className="w-full h-full pointer-events-none absolute left-0 top-0 z-10 cursor-default rounded-2xl bg-[transparent] p-3.5 opacity-0 transition-opacity duration-500 placeholder:select-none"
              ></div>
            </div>
          </div>
          {/* <div
            ref={(el) => (cardRefs.current[4] = el)}
            onMouseMove={handleMouseMove2}
            onMouseEnter={handleMouseEnter2}
            onMouseLeave={handleMouseLeave2}
            data-aos="fade-up"
            className="relative border-2 border-cyan-300 dark:border-neutral-700 rounded-3xl p-7 shadow-lg shadow-cyan-100 dark:shadow-neutral-950 bg-white dark:bg-neutral-800 max-w-72 my-6 md:m-10"
            id="card-4"
          >
            <h3 className="text-lg font-semibold mb-5 text-neutral-700 dark:text-neutral-300 font-title">
              Tracez votre chemin vers le succès
            </h3>
            <p className="text-base font-title text-neutral-600 dark:text-neutral-300">
              Avec SmartFlow, chaque étape de votre parcours
              d&apos;apprentissage est suivie de près. Vous saurez toujours où
              vous en êtes et où vous allez.
            </p>
            <div
              style={{
                border: "1px solid rgb(228 115 32)",
                opacity,
                WebkitMaskImage: `radial-gradient(30% 30px at ${position.x}px ${position.y}px, black 45%, transparent)`,
              }}
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 z-10 h-full w-full rounded-3xl bg-[transparent] opacity-0 transition-opacity duration-500"
            />
          </div> */}
        </div>
        <div
          id="separatorColumn"
          className="hidden md:flex flex-col justify-between items-center"
        >
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-10 bg-cyan-300 dark:bg-cyan-700 rounded-full my-2"
              id={`separator-${i}`}
            ></div>
          ))}
        </div>
        <div
          id="evenCardsColumn"
          className="flex flex-col items-center md:m-10 mt-10 md:mt-44 space-y-10 md:space-y-20"
        >
          <div className="relative w-40 xs:w-60 2xs:w-64 3xs:w-72">
            <div
              id="card-3"
              ref={divRef3}
              onMouseMove={handleMouseMove3}
              onMouseEnter={handleMouseEnter3}
              onMouseLeave={handleMouseLeave3}
              className="w-full h-full bg-white cursor-default rounded-2xl border-3 border-slate-200 p-6 text-slate-100 transition-colors duration-500 placeholder:select-none placeholder:text-neutral-500 focus:border-[#E47320] focus:outline-none"
            >
              <h3 className="text-lg font-semibold mb-5 text-neutral-700 dark:text-neutral-300 font-title">
                Boostez votre productivité
              </h3>
              <p className=" text-sm 2xs:text-md 3xs:text-base font-title text-neutral-600 dark:text-neutral-300">
                Optimisez votre flux de travail et atteignez vos objectifs plus
                rapidement avec nos outils intelligents.
              </p>
              <div
                style={{
                  border: "3px solid RGB(21, 94, 117)",
                  opacity: opacity3,
                  WebkitMaskImage: `radial-gradient(100% 200px at ${position3.x}px ${position3.y}px, black 45%, transparent)`,
                }}
                aria-hidden="true"
                className="w-full h-full pointer-events-none absolute left-0 top-0 z-10 cursor-default rounded-2xl bg-[transparent] p-3.5 opacity-0 transition-opacity duration-500 placeholder:select-none"
              ></div>
            </div>
          </div>
          {/* <div
            ref={(el) => (cardRefs.current[1] = el)}
            onMouseMove={handleMouseMove3}
            onMouseEnter={handleMouseEnter3}
            onMouseLeave={handleMouseLeave3}
            data-aos="fade-up"
            className="relative border-2 border-cyan-300 dark:border-neutral-700 rounded-3xl p-7 shadow-lg shadow-cyan-100 dark:shadow-neutral-950 bg-white dark:bg-neutral-800 max-w-72 my-6 md:m-10"
            id="card-1"
          >
            <h3 className="text-lg font-semibold mb-5 text-neutral-700 dark:text-neutral-300 font-title">
              Boostez votre productivité
            </h3>
            <p className="text-base font-title text-neutral-600 dark:text-neutral-300">
              Optimisez votre flux de travail et atteignez vos objectifs plus
              rapidement avec nos outils intelligents.
            </p>
            <div
              style={{
                border: "1px solid rgb(228 115 32)",
                opacity,
                WebkitMaskImage: `radial-gradient(30% 30px at ${position.x}px ${position.y}px, black 45%, transparent)`,
              }}
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 z-10 h-full w-full rounded-3xl bg-[transparent] opacity-0 transition-opacity duration-500"
            />
          </div> */}
          <div className="relative w-40 xs:w-60 2xs:w-64 3xs:w-72">
            <div
              id="card-4"
              ref={divRef4}
              onMouseMove={handleMouseMove4}
              onMouseEnter={handleMouseEnter4}
              onMouseLeave={handleMouseLeave4}
              className="w-full h-full bg-white cursor-default rounded-2xl border-3 border-slate-200 p-6 text-slate-100 transition-colors duration-500 placeholder:select-none placeholder:text-neutral-500 focus:border-[#E47320] focus:outline-none"
            >
              <h3 className="text-lg font-semibold mb-5 text-neutral-700 dark:text-neutral-300 font-title">
                Améliorez vos skills
              </h3>
              <p className=" text-sm 2xs:text-md 3xs:text-base font-title text-neutral-600 dark:text-neutral-300">
                Apprendre ou perfectionner une nouvelle compétences ? Ça devient
                plus simple avec les bons outils pour apprendre.
              </p>
              <div
                style={{
                  border: "3px solid RGB(21, 94, 117)",
                  opacity: opacity4,
                  WebkitMaskImage: `radial-gradient(100% 200px at ${position4.x}px ${position4.y}px, black 45%, transparent)`,
                }}
                aria-hidden="true"
                className="w-full h-full pointer-events-none absolute left-0 top-0 z-10 cursor-default rounded-2xl bg-[transparent] p-3.5 opacity-0 transition-opacity duration-500 placeholder:select-none"
              ></div>
            </div>
          </div>
          {/* <div
            ref={(el) => (cardRefs.current[3] = el)}
            onMouseMove={handleMouseMove4}
            onMouseEnter={handleMouseEnter4}
            onMouseLeave={handleMouseLeave4}
            data-aos="fade-up"
            className="relative border-2 border-cyan-300 dark:border-neutral-700 rounded-3xl p-7 shadow-lg shadow-cyan-100 dark:shadow-neutral-950 bg-white dark:bg-neutral-800 max-w-72 my-6 md:m-10"
            id="card-3"
          >
            <h3 className="text-lg font-semibold mb-5 text-neutral-700 dark:text-neutral-300 font-title">
              Améliorez vos compétences
            </h3>
            <p className="text-base font-title text-neutral-600 dark:text-neutral-300">
              Accédez à des ressources de formation de haute qualité et
              développez vos compétences professionnelles.
            </p>
            <div
              style={{
                border: "1px solid rgb(228 115 32)",
                opacity,
                WebkitMaskImage: `radial-gradient(30% 30px at ${position.x}px ${position.y}px, black 45%, transparent)`,
              }}
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 z-10 h-full w-full rounded-3xl bg-[transparent] opacity-0 transition-opacity duration-500"
            />
          </div> */}
          <div className="relative w-40 xs:w-60 2xs:w-64 3xs:w-72">
            <div
              id="card-5"
              ref={divRef5}
              onMouseMove={handleMouseMove5}
              onMouseEnter={handleMouseEnter5}
              onMouseLeave={handleMouseLeave5}
              className="w-full h-full bg-white cursor-default rounded-2xl border-3 border-slate-200 p-6 text-slate-100 transition-colors duration-500 placeholder:select-none placeholder:text-neutral-500 focus:border-[#E47320] focus:outline-none"
            >
              <h3 className="text-lg font-semibold mb-5 text-neutral-700 dark:text-neutral-300 font-title">
                Une interface simple
              </h3>
              <p className=" text-sm 2xs:text-md 3xs:text-base font-title text-neutral-600 dark:text-neutral-300">
                Vous avez autre chose à faire qu&apos;apprendre à vous servir
                d&apos;un nouvel outils. SmartFlow, c&apos;est raidy-to-use !
              </p>
              <div
                style={{
                  border: "3px solid RGB(21, 94, 117)",
                  opacity: opacity5,
                  WebkitMaskImage: `radial-gradient(100% 200px at ${position4.x}px ${position4.y}px, black 45%, transparent)`,
                }}
                aria-hidden="true"
                className="w-full h-full pointer-events-none absolute left-0 top-0 z-10 cursor-default rounded-2xl bg-[transparent] p-3.5 opacity-0 transition-opacity duration-500 placeholder:select-none"
              ></div>
            </div>
          </div>
          {/* <div
            ref={(el) => (cardRefs.current[5] = el)}
            onMouseMove={handleMouseMove5}
            onMouseEnter={handleMouseEnter5}
            onMouseLeave={handleMouseLeave5}
            data-aos="fade-up"
            className="relative border-2 border-cyan-300 dark:border-neutral-700 rounded-3xl p-7 shadow-lg shadow-cyan-100 dark:shadow-neutral-950 bg-white dark:bg-neutral-800 max-w-72 my-6 md:m-10"
            id="card-5"
          >
            <h3 className="text-lg font-semibold mb-5 text-neutral-700 dark:text-neutral-300 font-title">
              Collaboration simplifiée
            </h3>
            <p className="text-base font-title text-neutral-600 dark:text-neutral-300">
              Travaillez en équipe de manière plus efficace grâce à nos outils
              de collaboration intégrés.
            </p>
            <div
              style={{
                border: "1px solid rgb(228 115 32)",
                opacity,
                WebkitMaskImage: `radial-gradient(30% 30px at ${position.x}px ${position.y}px, black 45%, transparent)`,
              }}
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 z-10 h-full w-full rounded-3xl bg-[transparent] opacity-0 transition-opacity duration-500"
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default PerksCards;
