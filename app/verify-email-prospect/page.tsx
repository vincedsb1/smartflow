"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { Spinner } from "@nextui-org/spinner";

const VerifyEmailProspect = () => {
  const [status, setStatus] = useState(1);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    console.log("Component mounted");
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    console.log("Token:", token);

    if (token) {
      const verifyEmail = async () => {
        try {
          const response = await fetch(
            `/api/users/verify-email-prospect?token=${token}`
          );
          console.log("Response status:", response.status);
          if (response.ok) {
            setIsVerified(true);
            setStatus(1);
            console.log("Email verified, status set to 1");
            await new Promise((resolve) => setTimeout(resolve, 5000));
            window.location.href = "/";
          } else if (status !== 1) {
            setStatus(2);
            console.log("Verification failed, status set to 2");
          }
        } catch (error) {
          console.error("Error occurred:", error);
          if (status !== 1) {
            setStatus(2);
            console.log("Error caught, status set to 2");
          }
        }
      };

      verifyEmail();
    } else {
      setStatus(3);
      console.log("No token provided, status set to 3");
    }
  }, [status]);

  const getStatusMessage = () => {
    switch (status) {
      case 1:
        return (
          <>
            Merci ! <br />
            Vérification en cours, vous serez redirigé dans quelques secondes
            lorsque votre email sera validé.
          </>
        );
      case 2:
        return (
          <>
            Une erreur est survenue lors de la vérification de l&apos;email.
            <br />
            Veuillez réessayer ultérieurement.
          </>
        );
      case 3:
        return (
          <>
            Token non fourni. <br />
            Veuillez cliquer à nouveau sur le lien ou réessayez
            l&apos;inscription.
          </>
        );
      default:
        return "";
    }
  };

  console.log("Current status:", status);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-neutral-200 dark:bg-neutral-900">
      <div className="flex flex-col items-center bg-white dark:bg-neutral-800 rounded-xl shadow-xl w-80 p-10 ">
        <h1 className="text-lg font-bold text-center text-neutral-800 dark:text-neutral-300 mb-6">
          {getStatusMessage()}
        </h1>
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
