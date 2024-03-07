// Dans votre composant Add
"use client";
import React from "react";
import MainButton from "../components/MainButton";

const Add = () => {
  return (
    <div className="flex flex-row justify-center h-screen align-middle items-center">
      <p>Page add</p>

      <MainButton label="Ajouter une fiche" type="normal" disabled={false} />
    </div>
  );
};

export default Add;
