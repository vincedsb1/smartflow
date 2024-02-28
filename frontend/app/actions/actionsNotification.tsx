import { error } from "console";
import React, { useState, useEffect, useCallback } from "react";

// récupération des données des notifications par user
export const FetchNotifications = (userId: any) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/notifications/user/${userId}`
        );
        if (!response.ok) {
          throw new Error("erreur lors de la récupération des données");
        }
        const result = await response.json();
        setNotifications(result);
        console.log("Notifications fetched successfully:", result);
      } catch (error) {
        console.log("erreur", error);
      }
    };

    if (typeof window !== "undefined") {
      fetchData();
    }
  }, [userId]);

  return notifications;
};
