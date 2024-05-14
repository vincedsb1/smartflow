"use client";

import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
  useCallback,
} from "react";

interface UserContextProviderProps {
  children: ReactNode;
}

//selction des cards de l'utilisateur
interface UserCardProps {
  id: number;
  title: string;
  answer: string;
  category: string;
}

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
  selectedCard: UserCardProps | null;
  setSelectedCard: React.Dispatch<React.SetStateAction<UserCardProps | null>>;
  cardsToReview: UserCardProps[];
  setCardsToReview: (cards: UserCardProps[]) => void;
  NbCardsToReview: number;

  setNbCardsToReview: React.Dispatch<React.SetStateAction<number>>;
}

const UserContext = createContext<UserContext | undefined>(undefined);

interface UserContextProviderProps {
  children: ReactNode;
}

interface UserCardProps {
  id: number;
  title: string;
  answer: string;
  categoryName: string;
  level: number;
  categoryColorName: string;
}

// Context provider for user data
const UserContextProvider: React.FC<UserContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [firstname, setFirstname] = useState<string>("");
  const [birthday, setBirthday] = useState<Date | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [onBoarding, setOnBoarding] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<UserCardProps | null>(null);
  const [cards, setCards] = useState<any[]>([]);
  const [NbCardsToReview, setNbCardsToReview] = useState<number>(0);
  useEffect(() => {
    console.log("NbCardsToReview from context:", NbCardsToReview);
  }, [NbCardsToReview]);

  const [cardsToReview, setCardsToReview] = useState<any[]>([]);
  useEffect(() => {}, [cardsToReview]);

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
      const response = await fetch("/api/users/details", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setId(data.id);
        setFirstname(data.firstname);
        setBirthday(new Date(data.birthday));
        setEmail(data.email);
      } else {
        console.log("API response was not ok, status:", response.status);
      }
    };

    if (token) {
      fetchUserDetails();
    } else {
      console.log("Token is not set");
    }
  }, [token, setFirstname, setBirthday]);

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
    selectedCard,
    setSelectedCard,
    cardsToReview,
    setCardsToReview,
    NbCardsToReview,
    setNbCardsToReview,
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
