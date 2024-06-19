/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { useTheme } from "next-themes";

const MidPageGraphic = () => {
  const { theme } = useTheme();

  return (
    <div
      id="MidPageGraphic"
      className="flex flex-col md:flex-row justify-around items-center mb-14 md:mb-28 px-8"
    >
      <div className="relative w-[500px] h-[500px]">
        <img
          src={
            theme === "dark"
              ? "/MidPageGraphic-dark.svg"
              : "/MidPageGraphic-light.svg"
          }
          alt="Mid Page Graphic"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default MidPageGraphic;