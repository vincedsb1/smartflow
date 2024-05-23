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
    <div className="flex justify-center items-center p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {perks.map((perk, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-6 shadow-md"
          >
            <h3 className="text-lg font-semibold mb-2">{perk.title}</h3>
            <p className="text-base">{perk.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerksCards;
