import React from "react";

type TitleProps = {
  title: string;
  size?: "medium" | "big"; // Ajout de la nouvelle propriété avec ses types possibles
};

const Title: React.FC<TitleProps> = ({ title, size = "medium" }) => {
  // Définition des classes conditionnelles basées sur la propriété size
  const textSizeClass =
    size === "big"
      ? "text-2xl 2xs:text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl "
      : "text-lg 2xs:text-xl 3xs:text-2xl md:text-3xl lg:text-4xl xl:text-5xl";

  return (
    <div className="flex flex-col items-center">
      <div
        className={`flex flex-col justify-center font-title font-bold font-primary stroke-primary`}
        id="titleLabel"
      >
        <p className={`${textSizeClass} text-cyan-900 dark:text-cyan-400`}>
          {title}
        </p>
      </div>
    </div>
  );
};

export default Title;
