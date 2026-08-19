"use client";

import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useUser } from "../../context/UserContext";
import { useRouter } from "next/navigation";

// Définition des propriétés pour la modale personnalisée
interface CustomModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  title: string;
  content: React.ReactNode;
  onValidate: (categoryName: string) => void;
  token: string,
  userId: string;
}

// Composant de la modale personnalisée
const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onOpenChange,
  title,
  content,
  onValidate,
  token,
}) => {
  const { id: userId } = useUser();

  // Fonction pour supprimer un utilisateur
  async function deleteUser(userId: string, token: string) {
    if (isNaN(Number(userId))) {
      throw new Error("User ID must be a number");
    }

    const response = await fetch(`api/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  const router = useRouter();


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
    onPress={async () => {
      onClose();
      try {
        if (userId) {
          await deleteUser(userId, token);
          router.push('/');
        } else {
          throw new Error('User ID is null');
        }
      } catch (error) {
        console.error('There was an error!', error);
      }
      onValidate("");
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
