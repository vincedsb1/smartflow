import React, { ReactNode } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

interface CustomModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  title: string;
  content: ReactNode;
  onSave?: () => void; 
}

const CustomModalColorsList: React.FC<CustomModalProps> = ({
  isOpen,
  onOpenChange,
  title,
  content,
  onSave, 
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
              {onSave && ( 
                <Button color="primary" onPress={() => {
                  onSave();
                  onClose();
                }}>
                  Enregistrer la catégorie
                </Button>
              )}
              {!onSave && ( 
                <Button color="primary" onPress={onClose}>
                  Enregistrer la catégorie
                </Button>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CustomModalColorsList;
