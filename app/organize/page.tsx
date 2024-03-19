import React from "react";
import MainButton from "../components/MainButton";
import List from "../components/List-old";

const add = () => {
  return (
    <div className="flex flex-col justify-center w-7/10 h-screen align-middle items-center mx-auto">
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
      <MainButton label="Enregistrer" type="normal" disabled={false} />
    </div>
  );
};

export default add;
