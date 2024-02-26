"use client";
import React from "react";

// Définition des types de propriétés acceptées par le composant List
interface ListProps {
  title?: string; // Titre de la liste (optionnel)
  size?: "small" | "large"; // Taille de la liste (petite ou grande)
  leadingIcon?: React.ReactNode; // Icône à afficher à gauche de chaque élément de la liste
  trailingIcon?: React.ReactNode; // Icône à afficher à droite de chaque élément de la liste
  itemClickAction?: "select" | "navigate"; // Action à effectuer lors du clic sur un élément de la liste (sélectionner ou naviguer)
  hasAddButton?: boolean; // Indique si un bouton d'ajout doit être affiché
  isItemSelectable?: boolean; // Indique si les éléments de la liste sont sélectionnables
  secondaryInfo?: boolean; // Indique si des informations secondaires doivent être affichées
  children: React.ReactNode; // Contenu de la liste (éléments enfants)
  titleButton?: string; // Texte du bouton d'ajout
}

// Définition du composant List en tant que fonction composant React
const List: React.FC<ListProps> = ({
  title,
  size,
  leadingIcon,
  trailingIcon,
  itemClickAction,
  hasAddButton,
  isItemSelectable,
  secondaryInfo,
  children,
  titleButton,
}) => {
  // Fonction de gestion du clic sur un élément de la liste
  const handleItemClick = (item: React.ReactNode) => {
    if (itemClickAction === "select") {
      // Action à effectuer en cas de sélection d'un élément
    } else if (itemClickAction === "navigate") {
      // Action à effectuer en cas de navigation vers un autre élément
    }
  };

  // Fonction de gestion du clic sur le bouton d'ajout
  const handleAddButtonClick = () => {
    // Action à effectuer lors du clic sur le bouton d'ajout
  };

  // Détermination de la taille de la liste en fonction de la valeur de la prop "size"
  const listSize = size === "large" ? "h-16" : "h-12";

  // Retourne le rendu du composant
  return (
    <div id="list-main-container" className="w-4/5 mx-auto">
      <div id="title-list">
        {title && (
          <h2 className="text-xl font-bold text-neutral-600 pr-1 pb-2 ">
            {title}
          </h2>
        )}
      </div>
      <div
        id="items-container"
        className=" bg-gray-50 rounded-3xl flex flex-col "
      >
        {React.Children.map(children, (child, index) => (
  <div
    id={`item-${index}`}
    className={`list ${listSize} font-quicksand-500 font-bold text-neutral-500 items-center ${
      index === 0 ? "mt-4" : ""
    }`}
  >
    <div
      onClick={() => handleItemClick(child)}
      className="flex flex-row items-center space-x-2 h-10"
    >
      <div className="bg-blue-500 h-3 w-3 rounded-full ml-2 mr-1 "></div>
      {leadingIcon && <div>{leadingIcon}</div>}
      <div id="item-list" className="h-full flex items-center">
        {child}
      </div>
      {trailingIcon && <div className="p-2">{trailingIcon}</div>}
    </div>
    {children && index !== React.Children.count(children) - 1 && (
      <div className="border-t border-neutral-200 ml-auto mr-0 w-11/12 mt-2"></div>
    )}
  </div>
))}
      </div>
      <div id="add-button-container" className="flex justify-end">
        {hasAddButton && (
          <button
            onClick={handleAddButtonClick}
            className="px-4 py-2 text-blue-500 rounded font-normal"
          >
            {titleButton}
          </button>
        )}
      </div>
    </div>
  );
};

{
  /*Exporte le composant pour qu'il puisse être utilisé ailleurs*/
}
export default List;
