import React from "react";
import MainButton from "../components/MainButton";

const add = () => {
  return (
    <div className="flex flex-row justify-center  h-screen align-middle items-center">
      <p>Page Today</p>
      <MainButton label="Réciter" type="normal" disabled={false} href="#" />
    </div>
  );
};

export default add;
