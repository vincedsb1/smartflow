"use client";
import React, { ReactNode } from "react";
import TabBar from "./components/TabBar";
import { useSelectedLayoutSegment } from "next/navigation";
import "./globals.css";
import Providers from "./Providers";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const segment = useSelectedLayoutSegment() ?? "";

  const showTabBar = [
    "",
    "today",
    "add",
    "review",
    "organize",
    "user",
    "admin",
  ].includes(segment);

  return (
    <html lang="fr">
      <body className="">
        <Providers>
          <main>{children}</main>
          {showTabBar && <TabBar active={segment} />}
        </Providers>
      </body>
    </html>
  );
}
