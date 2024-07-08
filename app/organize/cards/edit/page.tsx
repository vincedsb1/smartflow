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
import DesktopMenu from "@/app/components/DesktopMenu";
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const EditCards: React.FC = () => {
  const userContext = useContext(UserContext);
  const router = useRouter();

  if (!userContext) {
    throw new Error("UserContext must be used within a UserContextProvider");
  }
  const [id, setId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [answer, setAnswer] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [categoryName, setCategoryName] = useState("");
  const [nbcard, setNbcard] = useState<string | null>(null);
  const [level, setLevel] = useState(1);
  const [cardCount, setCardCount] = useState(1);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [categoryIndex, setCategoryIndex] = useState<number | null>(null);

  useEffect(() => {
  }, [categoryId]);

  useEffect(() => {
  }, [categoryIndex]);

  const handleSelectRow = (index: number) => {
    if (Array.isArray(categories) && index >= 0 && index < categories.length) {
      const selectedCategory = categories[index];
      const categoryId = selectedCategory.id;
      setCategoryId(categoryId);
    }
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
      const token = localStorage.getItem("userToken");
      if (!token) {
        console.error("Token is not defined in local storage");
        setIsError(true);
        setIsLoading(false);
        return;
      }
      fetch(`/api/cards/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
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
          setIsError(true);
          setIsLoading(false);
        });
    }
  }, [id]);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      console.error("Token is not defined in local storage");
      setIsError(true);
      setIsLoading(false);
      return;
    }

    fetch("/api/categories", {
      headers: {
        Authorization: `Bearer ${token}`,
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
        const categoryIndex = data.findIndex(
          (category: any) => category.id === categoryId
        );
        setCategoryIndex(categoryIndex);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsError(true);
        setIsLoading(false);
      });
  }, [categoryId]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
  };

  const handleSave = async () => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      console.error("Token is not defined in local storage");
      return;
    }
    try {
      const response = await fetch(`/api/cards/edit/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          answer,
          categoryId,
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

  const rows = Array.isArray(categories)
    ? categories.map((category) => ({
      mainLabel: category.name,
      color: category.colorName,
    }))
    : [];

    const handleDelete = async () => {
      const token = localStorage.getItem("userToken");
      if (!token) {
        console.error("Token is not defined in local storage");
        return;
      }
      try {
        const response = await fetch(`/api/cards/edit/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Une erreur est survenue lors de la suppression de la carte");
        }
        router.back();
      } catch (error) {
        console.error("Error:", error);
      }
    };
  

  return (
    <div id="editCardMainContainer" className="flex flex-row justify-center items-center">
      <div id="editCardSubMainContainer" className="w-full sm:max-w-[1170px] bg-neutral-200 dark:bg-neutral-700 sm:shadow-2xl sm:shadow-neutral-200 dark:sm:shadow-black flex flex-row">
        <div id="editCardMenuContainer" className="hidden sm:block">
          <DesktopMenu />
        </div>
        <div id="editCardContentContainer" className="flex flex-row justify-center w-full sm:ml-48 md:ml-72">
          <div id="editCardContainer" className="flex flex-row w-full justify-center sm:px-10">
            <div id="editCardPageMainContainer" className="flex flex-col justify-between min-h-screen w-full">
              <div id="editCardPageTopContainer" className="flex flex-col justify-center items-center w-full">
                <div id="editCardTopContainer" className="w-full flex flex-row justify-between mt-16 mb-4">
                  <div id="editCardBackTitle" className="flex flex-row w-full justify-between items-center">
                    <div className="flex flex-row items-center">
                      <button type="button" onClick={() => router.back()} className="text-neutral-800 dark:text-neutral-200 text-xs w-4 h-4 m-5 sm:ml-0">
                        <FontAwesomeIcon icon={faChevronLeft} />
                      </button>
                      <CardAppTitle title="Modifier une fiche" size="big" />
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faTrash} className="text-red-500 cursor-pointer" onClick={handleDelete} />
                    </div>
                  </div>
                </div>
                <div id="editCardMiddleContainer" className="flex flex-col justify-center items-center w-full">
                  <div id="editCardTitleContainer" className="flex flex-col w-18/20 sm:w-full">
                    <CardAppTitle title="Titre" size="small" />
                  </div>
                  <div id="editCardTitleContainer" className="flex flex-col justify-between items-center w-18/20 sm:w-full">
                    <Input value={title} onChange={handleTitleChange} className="mb-6 h-9 w-full" />
                  </div>
                  <div id="firstNamePageTitle" className="flex flex-col w-18/20 sm:w-full">
                    <CardAppTitle title="Réponse" size="small" />
                  </div>
                  <div id="editCardContentContainer" className="flex flex-col justify-between items-center w-18/20 sm:w-full mb-6">
                    <Textarea onChange={handleAnswerChange} value={answer} />
                  </div>
                  <div id="ListTitle" className="flex flex-col w-18/20 sm:w-full">
                    <CardAppTitle title="Catégorie" size="small" />
                  </div>
                  <div id="List" className="w-full mb-8">
                    {isLoading ? (
                      <div>Chargement...</div>
                    ) : (
                      <List rows={rows} title="" isLargeRow={false} selectable={true} onSelect={handleSelectRow} selectedIndex={categoryIndex} />
                    )}
                  </div>
                </div>
                <div id="editCardBottomContainer" className="flex justify-center items-center w-full mb-32">
                  <Button type="submit" color="primary" variant="solid" size="lg" className="w-18/20 font-bold font-text sm:w-full" onClick={handleSave}>
                    Enregistrer
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCards;
