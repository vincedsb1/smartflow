import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBrain, faClock, faCheck } from "@fortawesome/free-solid-svg-icons";

const PrinciplesFeaturesSection: React.FC = () => {
  return (
    <div
      id="PrinciplesFeaturesSection"
      className="flex flex-col md:flex-row justify-around items-center mb-14 md:mb-28 max-w-[1200px]"
    >
      <div
        id="active-learning"
        className="flex flex-col items-center text-center p-4 max-w-80"
      >
        <FontAwesomeIcon
          icon={faBrain}
          size="3x"
          className="text-primary-400 dark:text-primary-600 mb-4"
        />
        <h3 className="font-title font-bold text-lg dark:text-neutral-300 text-dark-primary">
          Apprentissage actif
        </h3>
        <p className="font-text dark:text-neutral-400 text-neutral-800">
          Pas de simple relecture passive. Votre cerveau est stimulé par des
          rappels réguliers pour consolider les connaissances.
        </p>
      </div>
      <div
        id="spaced-repetition"
        className="flex flex-col items-center text-center p-4  max-w-80"
      >
        <FontAwesomeIcon
          icon={faClock}
          size="3x"
          className="text-primary-400 dark:text-primary-600 mb-4"
        />
        <h3 className="font-title font-bold text-lg dark:text-neutral-300 text-dark-primary">
          Répétitions espacées
        </h3>
        <p className="font-text dark:text-neutral-400 text-neutral-800">
          Pas de simple relecture passive. Votre cerveau est stimulé par des
          rappels réguliers pour consolider les connaissances.
        </p>
      </div>
      <div
        id="desirable-difficulty"
        className="flex flex-col items-center text-center p-4  max-w-80"
      >
        <FontAwesomeIcon
          icon={faCheck}
          size="3x"
          className="text-primary-400 dark:text-primary-600 mb-4"
        />
        <h3 className="font-title font-bold text-lg dark:text-neutral-300 text-dark-primary">
          Zone de difficulté idéale
        </h3>
        <p className="font-text dark:text-neutral-400 text-neutral-800">
          Les défis sont calibrés pour rester dans la &quot;zone de difficulté
          désirable&quot;, où votre mémoire est sollicitée au maximum.
        </p>
      </div>
    </div>
  );
};

export default PrinciplesFeaturesSection;
