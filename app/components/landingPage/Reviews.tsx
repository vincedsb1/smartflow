import React from "react";
import Review from "./Review";
import Title from "./Title";

const Reviews = () => {
  return (
    <div
      id="reviewsMainContainer"
      className="w-full flex flex-col items-center"
    >
      <div
        id="titleContainer"
        className="flex flex-row w-full mb-16 justify-center"
      >
        <Title title="Ce que nos client·es pensent de nous" />
      </div>
      <div
        id="reviewsContainer"
        className="w-full flex flex-wrap justify-between max-w-4xl"
      >
        <Review
          name="Christine"
          jobTitle="Étudiante"
          consumerPhoto="/images/consummer001.png"
          review="Grâce à SmartFlow, j'ai enfin pu maîtriser mes révisions. La méthode est super efficace et j'apprends plus rapidement que jamais !"
          grade={5}
        />
        <Review
          name="Vincent"
          jobTitle="Développeur"
          consumerPhoto="/images/consummer002.png"
          review="
          J'utilise SmartFlow depuis quelques mois et je vois déjà une énorme différence. Mon temps d'apprentissage est optimisé et je retiens mieux."
          grade={5}
        />
        <Review
          name="Thibaud"
          jobTitle="Développeur"
          consumerPhoto="/images/consummer003.png"
          review="SmartFlow a transformé ma manière d'apprendre. Les rappels sont bien pensés et j'adore le suivi de progression. Un must pour réviser."
          grade={5}
        />
        <Review
          name="Julie"
          jobTitle="Assistante Maternelle"
          consumerPhoto="/images/consummer004.png"
          review="La méthode Leitner de SmartFlow m'a vraiment aidé à structurer mes révisions. C'est simple, efficace et mes notes se sont améliorées."
          grade={5}
        />
      </div>
    </div>
  );
};

export default Reviews;
