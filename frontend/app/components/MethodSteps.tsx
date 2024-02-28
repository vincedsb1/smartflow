"use client";
import React from "react";
import Image from "next/image";

interface MethodStepsProps {
  title: string;
  text: string;
  image: string;
}

function MethodSteps({ title, text, image }: MethodStepsProps) {
  return (
    <div
      className="flex flex-col justify-center items-center h-screen mb-20"
      id="main-container"
    >
      <div id="title">
        <h1 className="text-neutral-800 font-bold mb-10 text-2xl">{title}</h1>
      </div>
      <div
        id="card-explanations"
        className="bg-neutral-50 rounded-3xl w-80 h-28 mb-10 flex justify-center items-center"
      >
        <p
          className="text-neutral-800 font-quicksand text-xl p-3 text-center"
          id="tex-card"
        >
          {text}
        </p>
      </div>
      <div id="logo-explanations">
        <Image width={159} height={164} src={image} alt="logo" />
      </div>
      <div id="progress-chart">{/* barre de progression */}</div>
    </div>
  );
}

export default MethodSteps;
