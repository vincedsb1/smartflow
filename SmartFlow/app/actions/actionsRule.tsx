import { error } from "console";
import React, { useState, useEffect } from "react";

// récupération des données des rules

export const FetchRules = () => {
  const [rules, setRules] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/rules`
        );
        if (!response.ok) {
          throw new Error("erreur lors de la récupération des données");
        }
        const result = await response.json();
        setRules(result);
        console.log("Rules fetched successfully:", result);
      } catch (error) {
        console.log("erreur", error);
      }
    };

    if (typeof window !== "undefined") {
      fetchData();
    }
  }, []);
  return rules;
};
