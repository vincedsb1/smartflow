"use client";
import React, { ReactNode } from "react";
import TabBar from "./components/TabBar";
import { useSelectedLayoutSegment } from "next/navigation";
import "./globals.css";

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
      <body>
        <main>{children}</main>
        {showTabBar && <TabBar active={segment} />}
      </body>
    </html>
  );
}
