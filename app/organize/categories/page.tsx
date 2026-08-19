"use client";

// Importations de bibliothèques et de composants
import {
  faChevronLeft,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import List from "../../components/List";
import { UserContext } from "@/app/context/UserContext";
import { CircularProgress } from "@nextui-org/react";
import Link from "next/link";
import BelowListLink from "../../components/list/BelowListLink";
import { useDisclosure } from "@nextui-org/react";
import { colorClasses } from "../../components/utils/colorUtils";
import AddCategoryModal from "../../components/category/AddCategoryModal";
import DesktopMenu from "../../components/DesktopMenu";
import CardAppText from "../../components/CardAppText";
import { Button } from "@nextui-org/react";

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

  if (!userContext) {
    throw new Error("UserContext must be used within a UserContextProvider");
  }

  useEffect(() => {
    // Ne faire la requête fetch que si le token est disponible
    if (userContext.token) {
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
  }, [userContext.token]);

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
    const colorName = Object.keys(colorClasses)[colorId - 1];

    setCategories((prevCategories) => [
      ...prevCategories,
      { id: Date.now(), name: categoryName, colorName: colorName },
    ]);
    onClose();
  };

  const rows = categories.map((category) => ({
    link:
      "/organize/categories/review?id=" +
      category.id +
      "&nbcategories=" +
      categories.length,
    mainLabel: category.name,
    color: category.colorName,
  }));

  return (
    <div className="flex flex-row justify-center items-center">
      <div className="w-full sm:max-w-[1170px]  bg-neutral-200 dark:bg-neutral-700 sm:shadow-2xl sm:shadow-neutral-200 sm:dark:shadow-black flex flex-row ">
        <div className="hidden sm:block">
          <DesktopMenu />
        </div>
        <div
          id="organizeMainContainer"
          className="flex flex-col justify-between min-h-screen  w-full sm:ml-48 md:ml-72"
        >
          <div
            id="organizeContainer"
            className="flex flex-col justify-between w-full items-center sm:px-10 flex-grow "
          >
            {rows.length > 0 ? (
              <>
                <div
                  id="organizeCategoriesBackIcon"
                  className="w-full flex flex-col mt-16 "
                >
                  <Link href="/organize">
                    <FontAwesomeIcon
                      icon={faChevronLeft}
                      className="text-neutral-800 dark:text-neutral-200 text-xs w-4 h-4 m-5 sm:ml-0"
                    />
                  </Link>
                  <List rows={rows} title="Catégories" isLargeRow={false} />
                  <BelowListLink onClick={onOpen}>
                    Ajouter une catégorie
                  </BelowListLink>
                </div>
                <div id="organizeCategoriesMiddle" className=""></div>
                <div id="organizeCategoriesBottom" className=""></div>
              </>
            ) : (
              <>
                <div
                  id="organizeCategoriesBackIcon"
                  className="w-full flex flex-col mt-16 "
                >
                  <Link href="/organize">
                    <FontAwesomeIcon
                      icon={faChevronLeft}
                      className="text-neutral-800 dark:text-neutral-200 text-xs w-4 h-4 m-5 sm:ml-0"
                    />
                  </Link>
                </div>
                <div
                  id="organizeCategoriesMiddle"
                  className=" flex flex-col items-center  h-2/5"
                >
                  <div
                    id="OrganizeCategorieHintContainer"
                    className="w-18/20 sm:w-full mb-10"
                  >
                    <CardAppText
                      text="Aucune catégorie"
                      icon={faMagnifyingGlass}
                      colorVariant
                      shadow
                    />
                  </div>
                  <Button
                    type="button"
                    onClick={onOpen}
                    color="primary"
                    variant="solid"
                    size="lg"
                    className="w-18/20 sm:w-full font-bold font-text"
                  >
                    Ajouter une catégorie
                  </Button>
                </div>
                <div
                  id="organizeCategoriesBottom"
                  className="bg-blue-700"
                ></div>
              </>
            )}
          </div>
          <AddCategoryModal
            isOpen={isOpen}
            onClose={onClose}
            onValidate={handleCategoryCreation}
          />
        </div>
      </div>
    </div>
  );
};

export default OrganizeCategories;
