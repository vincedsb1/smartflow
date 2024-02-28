import { useState, useEffect } from "react";

// récupération des données des cards
export const useFetchCardsClient = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/cards`
        );
        if (!response.ok) {
          throw new Error("erreur lors de la récupération des données");
        }
        const result = await response.json();
        setCards(result);
        console.log("Cards fetched successfully:", result.results);
      } catch (error) {
        console.log("erreur", error);
      }
    };

    if (typeof window !== "undefined") {
      fetchData();
    }
  }, []);

  return cards;
};

// récupération des cards par id
export const FetchCardById = (id: any) => {
  const [card, setCard] = useState({});

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
      setCard(result);
    } catch (error) {
      console.log("erreur", error);
    }
  };

  return card;
};

// créer une nouvelle card
export const AddCard = async (card: any) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/cards`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(card),
      }
    );
    if (!response.ok) {
      throw new Error("erreur lors de la création des données");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.log("erreur", error);
  }
};

// modification des cards
export const EditCard = (id: any, card: any) => {
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/cards/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(card),
        }
      );
      if (!response.ok) {
        throw new Error("erreur lors de la modification des données");
      }
    } catch (error) {
      console.log("erreur", error);
    }
  };

  return fetchData;
};

// suppression des cards
export const DeleteCard = (id: any) => {
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/cards/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("erreur lors de la suppression des données");
      }
    } catch (error) {
      console.log("erreur", error);
    }
  };

  return fetchData;
};
