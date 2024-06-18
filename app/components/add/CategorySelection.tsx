"use Client";

import { faTag } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState, useCallback } from "react";
import List from "../../components/List";
import { UserContext } from "@/app/context/UserContext";
import CardAppText from "../CardAppText";
import CardAppTitle from "../CardAppTitle";
import { CircularProgress } from "@nextui-org/react";
import BelowListLink from "../list/BelowListLink";
import AddCategoryModal from "../category/AddCategoryModal";
import { useDisclosure } from "@nextui-org/react";
import { colorClasses } from "../utils/colorUtils";

interface Category {
  id: number;
  name: string;
  colorName: string;
}

interface CategorySelectionProps {
  onCategoryChange: (id: number) => void;
}

const CategorySelection: React.FC<CategorySelectionProps> = ({
  onCategoryChange,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const userContext = useContext(UserContext);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const [isTokenLoaded, setIsTokenLoaded] = useState<boolean>(false);

  if (!userContext) {
    throw new Error("UserContext must be used within a UserContextProvider");
  }

  useEffect(() => {
    // Vérifiez si le token est disponible
    if (userContext.token) {
      setIsTokenLoaded(true);
    }
  }, [userContext.token]);

  useEffect(() => {
    // Ne faire la requête fetch que si le token est chargé
    if (isTokenLoaded) {
      fetch("/api/categories", {
        headers: {
          Authorization: `Bearer ${userContext.token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setCategories(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error:", error);
          setIsError(true);
          setIsLoading(false);
        });
    }
  }, [isTokenLoaded, userContext.token]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-row justify-center items-center w-full">
        <CircularProgress aria-label="Loading..." />
      </div>
    );
  }

  if (isError) {
    return <div>Error</div>;
  }

  const handleCategoryCreation = (categoryName: string, colorId: number) => {
    // Trouvez le nom de la couleur correspondant à l'ID de couleur
    const colorName = Object.keys(colorClasses)[colorId - 1];

    setCategories((prevCategories) => [
      ...prevCategories,
      { id: Date.now(), name: categoryName, colorName: colorName },
    ]);
    onClose();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-row justify-center items-center w-full">
        <CircularProgress aria-label="Loading..." />
      </div>
    );
  }

  if (isError) {
    return <div>Error</div>;
  }

  const rows = categories.map((category) => ({
    mainLabel: category.name,
    color: category.colorName,
    onClick: () => {
      setSelectedCategoryId(category.id);
      onCategoryChange(category.id);
    },
  }));

  return (
    <div id="addMainContainer" className="flex flex-col justify-between w-full">
      <div id="addTopContainer" className="flex flex-col justify-center w-full">
        <div
          id="addHeaderContainer"
          className="flex flex-col justify-center items-center w-full "
        >
          <div id="addTitle" className="flex flex-col w-18/20 ">
            <CardAppTitle title="Nouvelle fiche" size="big" />
          </div>
          <div id="addHint" className="flex flex-col items-center w-18/20 mb-8">
            <CardAppText
              text="Dans quelle catégorie voulez-vous ranger la fiche ?"
              icon={faTag}
            />
          </div>
          <div id="categoryList" className="w-full mb-8">
            <List
              rows={rows}
              title="Catégories"
              isLargeRow={false}
              selectable={true}
            />
            <BelowListLink onClick={onOpen}>
              Ajouter une catégorie
            </BelowListLink>
          </div>
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

export default CategorySelection;
