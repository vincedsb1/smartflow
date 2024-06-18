"use client";
import React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

const MidPageGraphic = () => {
  const { theme } = useTheme();

  return (
    <div
      id="MidPageGraphic"
      className="flex flex-col md:flex-row justify-around items-center mb-14 md:mb-28 px-8"
    >
      <Image
        src={
          theme === "dark"
            ? "/MidPageGraphic-dark.svg"
            : "/MidPageGraphic-light.svg"
        }
        alt="Mid Page Graphic"
        width={500}
        height={500}
      />
    </div>
  );
};

export default MidPageGraphic;
