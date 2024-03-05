import { AppProps } from "next/app";
import "../app/globals.css";
import React from 'react';
import { createContext } from 'react';

interface IUserContext {
   user: any;
   setUser: React.Dispatch<any> | null;
}
function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = React.useState<any>(null);
const UserContext = createContext<IUserContext | null>(null);

  const contextValue = {
    user,
    setUser: setUser as React.Dispatch<any> | null,
  };

  return (
    <UserContext.Provider value={contextValue}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
