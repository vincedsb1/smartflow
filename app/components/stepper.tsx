import React from "react";

interface StepperProps {
  currentStep: number;
  numberOfSteps: number;
}

export default function Stepper({ currentStep, numberOfSteps }: StepperProps) {
  const activeColor = (index: number) =>
    currentStep >= index
      ? "bg-cyan-500 dark:bg-cyan-600"
      : "border-2 border-neutral-300 bg-transparent dark:border-neutral-700";
  const barColor = (index: number) =>
    currentStep >= index
      ? "bg-cyan-400 dark:bg-cyan-700"
      : "bg-neutral-300 dark:bg-neutral-700";

  return (
    <div className="flex justify-between items-center w-48">
      {Array.from({ length: numberOfSteps }).map((_, index) => (
        <React.Fragment key={index}>
          <div className={`w-5 h-5 rounded-full ${activeColor(index)}`}></div>
          {index < numberOfSteps - 1 && (
            <div
              className={`flex-grow h-0.5 mx-1 ${barColor(index + 1)}`}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
