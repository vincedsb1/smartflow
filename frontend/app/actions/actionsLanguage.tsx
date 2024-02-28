import { error } from "console";
import React, { useState, useEffect, useCallback } from "react";

// récupération des langues par id
export const FetchLanguageById = (id: any) => {
  const [language, setLanguage] = useState({});

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/${id}`
      );
      if (!response.ok) {
        throw new Error("erreur lors de la récupération des données");
      }
      const result = await response.json();
      setLanguage(result);
    } catch (error) {
      console.log("erreur", error);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return language;
};
