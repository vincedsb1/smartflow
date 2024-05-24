import React from "react";

type TitleProps = {
  title: string;
};

const Title: React.FC<TitleProps> = ({ title }) => {
  return (
    <div className="flex flex-col items-center">
      <div
        className="flex flex-col justify-center font-title font-bold font-primary stroke-primary"
        id="titleLabel"
      >
        <p className="text-lg 2xs:text-xl 3xs:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl text-primary">
          {title}
        </p>
      </div>
    </div>
  );
};

export default Title;