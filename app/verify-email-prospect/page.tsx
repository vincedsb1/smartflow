"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { Spinner } from "@nextui-org/spinner";

const VerifyEmailProspect = () => {
  const [status, setStatus] = useState(1);
  const [isVerified, setIsVerified] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (!token) {
      queueMicrotask(() => setStatus(3));
      return;
    }

    let cancelled = false;
    const verifyEmail = async () => {
      try {
        const response = await fetch(
          `/api/users/verify-email-prospect?token=${token}`
        );
        if (!response.ok) {
          if (!cancelled) setStatus(2);
          return;
        }

        if (!cancelled) {
          setIsVerified(true);
          setStatus(1);
        }

        await new Promise((resolve) => setTimeout(resolve, 5000));
        if (!cancelled) router.push("/");
      } catch (error) {
        console.error("Error occurred:", error);
        if (!cancelled) setStatus(2);
      }
    };

    verifyEmail();
    return () => {
      cancelled = true;
    };
  }, [router]);

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
