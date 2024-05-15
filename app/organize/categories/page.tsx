"use client";

import {
  faChevronLeft,
  faChevronRight,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState, useCallback } from "react";
import List from "../../components/List";
import { UserContext } from "@/app/context/UserContext";
import { CircularProgress } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BelowListLink from "../../components/list/BelowListLink";
import { useDisclosure } from "@nextui-org/react";
import { colorClasses } from "../../components/utils/colorUtils";
import AddCategoryModal from "../../components/category/AddCategoryModal";

interface Category {
  id: number;
  name: string;
  colorName: string;
}

interface OrganizeCategoriesProps {
  onCategoryChange: (id: number) => void;
}

const OrganizeCategories: React.FC<OrganizeCategoriesProps> = ({
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

  useEffect(() => {
    if (userContext && userContext.token && userContext.user) {
      fetchCategories();
    }
  }, [fetchCategories, userContext]);

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
          <List
            rows={rows}
            title="Catégories"
            isLargeRow={false}
            // setModalIsOpen={setMyModalIsOpen}
            // setModalTitle={setMyModalTitle}
            // setModalContent={setMyModalContent}
            // modalContent={myModalContent}
            // belowListLink="Ajouter une catégorie"
            // onBelowListLinkClick={() => router.push("/organize/addCategory")}
          />
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

export default OrganizeCategories;
