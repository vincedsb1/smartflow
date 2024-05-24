import React from "react";

const perks = [
  {
    title: "Gagnez un temps fou",
    description:
      "Dites adieu aux longues heures de bachotage inefficaces. Avec SmartFlow, apprenez plus en moins de temps.",
  },
  {
    title: "Exploitez votre plein potentiel",
    description:
      "SmartFlow booste vos capacités cérébrales en exploitant la science de l'apprentissage optimisé.",
  },
  {
    title: "Personnalisation sur mesure",
    description:
      "SmartFlow s'adapte à votre style d'apprentissage et à vos objectifs spécifiques, que vous soyez un novice ou un expert.",
  },
  {
    title: "Une mémorisation durable",
    description:
      "Ce que vous apprenez avec notre méthode reste gravé dans votre mémoire à long terme, sans efforts !",
  },
  {
    title: "Tracez votre chemin vers le succès",
    description:
      "Avec SmartFlow, chaque pas de votre parcours d'apprentissage est suivi de près. Vous saurez toujours où vous en êtes et où vous allez.",
  },
];

const PerksCards: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center p-4 mb-28">
      <div className="flex flex-col md:flex-row justify-center w-full max-w-7xl">
        <div className="flex flex-col items-center m-10" id="odd-cards-column">
          {perks
            .filter((_, index) => index % 2 === 0)
            .map((perk, index) => (
              <div
                key={index}
                className="border-2 border-cyan-300 dark:border-neutral-700 rounded-3xl p-7 shadow-lg shadow-cyan-100 dark:shadow-neutral-950 bg-white dark:bg-neutral-800 w-72 m-10"
                id={`card-${index}`}
              >
                <h3 className="text-lg font-semibold mb-5 text-neutral-700 dark:text-neutral-200 font-title">
                  {perk.title}
                </h3>
                <p className="text-base font-title text-neutral-600 dark:text-neutral-300">
                  {perk.description}
                </p>
              </div>
            ))}
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
          className="flex flex-col items-center m-10 mt-40"
          id="even-cards-column"
        >
          {perks
            .filter((_, index) => index % 2 !== 0)
            .map((perk, index) => (
              <div
                key={index}
                className="border-2 border-cyan-300 dark:border-neutral-600 rounded-3xl p-7 shadow-lg shadow-cyan-100 dark:shadow-neutral-950 bg-white dark:bg-neutral-800 w-72 m-10"
                id={`card-${index}`}
              >
                <h3 className="text-lg font-semibold mb-5 text-neutral-700 dark:text-neutral-200 font-title">
                  {perk.title}
                </h3>
                <p className="text-base font-title text-neutral-600 dark:text-neutral-300">
                  {perk.description}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PerksCards;
