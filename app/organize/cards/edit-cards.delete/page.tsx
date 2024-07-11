"use client";
import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import List from "@/app/components/List";
import { UserContext } from "@/app/context/UserContext";

interface Category {
  description: any;
  id: number;
  name: string;
  colorName: string;
}

// Page de modification d'une carte
const EditCardsOld = () => {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("UserContext must be used within a UserContextProvider");
  }
  const router = useRouter();
  const { selectedCard } = useUser();

  // Déclaration des états
  const [title, setTitle] = React.useState("");
  const [answer, setAnswer] = React.useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<
    number | null
  >(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const user = useContext(UserContext);

  // Récupération des catégories
  useEffect(() => {
    if (!userContext.token || !userContext.user) {
      console.error("User or token is not defined");
      setIsError(true);
      setIsLoading(false);
      return;
    }

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

        // Après avoir défini les catégories, trouvez l'index de la catégorie correspondante
        const categoryIndex = data.findIndex(
          (category: Category) =>
            category.id === Number(selectedCard?.category ?? 0)
        );
        if (selectedCard && selectedCard.category) {
          const categoryIndex = data.findIndex(
            (category: Category) =>
              category.id === Number(selectedCard.category)
          );
          setSelectedCategoryIndex(categoryIndex);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsError(true);
        setIsLoading(false);
      });
  }, [userContext.token, userContext.user, selectedCard]);

  // Mise à jour des états
  React.useEffect(() => {
    setTitle(selectedCard?.title || "");
    setAnswer(selectedCard?.answer || "");
    if (selectedCard?.category) {
      const selectedCategoryIndex = categories.findIndex(
        (category) => category.id === Number(selectedCard.category)
      );
      setSelectedCategoryIndex(
        selectedCategoryIndex !== -1 ? selectedCategoryIndex : null
      );
    }
  }, [selectedCard, categories]);

  // Fonction pour sauvegarder les modifications

  const handleSave = async () => {
    try {
      const response = await fetch("/api/cards/editCard", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: selectedCard?.id,
          title,
          answer,
          categoryId:
            selectedCategoryIndex !== null
              ? categories[selectedCategoryIndex].id
              : null,
        }),
      });

      if (!response.ok) {
        throw new Error(
          "Une erreur est survenue lors de la mise à jour de la carte"
        );
      }
      router.back();
    } catch (error) {
      console.error(error);
    }
  };

  // Fonction pour gérer le changement de titre
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  // Fonction pour gérer le changement de réponse
  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
  };

  const handleBack = () => {
    router.back();
  };

  if (!selectedCard) {
    return <div>Aucune carte sélectionnée</div>;
  }

  const rows = categories.map((category) => ({
    mainLabel: category.name,
    secondaryLabel: category.description,
    color: category.colorName,
  }));

  // Affichage de la page
  return (
    <div
      id="MainContainer"
      className="flex flex-col justify-between min-h-screen w-full mx-auto"
    >
      <div
        id="Container"
        className="flex flex-col justify-center w-full mx-auto"
      >
        <div id="backIcon" className="w-full flex flex-col mt-16 ml-6">
          <FontAwesomeIcon
            onClick={handleBack}
            icon={faChevronLeft}
            className="text-neutral-800 dark:text-neutral-200 text-xs w-4 h-4 m-5 ml-2"
          />
        </div>
      </div>
      <div className="min-h-screen w-full flex-grow mx-auto">
        <div className="w-18/20 mx-auto">
          <h1>Titre</h1>
          <Input
            type="text"
            className="mb-6 h-9 w-full mx-auto"
            value={title}
            onChange={handleTitleChange}
          />
        </div>

        <div className="w-18/20 mx-auto">
          <h1>Réponse</h1>
          <Input
            type="text"
            className="mb-6 h-9 w-full mx-auto"
            value={answer}
            onChange={handleAnswerChange}
          />
        </div>
        <div className="w-18/20 flex-grow mx-auto">
          <h1>Catégories</h1>
          <List
            rows={rows}
            isLargeRow={false}
            selectedIndex={selectedCategoryIndex}
            onBelowListLinkClick={() => router.push("/organize/addCategory")}
            selectable={true}
            onSelect={(index) => setSelectedCategoryIndex(index)}
          />
        </div>
        <div className="flex justify-center mt-52 mx-auto">
          <Button
            onClick={handleSave}
            type="button"
            color="primary"
            variant="solid"
            size="lg"
            className="w-80 font-bold font-text mx-auto"
          >
            Enregistrer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditCardsOld;

