"use client";

import { Card, CardProps } from "@nextui-org/react";
import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
  useCallback,
} from "react";

interface UserContext {
  id: string | null;
  user: any;
  setUser: React.Dispatch<any>;
  email: string | null;
  setEmail: React.Dispatch<React.SetStateAction<string | null>>;
  firstname: string;
  setFirstname: React.Dispatch<React.SetStateAction<string>>;
  birthday: Date | null;
  setBirthday: React.Dispatch<React.SetStateAction<Date | null>>;
  password: string | null;
  setPassword: React.Dispatch<React.SetStateAction<string | null>>;
  token: string | null;
  setToken: (value: string | null) => void;
  onBoarding: boolean;
  setOnBoarding: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCardId: number | null;
  setSelectedCardId: React.Dispatch<React.SetStateAction<number | null>>;
}

const UserContext = createContext<UserContext | undefined>(undefined);

interface UserContextProviderProps {
  children: ReactNode;
}

interface UserCardProps {
  id: number;
  title: string;
  answer: string;
}

// Context provider for user data
const UserContextProvider: React.FC<UserContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    console.log("User state updated:", user);
  }, [user]);
  const [email, setEmail] = useState<string | null>(null);
  useEffect(() => {
    console.log("Email state updated:", email);
  }, [email]);
  const [firstname, setFirstname] = useState<string>("");
  useEffect(() => {
    console.log("Firstname state updated:", firstname);
  }, [firstname]);
  const [birthday, setBirthday] = useState<Date | null>(null);
  useEffect(() => {
    console.log("Birthday state updated:", birthday);
  }, [birthday]);
  const [password, setPassword] = useState<string | null>(null);
  useEffect(() => {
    console.log("Password state updated:", password);
  }, [password]);
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    console.log("Token state updated:", token);
  }, [token]);
  const [onBoarding, setOnBoarding] = useState<boolean>(false);
  useEffect(() => {
    console.log("Onboarding state updated:", onBoarding);
  }, [onBoarding]);
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  useEffect(() => {
    console.log("Selected card ID state updated:", selectedCardId);
  }, [selectedCardId]);
  const [id, setId] = useState<string | null>(null);
  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if (userToken) {
      setToken(userToken);
    }
  }, []);
  
// Function to set the token and store it in local storage
  const setTokenAndStore = (newToken: string | null) => {
    setToken(newToken);
    if (newToken) {
      localStorage.setItem("userToken", newToken);
    } else {
      localStorage.removeItem("userToken");
    }
  };

  // Fetch user details from the API
  useEffect(() => {
    const fetchUserDetails = async () => {
      console.log("Token sent to API:", token);
      const response = await fetch("/api/users/details", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Data received from API:", data);
        setId(data.id);
        setFirstname(data.firstname);
        setBirthday(new Date(data.birthday));
        setEmail(data.email);
      } else {
        console.log("API response was not ok, status:", response.status);
      }
    };

    if (token) {
      console.log("Token is set, fetching user details");
      fetchUserDetails();
    } else {
      console.log("Token is not set");
    }
  }, [token, setFirstname, setBirthday]);

  // Fetch user cards from the API
  const fetchUserCards = useCallback(async () => {
    console.log("Token sent to API:", token);
    const response = await fetch("/api/users/cards", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Data received from API:", data);
      setCards(data);
    } else {
      console.log("API response was not ok, status:", response.status);
    }
  }, [token, setCards]);

  useEffect(() => {
    if (token) {
      fetchUserCards();
    }
  }, [token, fetchUserCards]);

  // Fetch user card details from the API
  const contextValue = {
    id,
    user,
    setUser,
    email,
    setEmail,
    firstname,
    setFirstname,
    birthday,
    setBirthday,
    password,
    setPassword,

    token,
    setToken: setTokenAndStore,
    onBoarding,
    setOnBoarding,
    selectedCardId,
    setSelectedCardId,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export function useUser(): UserContext {
  // Custom hook to use the user context
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserContextProvider");
  }
  return context;
}

export { UserContext, UserContextProvider, type UserCardProps };
