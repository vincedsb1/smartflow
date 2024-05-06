"use client";

import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import { useRouter } from "next/navigation";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CardAppTitle from "@/app/components/CardAppTitle";
import { Button } from "@nextui-org/button";
import { CircularProgress, Progress } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import List from "../../../components/List";

const EditCards: React.FC = () => {
  const userContext = useContext(UserContext);
  const router = useRouter();

  if (!userContext) {
    throw new Error("UserContext must be used within a UserContextProvider");
  }
  const [id, setId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [answer, setAnswer] = useState("");
  const [categories, setCategories] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [categoryName, setCategoryName] = useState("");
  const [nbcard, setNbcard] = useState<string | null>(null);
  const [level, setLevel] = useState(1);
  const [cardCount, setCardCount] = useState(1);
  const [categoryId, setCategoryId] = useState();
  const [categoryIndex, setCategoryIndex] = useState();

  const calculatePercentage = (level: number): number => {
    return Math.round((level * 100) / 7);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get("id");
      const nbcard = urlParams.get("nbcard");
      setId(id);
      setNbcard(nbcard);
    }
  }, []);

  useEffect(() => {
    if (id) {
      const token = localStorage.getItem("token");
      fetch(`/api/cards/${id}`, {
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
          console.log("Card fetched Edit: ", data);
          setTitle(data.title);
          setAnswer(data.answer);
          setLevel(data.level);
          setCategoryName(data.categoryName);
          setCategoryId(data.categoryId);
        })
        .catch((error) => {
          console.error(
            "There has been a problem with your fetch operation:",
            error
          );
        });
    }
  }, [id, userContext.token]);

  const [cardTitle, setCardTitle] = useState("");

  // Fonction pour gérer le changement de titre
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Title changed:", e.target.value);
    setTitle(e.target.value);
  };

  // Fonction pour gérer le changement de réponse
  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Answer changed:", e.target.value);
    setAnswer(e.target.value);
  };

  // Fonction pour sauvegarder les modifications

  const handleSave = async () => {
    try {
      const response = await fetch("/api/cards/editCard", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          title,
          answer,
          // categoryId:
          //   selectedCategoryIndex !== null
          //     ? categories[selectedCategoryIndex].id
          //     : null,
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
        console.log("Catégories de Edit : ", data);
        setCategories(data);
        setIsLoading(false);
        const categoryIndex = data.findIndex(
          (category: any) => category.id === categoryId
        );
        console.log("Catégories Index : ", categoryIndex);
        setCategoryIndex(categoryIndex);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsError(true);
        setIsLoading(false);
      });
  }, [userContext.token, userContext.user, categoryId]);

  const rows = Array.isArray(categories)
    ? categories.map((category) => ({
        mainLabel: category.name,
        color: category.colorName,
      }))
    : [];

  return (
    <div
      id="reviewPageMainContainer"
      className="flex flex-col justify-between min-h-screen w-full "
    >
      <div
        id="reviewPageTopContainer"
        className="flex flex-col justify-center items-center w-full "
      >
        <div
          id="reviewTopContainer"
          className="w-full flex flex-row justify-between mt-16 mb-4 "
        >
          <div id="reviewBackTitle" className="flex flex-row">
            <button
              type="button"
              onClick={() => router.back()}
              className="text-neutral-800 dark:text-neutral-200 text-xs w-4 h-4 m-5 "
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <div
              id="reviewPageTitle"
              className="flex flex-row justify-between items-center mt-2 w-14/20"
            >
              <CardAppTitle title="Modifier une fiche" size="big" />
            </div>
          </div>
        </div>
        <div
          id="reviewMiddleContainer"
          className="flex flex-col justify-center items-center w-full"
        >
          <div id="firstNamePageTitle" className="flex flex-col w-16/20">
            <CardAppTitle title="Titre" size="small" />
          </div>
          <div
            id="firstNameInputContainer"
            className="flex flex-col justify-between items-center w-16/20"
          >
            <Input
              value={title}
              onChange={handleTitleChange}
              className="mb-6 h-9 w-full"
            />
          </div>
          <div id="firstNamePageTitle" className="flex flex-col w-16/20">
            <CardAppTitle title="Réponse" size="small" />
          </div>
          <div
            id="firstNameInputContainer"
            className="flex flex-col justify-between items-center w-16/20 mb-6"
          >
            <Textarea
              label="Description"
              placeholder="la réponse"
              className="max-w-xs"
              onChange={handleAnswerChange}
              value={answer}
            />
          </div>
          <div id="ListTitle" className="flex flex-col w-16/20">
            <CardAppTitle title="Catégorie" size="small" />
          </div>
          <div id="List" className="w-18/20 mb-8">
            {categoryIndex !== null &&
            categoryIndex !== undefined &&
            categoryIndex > -1 ? (
              <List
                rows={rows}
                title=""
                isLargeRow={false}
                selectable={true}
                selectedIndex={categoryIndex}
                // setModalIsOpen={setMyModalIsOpen}
                // setModalTitle={setMyModalTitle}
                // setModalContent={setMyModalContent}
                // modalContent={myModalContent}
                // belowListLink="Ajouter une catégorie"
                // onBelowListLinkClick={() => router.push("/organize/addCategory")}
              />
            ) : (
              <div>Chargement...</div>
            )}
          </div>
        </div>
      </div>
      <div
        id="reviewPageBottomContainer"
        className="flex flex-col justify-center items-center w-full mb-32"
      >
        <Button
          type="submit"
          color="primary"
          variant="solid"
          size="lg"
          className="w-80 font-bold font-text"
          onClick={handleSave}
        >
          Enregistrer
        </Button>
      </div>
    </div>
  );
};

export default EditCards;
