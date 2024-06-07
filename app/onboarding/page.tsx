import React from "react";
import MethodSteps from "../components/MethodSteps";
import { UserContext } from "../context/UserContext";

const add = () => {
  return (
    <div className="flex flex-col justify-between h-screen w-full">
      <MethodSteps />
    </div>
  );
};

export default add;
