import { AppProps } from "next/app";
import "../app/globals.css";
import React from "react";
import { UserContextProvider } from "../app/context/UserContext";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <UserContextProvider>
          <Component {...pageProps} />
        </UserContextProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}

export default MyApp;
