import { useRouter } from "next/navigation";
import { NextUIProvider } from "@nextui-org/react";
import { UserContextProvider } from "./context/UserContext";
import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/spinner";

export default function Providers({ children }: { children: React.ReactNode }) {
  // États pour gérer la connexion de l'utilisateur, le montage du composant, la validité du token et la vérification du token
  const [isConnected, setIsConnected] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isValidToken, setIsValidToken] = useState(false);
  const [isCheckingToken, setIsCheckingToken] = useState(true); // Nouvel état pour indiquer la vérification du token
  const router = useRouter();

  // Liste des chemins autorisés sans vérification de token
  const allowedPaths = [
    "/login",
    "/mailauth",
    "/register-firstname",
    "/register-password",
    "/register-birthday",
    "/register",
    "/",
  ];
  // Vérifie si le chemin actuel est autorisé
  const isAllowedPath =
    typeof window !== "undefined" &&
    allowedPaths.includes(window.location.pathname);

  useEffect(() => {
    console.log("useEffect triggered");
    console.log("isAllowedPath:", isAllowedPath);

    // Fonction pour vérifier le token de l'utilisateur
    const checkToken = async () => {
      const userToken = localStorage.getItem("userToken");
      console.log("userToken:", userToken);

      if (userToken) {
        try {
          // Appel à l'API pour valider le token
          const response = await fetch("/api/users/validate-token", {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          });
          console.log("validate-token response:", response);

          if (response.ok) {
            const data = await response.json();
            console.log("Token validation data:", data);
            setIsValidToken(true);
            setIsConnected(true);
            console.log("Token is valid");
          } else {
            // Token invalide
            setIsValidToken(false);
            setIsConnected(false);
            console.log("Token is invalid");
            if (!isAllowedPath) {
              router.push("/login");
            }
          }
        } catch (error) {
          // Erreur lors de la validation du token
          setIsValidToken(false);
          setIsConnected(false);
          console.log("Error during token validation:", error);
          if (!isAllowedPath) {
            router.push("/login");
          }
        }
      } else {
        // Aucun token trouvé
        setIsValidToken(false);
        setIsConnected(false);
        console.log("No token found");
        if (!isAllowedPath) {
          router.push("/login");
        }
      }
      // Marque le composant comme monté et termine la vérification du token
      setMounted(true);
      setIsCheckingToken(false);
    };

    // Vérifie le token si le chemin actuel n'est pas autorisé
    if (!isAllowedPath) {
      checkToken();
    } else {
      setMounted(true);
      setIsCheckingToken(false);
    }
  }, [isAllowedPath, router]);

  // Effet pour loguer les états de connexion, validité du token et montage du composant
  useEffect(() => {
    console.log("isConnected:", isConnected);
    console.log("isValidToken:", isValidToken);
    console.log("mounted:", mounted);
  }, [isConnected, isValidToken, mounted]);

  // Affiche un spinner pendant la vérification du token ou si le composant n'est pas monté
  if (!mounted || isCheckingToken) {
    console.log("loading");
    return <Spinner />;
  }

  // Affiche un message d'accès restreint si l'utilisateur n'est pas connecté et que le chemin n'est pas autorisé
  // if (!isConnected && !isAllowedPath) {
  //   console.log("Access restricted");
  //   return (
  //     <div>Accès restreint. Veuillez vous connecter ou vous enregistrer.</div>
  //   );
  // }

  console.log("Rendering children");
  // Rend les enfants si l'utilisateur est connecté ou si le chemin est autorisé
  return (
    <UserContextProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </UserContextProvider>
  );
}
