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
        <p className="stroke-text xs:text-xl 2xs:text-2xl text-lg text-primary">
          {title}
        </p>
      </div>
    </div>
  );
};

export default Title;
