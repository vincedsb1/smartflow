"use client";

import { useRouter } from "next/navigation";
import { NextUIProvider } from "@nextui-org/react";
import { UserContextProvider } from "./context/UserContext";
import { useEffect, useState } from 'react';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    setIsConnected(!!userToken);
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const allowedPaths = ["/login", "/mailauth", "/register-firstname", "/register-password", "/register-birthday", "/register", "/"];
  const isAllowedPath = typeof window !== "undefined" && allowedPaths.includes(window.location.pathname);

  if (!isConnected && !isAllowedPath) {
    return <div>Accès restreint. Veuillez vous connecter ou vous enregistrer.</div>;
  }

  return (
    <UserContextProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </UserContextProvider>
  );
}