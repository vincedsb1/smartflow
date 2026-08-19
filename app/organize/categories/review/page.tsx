"use client";
import { colorClasses } from "@/app/components/utils/colorUtils";
import { UserContext } from "@/app/context/UserContext";
import { Input, Modal, Textarea, Button, ModalContent, ModalHeader, ModalFooter, ModalBody } from "@nextui-org/react";
import { useEffect, useState, type ChangeEvent } from "react";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DesktopMenu from "@/app/components/DesktopMenu";
import Link from "next/link";
import { faTrash } from '@fortawesome/free-solid-svg-icons';

interface Color {
  id: number;
  name: string;
  fullName: string;
  selected: boolean;
}

const colorFullNames: { [key: string]: string } = {
  "red-500": "Rouge Vif",
  "orange-500": "Orange Brillant",
  "yellow-500": "Jaune Soleil",
  "green-500": "Vert Émeraude",
  "teal-500": "Sarcelle",
  "blue-500": "Bleu Ciel",
  "indigo-500": "Indigo Profond",
  "purple-500": "Violet Royal",
  "pink-500": "Rose Fuchsia",
  "red-600": "Rouge Intense",
  "orange-600": "Orange Sanguine",
  "yellow-600": "Jaune Moutarde",
};

const initialColors: Color[] = Object.keys(colorClasses).map(
  (colorName, index) => ({
    id: index + 1,
    name: colorName,
    fullName: colorFullNames[colorName] || colorName,
    selected: index === 0,
  })
);

const EditCategorie = () => {
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const userContext = useContext(UserContext);
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [colorId, setColorId] = useState<number | null>(null);
  const [colorName, setColorName] = useState<string | null>(null);
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [colors, setColors] = useState<Color[]>(initialColors);

  useEffect(() => {
    const token = userContext?.token;
    if (token) {
      fetch(`/api/categories`, {
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
        })
        .catch((error) => {
          console.error("Error fetching categories: ", error);
        });
    }
  }, [userContext?.token]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get("id");
      queueMicrotask(() => setCategoryId(id));
    }
  }, []);

  useEffect(() => {
    if (categoryId) {
      const token = localStorage.getItem("token");
      fetch(`/api/categories`, {
        headers: {
          Authorization: `Bearer ${userContext?.token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          const category = data.find(
            (category: any) => category.id === Number(categoryId)
          );
          if (category) {
            setTitle(category.name);
            setColorId(category.colorId);
            setColorName(category.color.fullName);
            setSelectedColor(category.colorId.toString());

            setColors((previousColors) =>
              previousColors.map((color) =>
                color.id === category.colorId
                  ? { ...color, selected: true }
                  : { ...color, selected: false }
              )
            );
          } else {
            console.error("Category not found");}
        })
        .catch((error) => {
          console.error("Error fetching category: ", error);
        });
    }
  }, [categoryId, userContext?.token]);

  const updateCategory = async (
    categoryId: string | null,
    categoryName: string,
    selectedColor: string
  ) => {
    const token = userContext?.token;
    if (token) {
      const response = await fetch(`/api/categories`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          categoryId: Number(categoryId),
          name: categoryName,
          colorId: selectedColor,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    }
  };

  const handleSaveClick = async () => {
    if (!title) {
      alert("Veuillez remplir le champ du nom de la catégorie");
      return;
    }
    if (!selectedColor) {
      alert("Veuillez sélectionner une couleur");
      return;
    }

    try {
      const updatedCategory = await updateCategory(
        categoryId,
        title,
        selectedColor
      );
      router.push("/organize/categories");
    } catch (error) {
      console.error("Error updating category: ", error);
    }
  };

  const handleColorClick = (colorId: number) => {
    setSelectedColor(colorId.toString());
    if (selectedColor !== colorId.toString()) {
      setColors((previousColors) =>
        previousColors.map((color) =>
          color.id === colorId
            ? { ...color, selected: true }
            : { ...color, selected: false }
        )
      );
    }
  };


  const handleConfirmDelete = async () => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      console.error("Token is not defined in local storage");
      return;
    }

    if (!categoryId) {
      console.error("Category ID is not defined");
      return;
    }

    try {
      const response = await fetch(`/api/categories`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ categoryId: Number(categoryId) }),
      });

      if (response.ok) {
        router.push("/organize/categories");
      } else {
        throw new Error("Une erreur est survenue lors de la suppression de la catégorie");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setShowDeleteModal(false);
    }
  };



  const handleDelete = async () => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      console.error("Token is not defined in local storage");
      return;
    }
    setShowDeleteModal(true);
  };


  return (
    <div
      id="editCategoriesMainContainer"
      className="flex flex-row justify-center items-center"
    >
      <div
        id="editCategoriesSubContainer"
        className="w-full sm:max-w-[1170px]  bg-neutral-200 dark:bg-neutral-700 sm:shadow-2xl sm:shadow-neutral-200 sm:dark:shadow-black flex flex-row "
      >
        <div id="editCategoriesDesktopMenu" className="hidden sm:block">
          <DesktopMenu />
        </div>
        <div
          id="modifyCategoryContainer"
          className="flex flex-col justify-between min-h-screen w-full items-center sm:ml-48 md:ml-72 px-4 sm:px-10"
        >
          <div id="categoryEditTopContainer" className="w-full">
            <div
              id="editCategoriesSwitcherBackIcon"
              className="w-full flex flex-col mt-16"
            >
              <Link href="/organize">
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  className="text-neutral-800 dark:text-neutral-200 text-xs w-4 h-4 my-5 mr-5"
                />
              </Link>
            </div>
            <div id="inputChangeNameCategorie" className="flex items-center w-full mb-1">
              <div className="flex w-full">
                <Input
                  className="w-full"
                  type="text"
                  value={title}
                  placeholder="Nom de la catégorie, ex. : Mathématiques"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setTitle(e.target.value)
                  }
                />
                <Button
                  variant="solid"
                  color="default"
                  onClick={handleDelete}
                  isIconOnly
                  className="ml-2 sm:ml-4 bg-white dark:bg-neutral-800"

                >
                    <FontAwesomeIcon icon={faTrash} className=" text-red-600 dark:text-red-400" />
                </Button>
              </div>
            </div>
            <div
              id="colorPickerContainer"
              className="flex flex-col items-center w-full mt-1"
            >
              <div
                id="colorPickerMobile"
                className="flex sm:hidden flex-wrap justify-center bg-neutral-50 dark:bg-neutral-800 rounded-2xl  "
              >
                {colors.map((color) => (
                  <div
                    key={color.id}
                    className={`w-8 h-8 rounded-full hover:scale-105 hover:ring-2 ring-neutral-900 dark:ring-neutral-100 active:scale-110 transition-all bg-${color.name
                      } m-3 cursor-pointer ${color.selected
                        ? "ring-2 ring-neutral-900 dark:ring-neutral-100"
                        : ""
                      }`}
                    onClick={() => handleColorClick(color.id)}
                  ></div>
                ))}
              </div>
              <div
                id="colorPickerDesktop"
                className="hidden sm:flex flex-wrap justify-center bg-neutral-50 dark:bg-neutral-800 rounded-2xl py-8 mt-4"
              >
                {colors.map((color) => (
                  <div
                    key={color.id}
                    className={`w-36 h-16 rounded-xl hover:scale-105  ring-neutral-600 dark:ring-neutral-100 active:scale-110 transition-all flex flex-row item-center justify-center bg-${color.name
                      } m-4 cursor-pointer ${color.selected
                        ? "ring-4 ring-neutral-500 dark:ring-neutral-300"
                        : ""
                      }`}
                    onClick={() => handleColorClick(color.id)}
                  >
                    <div
                      id="colorFullNameLabelContainer"
                      className="flex flex-row justify-center items-center"
                    >
                      <div
                        id="colorFullNameLabelContainer"
                        className="flex flex-row justify-center items-center font-text"
                      >
                        {color.fullName}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div
            id="button"
            className="flex justify-center items-center w-full mb-32 mt-32 "
          >

            <Button
              type="submit"
              color="primary"
              variant="solid"
              size="lg"
              className="w-full font-bold font-text"
              onClick={handleSaveClick}
            >
              Enregistrer
            </Button>
          </div>
        </div>
      </div>
      <Modal isOpen={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <ModalContent>
          {(onClose: () => void) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Confirmation de suppression</ModalHeader>
              <ModalBody>
                <p className="text-neutral-800 dark:text-neutral-300">
                  Êtes-vous sûr de vouloir supprimer cette catégorie ?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button onPress={onClose} >
                  Annuler
                </Button>
                <Button
                  color="danger"
                  onPress={() => {
                    handleConfirmDelete();
                    onClose();
                  }}
                >
                  Supprimer la catégorie
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditCategorie;
