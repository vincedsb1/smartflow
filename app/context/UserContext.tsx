import React from 'react';

type UserContextType = {
  user: any; // Remplacez 'any' par le type de votre utilisateur
  setUser: React.Dispatch<React.SetStateAction<any>>; // Remplacez 'any' par le type de votre utilisateur
};

const UserContext = React.createContext<UserContextType | null>(null);

export default UserContext;