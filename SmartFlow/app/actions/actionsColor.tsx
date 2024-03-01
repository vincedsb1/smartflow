import { error } from "console";
import React, { useState, useEffect } from "react";

// récupération des données des couleurs
export const FetchColors = () => {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}colors`
      );
      if (!response.ok) {
        throw new Error("erreur lors de la récupération des données");
      }
      const result = await response.json();
      setColors(result.results);
    } catch (error) {
      console.log("erreur", error);
    }
  };
  return colors;
};

// récupération des couleurs par id
export const FetchColorById = (id: any) => {
  const [color, setColor] = useState({});

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
      setColor(result);
    } catch (error) {
      console.log("erreur", error);
    }
  };

  return color;
};

// créer une nouvelle couleur
export const AddColor = (color: any) => {
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/colors`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(color),
        }
      );
      if (!response.ok) {
        throw new Error("erreur lors de la création de la couleur");
      }
    } catch (error) {
      console.log("erreur", error);
    }
  };
  return fetchData;
};

// modifier une couleur
export const EditColor = (color: any) => {
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/colors/${color.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(color),
        }
      );
      if (!response.ok) {
        throw new Error("erreur lors de la modification de la couleur");
      }
    } catch (error) {
      console.log("erreur", error);
    }
  };

  return fetchData;
};

// supprimer une couleur
export const DeleteColor = (id: any) => {
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/colors/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("erreur lors de la suppression de la couleur");
      }
    } catch (error) {
      console.log("erreur", error);
    }
  };

  return fetchData;
};
