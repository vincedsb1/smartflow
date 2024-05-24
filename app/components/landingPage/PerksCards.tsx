import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const PerksCards: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 300,
    });

    return () => {
      AOS.refresh(); // Rafraîchit AOS pour s'assurer que tous les éléments sont pris en compte
    };
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-center items-center md:p-4 mb-14 md:mb-28">
      <div className="flex flex-col md:flex-row justify-center w-full max-w-7xl">
        <div
          className="flex flex-col items-center md:m-10"
          id="odd-cards-column"
        >
          <div
            data-aos="fade-up"
            className="border-2 border-cyan-300 dark:border-neutral-700 rounded-3xl p-7 shadow-lg shadow-cyan-100 dark:shadow-neutral-950 bg-white dark:bg-neutral-800 w-72 my-6 md:m-10"
            id="card-0"
          >
            <h3 className="text-lg font-semibold mb-5 text-neutral-700 dark:text-neutral-200 font-title">
              Gagnez un temps fou
            </h3>
            <p className="text-base font-title text-neutral-600 dark:text-neutral-300">
              Dites adieu aux longues heures de bachotage inefficaces. Avec
              SmartFlow, apprenez plus en moins de temps.
            </p>
          </div>
          <div
            data-aos="fade-up"
            className="border-2 border-cyan-300 dark:border-neutral-700 rounded-3xl p-7 shadow-lg shadow-cyan-100 dark:shadow-neutral-950 bg-white dark:bg-neutral-800 w-72 my-6 md:m-10"
            id="card-2"
          >
            <h3 className="text-lg font-semibold mb-5 text-neutral-700 dark:text-neutral-200 font-title">
              Personnalisation sur mesure
            </h3>
            <p className="text-base font-title text-neutral-600 dark:text-neutral-300">
              SmartFlow s&apos;adapte à votre style d&apos;apprentissage et à
              vos objectifs spécifiques, que vous soyez un novice ou un expert.
            </p>
          </div>
          <div
            data-aos="fade-up"
            className="border-2 border-cyan-300 dark:border-neutral-700 rounded-3xl p-7 shadow-lg shadow-cyan-100 dark:shadow-neutral-950 bg-white dark:bg-neutral-800 w-72 my-6 md:m-10"
            id="card-4"
          >
            <h3 className="text-lg font-semibold mb-5 text-neutral-700 dark:text-neutral-200 font-title">
              Tracez votre chemin vers le succès
            </h3>
            <p className="text-base font-title text-neutral-600 dark:text-neutral-300">
              Avec SmartFlow, chaque pas de votre parcours d&apos;apprentissage
              est suivi de près. Vous saurez toujours où vous en êtes et où vous
              allez.
            </p>
          </div>
        </div>
        <div
          className="hidden md:flex flex-col justify-between items-center"
          id="separator-column"
        >
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-10 bg-cyan-300 rounded-full my-2"
              id={`separator-${i}`}
            ></div>
          ))}
        </div>
        <div
          className="flex flex-col items-center m-10 mt-0 md:mt-40"
          id="even-cards-column"
        >
          <div
            data-aos="fade-up"
            className="border-2 border-cyan-300 dark:border-neutral-600 rounded-3xl p-7 shadow-lg shadow-cyan-100 dark:shadow-neutral-950 bg-white dark:bg-neutral-800 w-72 my-6 md:m-10"
            id="card-1"
          >
            <h3 className="text-lg font-semibold mb-5 text-neutral-700 dark:text-neutral-200 font-title">
              Exploitez votre plein potentiel
            </h3>
            <p className="text-base font-title text-neutral-600 dark:text-neutral-300">
              SmartFlow booste vos capacités cérébrales en exploitant la science
              de l&apos;apprentissage optimisé.
            </p>
          </div>
          <div
            data-aos="fade-up"
            className="border-2 border-cyan-300 dark:border-neutral-600 rounded-3xl p-7 shadow-lg shadow-cyan-100 dark:shadow-neutral-950 bg-white dark:bg-neutral-800 w-72 my-6 md:m-10"
            id="card-3"
          >
            <h3 className="text-lg font-semibold mb-5 text-neutral-700 dark:text-neutral-200 font-title">
              Une mémorisation durable
            </h3>
            <p className="text-base font-title text-neutral-600 dark:text-neutral-300">
              Ce que vous apprenez avec notre méthode reste gravé dans votre
              mémoire à long terme, sans efforts !
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerksCards;
