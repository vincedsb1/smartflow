"use client";
import { colorClasses } from "@/app/components/utils/colorUtils";
import { UserContext } from "@/app/context/UserContext";
import { Button, Link } from "@nextui-org/react";
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Composant de la page de modification d'une catégorie
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

    interface Color {
        id: number;
        name: string;
        selected: boolean; // Ajoutez cette ligne
    }

    // Récupère les categories
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
                    console.log("Data fetched from API: ", data);
                    setCategories(data);
                })
                .catch((error) => {
                    console.error("Error fetching categories: ", error);
                });
        }
    }, [userContext?.token]);

    // Récupère l'ID de la catégorie à modifier dans l'url
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const urlParams = new URLSearchParams(window.location.search);
            const id = urlParams.get('id');
            setCategoryId(id);
        }
    }, []);

    // Récupère le titre de la catégorie selon id
    useEffect(() => {
        if (categoryId) {
            console.log("CategoryId: ", categoryId);
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
                    console.log("Data fetched from API: ", data);
                    const category = data.find((category: any) => category.id === Number(categoryId));
                    if (category) {
                        console.log("Category found: ", category);
                        setTitle(category.name);
                        setColorId(category.colorId);
                        setColorName(category.color.name);

                        setColors(
                            colors.map((color) =>
                                color.id === category.colorId
                                    ? { ...color, selected: true }
                                    : { ...color, selected: false }
                            )
                        );
                    } else {
                        console.log("Category not found");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching category: ", error);
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoryId, userContext?.token]);

    // Fonction pour mettre à jour une catégorie
    const updateCategory = async (categoryId: string | null, categoryName: string, selectedColor: string) => {
        const token = userContext?.token;
        if (token) {
            const response = await fetch(`/api/categories`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    categoryId: Number(categoryId),
                    name: categoryName,
                    colorId: selectedColor
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        }
    }

    // Fonction pour gérer le clic sur le bouton Enregistrer
    const handleSaveClick = async () => {
        console.log(title, selectedColor);
        if (!title) {
            alert("Veuillez remplir le champ du nom de la catégorie");
            return;
        }
        if (!selectedColor) {
            alert("Veuillez sélectionner une couleur");
            return;
        }

        try {
            const updatedCategory = await updateCategory(categoryId, title, selectedColor);
            console.log("Updated category: ", updatedCategory);
            router.push('/organize/categories');
        } catch (error) {
            console.error("Error updating category: ", error);
        }
    }

    // Définir les couleurs initiales
    const initialColors = Object.keys(colorClasses).map((colorName, index) => ({
        id: index + 1,
        name: colorName,
        selected: index === 0,
    }));

    // Ajouter un état pour les couleurs
    const [colors, setColors] = useState<Color[]>(initialColors);

    // Fonction pour gérer le clic sur une couleur
    const handleColorClick = (colorId: number) => {
        setSelectedColor(colorId.toString());
        if (selectedColor !== colorId.toString()) {
            setColors(
                colors.map((color) =>
                    color.id === colorId
                        ? { ...color, selected: true }
                        : { ...color, selected: false }
                )
            );
        }
    };



    return (
        <div
            id="modifyCategoryContainer"
            className="flex flex-col justify-between min-h-screen w-full"
        >
            <div
                id="backButton"
                className="flex flex-col justify-center w-16/20 mt-10"
            >
                <Link href="/organize">
                    <FontAwesomeIcon
                        icon={faChevronLeft}
                        className="text-neutral-800 dark:text-neutral-200 text-xs w-4 h-4 m-5"
                    />
                </Link>
            </div>
            <div id="inputChangeNameCategorie" className="">
                <h1 className="text-neutral-600 font-semibold">Libellé</h1>
                <input
                    className="bg-neutral-50 rounded-2xl p-2 w-80 h-12 flex justify-center items-center"
                    type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
                <h1 className="text-neutral-600 font-semibold">Couleurs</h1>
                <div className="flex flex-wrap justify-center bg-neutral-200 dark:bg-neutral-800 rounded-2xl">
                    {colors.map((color) => (
                        <div
                            key={color.id}
                            className={`w-8 h-8 rounded-full hover:scale-105 hover:ring-2 ring-neutral-900 dark:ring-neutral-100 active:scale-110 transition-all bg-${color.name
                                } m-3 cursor-pointer ${color.selected
                                    ? "ring-2 ring-neutral-900 dark:ring-neutral-100 scale-110"
                                    : ""
                                }`}
                            onClick={() => handleColorClick(color.id)}
                        ></div>
                    ))}
                </div>
            </div>
            <div id="button" className="flex justify-center items-center w-full mb-32 ">
                <Button
                    type="submit"
                    color="primary"
                    variant="solid"
                    size="lg"
                    className="w-18/20 font-bold font-text"
                    onClick={handleSaveClick}
                >Enregistrer</Button>
            </div>
        </div>
    );
};

export default EditCategorie;