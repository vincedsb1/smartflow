"use client";

// Importations de bibliothèques et de composants
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState, useCallback } from "react";
import List from "../../components/List";
import { UserContext } from "@/app/context/UserContext";
import { CircularProgress } from "@nextui-org/react";
import Link from "next/link";
import BelowListLink from "../../components/list/BelowListLink";
import { useDisclosure } from "@nextui-org/react";
import { colorClasses } from "../../components/utils/colorUtils";
import AddCategoryModal from "../../components/category/AddCategoryModal";

// Définition des interfaces
interface Category {
  id: number;
  name: string;
  colorName: string;
}

interface OrganizeCategoriesProps {}

// Définition du composant
const OrganizeCategories: React.FC<OrganizeCategoriesProps> = ({}) => {
  // Déclaration des états
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const userContext = useContext(UserContext);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  // Fonction pour récupérer les catégories
  const fetchCategories = useCallback(async () => {
    if (!userContext || !userContext.token || !userContext.user) {
      console.error("User or token is not defined");
      setIsError(true);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/categories", {
        headers: {
          Authorization: `Bearer ${userContext.token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setCategories(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setIsError(true);
      setIsLoading(false);
    }
  }, [userContext]);

  // Utilisation de l'effet pour récupérer les catégories au chargement du composant
  useEffect(() => {
    if (userContext && userContext.token && userContext.user) {
      fetchCategories();
    }
  }, [fetchCategories, userContext]);

  // Fonction pour gérer la création d'une catégorie
  const handleCategoryCreation = (categoryName: string, colorId: number) => {
    const colorName = Object.keys(colorClasses)[colorId - 1];

    setCategories((prevCategories) => [
      ...prevCategories,
      { id: Date.now(), name: categoryName, colorName: colorName },
    ]);
    onClose();
  };

  // Affichage d'un spinner de chargement si les données sont en cours de chargement
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-row justify-center items-center w-full">
        <CircularProgress aria-label="Loading..." />
      </div>
    );
  }

  // Affichage d'un message d'erreur si une erreur s'est produite lors de la récupération des données
  if (isError) {
    return <div>Error</div>;
  }

  // Préparation des données pour le composant List
  const rows = categories.map((category) => ({
    mainLabel: category.name,
    color: category.colorName,
  }));

  // Affichage du composant
  return (
    <div
      id="organizeMainContainer"
      className="flex flex-col justify-between min-h-screen w-full"
    >
      <div
        id="organizeContainer"
        className="flex flex-col justify-center w-full"
      >
        <div id="themeSwitcherBackIcon" className="w-full flex flex-col mt-16">
          <Link href="/organize">
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="text-neutral-800 dark:text-neutral-200 text-xs w-4 h-4 m-5"
            />
          </Link>
        </div>
        <div id="organizeList" className="">
          <List rows={rows} title="Catégories" isLargeRow={false} />
          <BelowListLink onClick={onOpen}>Ajouter une catégorie</BelowListLink>
        </div>
      </div>
      <AddCategoryModal
        isOpen={isOpen}
        onClose={onClose}
        onValidate={handleCategoryCreation}
      />
    </div>
  );
};

// Exportation du composant
export default OrganizeCategories;
