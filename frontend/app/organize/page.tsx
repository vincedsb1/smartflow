import React from "react";
import MainButton from "../components/MainButton";

const add = () => {
  return (
    <div className="flex flex-row justify-center  h-screen align-middle items-center">
      <p>Page organize</p>
      <MainButton label="Enregistrer" type="normal" disabled={false} href="#" />
    </div>
  );
};

export default add;
