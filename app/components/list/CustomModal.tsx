import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

// Définition des propriétés pour la modale personnalisée
interface CustomModalProps {
  isOpen: boolean; // Si vrai, la modale est ouverte
  onOpenChange: () => void; // Fonction à exécuter lors du changement d'état d'ouverture de la modale
  title: string; // Titre de la modale
  content: React.ReactNode; // Contenu de la modale
}

// Composant de la modale personnalisée
const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onOpenChange,
  title,
  content,
}) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose: () => void) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>
              <p className="text-neutral-800 dark:text-neutral-300">
                {content}
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Fermer
              </Button>
              <Button color="primary" onPress={onClose}>
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
