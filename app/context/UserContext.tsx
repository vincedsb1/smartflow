"use client"
import React, { createContext, useState, ReactNode } from "react";

interface IUserContext {
  user: any;
  setUser: React.Dispatch<any> | null;
  email: string | null;
  setEmail: React.Dispatch<React.SetStateAction<string | null>> | null;
}

const UserContext = createContext<IUserContext | undefined>(undefined);

interface UserContextProviderProps {
  children: ReactNode;
}

const UserContextProvider: React.FC<UserContextProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState<string | null>(null);

  const contextValue = {
    user,
    setUser,
    email,
    setEmail,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };