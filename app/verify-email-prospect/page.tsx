"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@nextui-org/react";

const VerifyEmailProspect = () => {
  const [status, setStatus] = useState(
    "Vérification en cours, vous serez redirigez dans quelques secondes si votre mail est validé."
  );
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      const verifyEmail = async () => {
        try {
          const response = await fetch(
            `/api/users/verify-email-prospect?token=${token}`
          );
          if (response.ok) {
            setIsVerified(true);
            await new Promise((resolve) => setTimeout(resolve, 5000));
            window.location.href = "/";
          } else {
            const errorData = await response.json();
          }
        } catch (error) {
          console.error("Error occurred:", error);
          setStatus(
            "Une erreur est survenue lors de la vérification de l'email."
          );
        }
      };

      verifyEmail();
    } else {
      setStatus("Token non fourni.");
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col items-center p-5 bg-white dark:bg-neutral-900 rounded shadow-xl w-80">
        <h1 className="text-2xl font-bold mb-4 text-center text-neutral-800 dark:text-neutral-200">
          {status}
        </h1>
        {!isVerified && (
          <Link href="/">
            <Button color="primary">Retour à l&apos;accueil</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailProspect;
