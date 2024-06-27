"use client";

// Importation des dépendances
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useState } from "react";
import CustomModal from "./list/CustomModal";
import { getColorClass, colorClasses, Color } from "./utils/colorUtils";
import ListTitle from "./list/ListTitle";
import useRowSelection from "./list/useRowSelection";
import BelowListLink from "./list/BelowListLink";

// Définition des propriétés pour une ligne de la liste
interface ListRowProps {
  color?: Color; // Couleur de l'indicateur de couleur
  mainLabel: string; // Label principal
  secondaryLabel?: string | null; // Label secondaire
  icon?: IconDefinition; // Icône à afficher
  bgcolor?: string; // Couleur de fond
  link?: string; // Lien vers lequel rediriger lors du clic
  colorState?: "normal" | "desactivated" | "warning"; // État de la couleur (normal, désactivé, avertissement)
  isModal?: boolean; // Si vrai, ouvre une modale lors du clic
  modalTitle?: string; // Titre de la modale
  modalContent?: string; // Contenu de la modale
  onClick?: () => void; // Fonction à exécuter lors du clic
  selected?: boolean; // Si vrai, la ligne est sélectionnée
  token?: string; // Token d'authentification
  userId?: string; // Identifiant de l'utilisateur
}

// Définition des propriétés pour la liste
interface ListProps {
  rows: ListRowProps[]; // Lignes de la liste
  title?: string; // Titre de la liste
  isLargeRow: boolean; // Si vrai, les lignes sont plus grandes
  belowListLink?: string; // Lien à afficher en dessous de la liste
  onBelowListLinkClick?: () => void; // Fonction à exécuter lors du clic sur le lien en dessous de la liste
  isModal?: boolean; // Si vrai, ouvre une modale lors du clic sur une ligne
  modalIsOpen?: boolean;
  setModalIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setModalTitle?: React.Dispatch<React.SetStateAction<string>>;
  setModalContent?: React.Dispatch<React.SetStateAction<string>>;
  modalTitle?: string;
  modalContent?: string;
  selectable?: boolean; // Si vrai, les lignes sont sélectionnables
  onSelect?: (index: number) => void; // Fonction à exécuter lors de la sélection d'une ligne
  token?: string; // Token d'authentification
  userId?: string; // Identifiant de l'utilisateur
  selectedIndex?: number | null;
}

// Composant de la liste
const List: React.FC<ListProps> = ({
  rows,
  title,
  isLargeRow,
  belowListLink,
  onBelowListLinkClick,
  modalIsOpen,
  setModalIsOpen,
  setModalTitle,
  setModalContent,
  modalTitle,
  modalContent,
  selectable = false,
  onSelect,
  token,
  userId,
  selectedIndex,
}) => {
  const { selectedRow, handleRowSelection } = useRowSelection(selectedIndex);

  const isOpen = modalIsOpen || false; // État d'ouverture de la modale

  // Fonction à exécuter lors du clic sur le lien en dessous de la liste
  const handleBelowListLinkClick = () => {
    if (setModalIsOpen) {
      setModalIsOpen(true);
    }
    if (setModalTitle) {
      setModalTitle("Titre de la modale pour BelowListLink");
    }
    if (setModalContent) {
      setModalContent("Contenu de la modale pour BelowListLink");
    }
    if (onBelowListLinkClick) {
      onBelowListLinkClick();
    }
  };
  return (
    <div id="ListContainer" className="flex flex-col mx-5 w-full">
      <ListTitle title={title || ""} />
      <div
        id="ListContainer"
        className="flex flex-col bg-white dark:bg-neutral-800 rounded-xl shadow-sf md:w-full lg:w-full"
      >
        {rows.map((row, index) => {
          const RowComponent = row.isModal ? "div" : Link;
          return (
            <RowComponent
              href={row.link || ""}
              key={index}
              onClick={
                selectable
                  ? () => {
                      console.log("RowComponent onClick index:", index);
                      handleRowSelection(index);
                      onSelect && onSelect(index);
                      row.onClick && row.onClick();
                      console.log("Index de la ligne sélectionnée : ", index);
                    }
                  : row.isModal
                  ? () => {
                      if (setModalIsOpen) {
                        setModalIsOpen(true);
                      }
                      if (setModalTitle) {
                        setModalTitle(row.modalTitle || "");
                      }
                      if (setModalContent) {
                        setModalContent(row.modalContent || "");
                      }
                    }
                  : row.onClick
              }
            >
              <div
                key={index}
                id="ListRow"
                className={`flex flex-row hover:bg-cyan-200 dark:hover:bg-cyan-900 ${
                  isLargeRow ? "h-16" : "h-12"
                } ${row.bgcolor || ""} ${index === 0 ? "mt-3" : ""} ${
                  index === rows.length - 1 ? "mb-3" : ""
                } ${getColorClass(row.colorState)} ${
                  selectable && selectedRow === index
                    ? "bg-cyan-300 dark:bg-cyan-700"
                    : ""
                }`}
              >
                <div
                  id="ListRowStartIconContainer"
                  className={`flex flex-row justify-center items-center ${
                    row.color ? "w-3/20 min-w-10" : "w-1/20 mr-1"
                  }`}
                >
                  {row.color && (
                    <div
                      id="colorIndicator"
                      className={`h-3 w-3 rounded-full ${
                        colorClasses[row.color]
                      }`}
                    ></div>
                  )}
                </div>
                <div
                  id="ListRowLabels"
                  className={`flex flex-col flex-grow justify-center ${
                    rows.length > 1 && index !== rows.length - 1
                      ? "border-b border-neutral-200 dark:border-neutral-700"
                      : ""
                  }`}
                >
                  <div
                    id="ListRowTopLabel"
                    className="font-text line-clamp-2 w-60"
                  >
                    {row.mainLabel}
                  </div>
                  {row.secondaryLabel && (
                    <div
                      id="ListRowBottomLabel"
                      className="font-text text-neutral-400 dark:text-neutral-500"
                    >
                      {row.secondaryLabel}
                    </div>
                  )}
                </div>
                <div
                  id="ListRowEndIcon"
                  className={`w-3/20  flex flex-row justify-center items-center ${
                    rows.length > 1 && index !== rows.length - 1
                      ? "border-b border-neutral-200 dark:border-neutral-700"
                      : ""
                  }`}
                >
                  {row.icon && (
                    <FontAwesomeIcon
                      icon={row.icon}
                      className=" text-xs w-4 h-4"
                    />
                  )}
                </div>
              </div>
            </RowComponent>
          );
        })}
      </div>
      {belowListLink && (
        <BelowListLink onClick={handleBelowListLinkClick}>
          {belowListLink}
        </BelowListLink>
      )}
      <CustomModal
        isOpen={modalIsOpen || false}
        onOpenChange={() => {
          if (setModalIsOpen) {
            setModalIsOpen(!modalIsOpen);
          }
        }}
        title={modalTitle || ""}
        content={modalContent}
        onValidate={() => {}}
        token={token || ""}
        userId={userId || ""}
      />
    </div>
  );
};

export default List;
