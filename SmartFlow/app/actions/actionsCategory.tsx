import { error } from "console";
import React, { useState, useEffect } from "react";

// récupération des données des catégories
export const FetchCategory = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}categories`
      );
      if (!response.ok) {
        throw new Error("erreur lors de la récupération des données");
      }
      const result = await response.json();
      setCategories(result);
    } catch (error) {
      console.log("erreur", error);
    }
  };

  return categories;
};

// récupération des catégories par id
export const FetchCategoryById = (id: any) => {
  const [category, setCategory] = useState({});

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/${id}`
      );
      if (!response.ok) {
        throw new Error("erreur lors de la récupération des données");
      }
      const result = await response.json();
      setCategory(result);
    } catch (error) {
      console.log("erreur", error);
    }
  };

  return category;
};

// créer une nouvelle catégorie
export const AddCategory = (category: any) => {
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/categories`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(category),
        }
      );
      if (!response.ok) {
        throw new Error("erreur lors de la création de la catégorie");
      }
    } catch (error) {
      console.log("erreur", error);
    }
  };
  return fetchData;
};

// modifier une catégorie
export const EditCategory = (id: any, category: any) => {
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/categories/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(category),
        }
      );
      if (!response.ok) {
        throw new Error("erreur lors de la modification de la catégorie");
      }
    } catch (error) {
      console.log("erreur", error);
    }
  };
  return fetchData;
};

// supprimer une catégorie
export const DeleteCategory = (id: any) => {
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/categories/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("erreur lors de la suppression de la catégorie");
      }
    } catch (error) {
      console.log("erreur", error);
    }
  };
  return fetchData;
};