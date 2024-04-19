import { AppProps } from "next/app";
import "../app/globals.css";
import React from "react";
import { UserContextProvider } from "../app/context/UserContext"; // Assurez-vous que le chemin d'importation est correct

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <Component {...pageProps} />
    </UserContextProvider>
  );
}

export default MyApp;
