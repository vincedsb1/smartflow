"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { Spinner } from "@nextui-org/spinner";

const VerifyEmailProspect = () => {
  const [status, setStatus] = useState(
    "Merci ! <br />Vérification en cours, vous serez redirigé dans quelques secondes lorsque votre email sera validé."
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
            await new Promise((resolve) => setTimeout(resolve, 10000));
            window.location.href = "/";
          } else {
            const errorData = await response.json();
            setStatus(
              "Une erreur est survenue lors de la vérification de l'email. <br />Veuillez réessayer ultérieurement."
            );
          }
        } catch (error) {
          console.error("Error occurred:", error);
          setStatus(
            "Une erreur est survenue lors de la vérification de l'email. <br />Veuillez réessayer ultérieurement."
          );
        }
      };

      verifyEmail();
    } else {
      setStatus(
        "Token non fourni. <br />Veuillez cliquer à nouveau sur le lien ou réessayez l'inscription."
      );
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-neutral-200 dark:bg-neutral-900">
      <div className="flex flex-col items-center bg-white dark:bg-neutral-800 rounded-xl shadow-xl w-80 p-10 ">
        <h1
          className="text-lg font-bold text-center text-neutral-800 dark:text-neutral-300 mb-6"
          dangerouslySetInnerHTML={{ __html: status }}
        />
        <div className="mb-6">
          <Spinner />
        </div>
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
