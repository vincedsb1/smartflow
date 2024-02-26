import React from "react";
import MainButton from "../components/MainButton";
import List from "../components/List";

const add = () => {
  return (
    <div className="flex flex-row justify-center  h-screen align-middle items-center">
      <List
        title="Catégories"
        size="large"
        hasAddButton={true}
        isItemSelectable={true}
        itemClickAction="navigate"
        titleButton="Ajouter une catégorie"
      >
        <div>Histoire</div>
        <div>Science</div>
        <div>Art</div>
        <div>Mathématiques</div>
      </List>

      <MainButton label="Enregistrer" type="normal" disabled={false} href="#" />
    </div>
  );
};

export default add;
