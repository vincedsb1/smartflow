import React from "react";

type UserContextType = {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
};

const UserContext = React.createContext<UserContextType | null>(null);

export default UserContext;
