// Nouveau code :

"use client";

import React, { ReactNode, useState, useEffect } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>{children}</div>;
  }

  return (
    <NextUIProvider>
      <NextThemesProvider>{children}</NextThemesProvider>
    </NextUIProvider>
  );
}
