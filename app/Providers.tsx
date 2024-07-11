import { useRouter } from "next/navigation";
import { NextUIProvider } from "@nextui-org/react";
import { UserContextProvider } from "./context/UserContext";
import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/spinner";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isValidToken, setIsValidToken] = useState(false);
  const [isCheckingToken, setIsCheckingToken] = useState(true); 
  const router = useRouter();

  const allowedPaths = [
    "/login",
    "/mailauth",
    "/register-firstname",
    "/register-password",
    "/register-birthday",
    "/register",
    "/",
    "/cgu",
    "/resetPassword",
  ];
  const isAllowedPath =
    typeof window !== "undefined" &&
    allowedPaths.includes(window.location.pathname);

  useEffect(() => {

    const checkToken = async () => {
      const userToken = localStorage.getItem("userToken");

      if (userToken) {
        try {
          const response = await fetch("/api/users/validate-token", {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setIsValidToken(true);
            setIsConnected(true);
          } else {
            setIsValidToken(false);
            setIsConnected(false);
            if (!isAllowedPath) {
              router.push("/login");
            }
          }
        } catch (error) {
          setIsValidToken(false);
          setIsConnected(false);
          if (!isAllowedPath) {
            router.push("/login");
          }
        }
      } else {
        setIsValidToken(false);
        setIsConnected(false);
        if (!isAllowedPath) {
          router.push("/login");
        }
      }
      setMounted(true);
      setIsCheckingToken(false);
    };
    if (!isAllowedPath) {
      checkToken();
    } else {
      setMounted(true);
      setIsCheckingToken(false);
    }
  }, [isAllowedPath, router]);

  useEffect(() => {
  }, [isConnected, isValidToken, mounted]);
  if (!mounted || isCheckingToken) {
    return <Spinner />;
  }

  return (
    <UserContextProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </UserContextProvider>
  );
}
