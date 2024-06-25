"use client";
import React, { ReactNode } from "react";
import TabBar from "./components/TabBar";
import { useSelectedLayoutSegment } from "next/navigation";
import "./globals.css";
import Providers from "./Providers";
import { UserContextProvider } from "../app/context/UserContext";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { ThemeProvider } from "./components/theme-provider";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const segment = useSelectedLayoutSegment() ?? "";

  const showMenu = [
    "today",
    "review",
    "add",
    "review",
    "organize",
    "user",
    "admin",
  ].includes(segment);

  return (
    <html lang="fr">
      <body className="">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <UserContextProvider>
              <main className="bg-neutral-200 sm:bg-white dark:bg-neutral-900">
                {children}
              </main>
              {showMenu && (
                <>
                  <div className="sm:hidden">
                    <TabBar />
                  </div>
                </>
              )}
            </UserContextProvider>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
