"use client";

import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import AddCategory from "../AddCategory";

// Définition des propriétés pour la modale personnalisée
interface CustomModalProps {
  isOpen: boolean; // Si vrai, la modale est ouverte
  onOpenChange: () => void; // Fonction à exécuter lors du changement d'état d'ouverture de la modale
  title: string; // Titre de la modale
  content: React.ReactNode; // Contenu de la modale
  onValidate: (categoryName: string) => void;
  // Fonction à exécuter lors de la validation de la modale
}

// Composant de la modale personnalisée
const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onOpenChange,
  title,
  content,
  onValidate,
}) => {
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    if (React.isValidElement(content) && content.type === AddCategory) {
      setCategoryName(content.props.categoryName);
      console.log(
        "CustomModal.tsx - Category name from content props:",
        content.props.categoryName
      );
    }
  }, [content]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose: () => void) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>{content}</ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Fermer
              </Button>
              <Button
                color="primary"
                onPress={() => {
                  onClose();
                  console.log(
                    "CustomModal.tsx - Validating with category name:",
                    categoryName
                  );
                  onValidate(categoryName);
                }}
              >
                Valider
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
