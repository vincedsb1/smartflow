"use client";
import React, { createContext, useState, ReactNode, useContext } from "react";

interface IUserContext {
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
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const UserContext = createContext<IUserContext | undefined>(undefined);

interface UserContextProviderProps {
  children: ReactNode;
}

const UserContextProvider: React.FC<UserContextProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [firstname, setFirstname] = useState<string>("");
  const [birthday, setBirthday] = useState<Date | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const contextValue = {
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
    setToken,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export function useUser(): IUserContext {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserContextProvider');
  }
  return context;
}

export { UserContext, UserContextProvider };