import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

type TitleProps = {
  title: string;
};

const Title: React.FC<TitleProps> = ({ title }) => {
  const titleLabelRef = useRef<HTMLDivElement>(null);
  const [titleLabelWidth, setTitleLabelWidth] = useState<number>(0);

  useEffect(() => {
    if (titleLabelRef.current) {
      setTitleLabelWidth(titleLabelRef.current.offsetWidth);
    }
  }, [title]);

  return (
    <div className="flex flex-col items-center">
      <div
        ref={titleLabelRef}
        className="flex flex-col justify-center font-title font-bold font-primary text-2xl stroke-primary"
        id="titleLabel"
      >
        <p className="stroke-text text-5xl text-primary">{title}</p>
      </div>
      <div
        className="relative h-10 bottom-3"
        id="titleUnderline"
        style={{ width: titleLabelWidth }}
      >
        {/* <Image
          src="/images/titleBrush.png"
          alt="Brush title"
          layout="fill"
          objectFit=""
          className="opacity-30"
        /> */}
      </div>
    </div>
  );
};

export default Title;
