"use client";
import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@nextui-org/react";

const TermsPage = () => {
    const router = useRouter()

    const handleGoBack = () => {
        router.back()
    }

    return (
        <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto p-4 h-screen">
            <h1 className="text-3xl font-bold">Conditions Générales d&apos;Utilisation</h1>
            <p className="mt-4">
                Bienvenue sur SmartFlow. Les présentes conditions générales d&apos;utilisation (&apos;CGU&apos;) ont pour objet l&apos;encadrement juridique des modalités de mise à disposition du site et des services par SmartFlow et de définir les conditions d&apos;accès et d&apos;utilisation des services par l&apos;Utilisateur.
            </p>
            <h2 className="text-2xl font-bold mt-4">Article 1 : Les mentions légales</h2>
            <p className="mt-4">
                L&apos;édition du site SmartFlow est assurée par la Société Twenty Soft et le stagiaire  au capital de 1000 bitcoins, immatriculée au RCS de444111222 sous le numéro ..., dont le siège social est situé au ..., numéro de téléphone ..., adresse e-mail : ....
            </p>
            <h2 className="text-2xl font-bold mt-4">Article 2 : Accès au site</h2>
            <p className="mt-4">
                Le site SmartFlow permet à l&apos;Utilisateur un accès gratuit aux services suivants : ...
            </p>
            <h2 className="text-2xl font-bold mt-4">Article 3 : Collecte des données</h2>
            <p className="mt-4">
                Le site assure à l&apos;Utilisateur une collecte et un traitement d&apos;informations personnelles dans le respect de la vie privée conformément à la loi n°78-17 du 6 janvier 1978 relative à l&apos;informatique, aux fichiers et aux libertés. Le site est déclaré à la CNIL sous le numéro ....
            </p>
            <Button color="primary" className="mt-4" onClick={handleGoBack}>Retour au mail</Button>
        </div>
    )
}

export default TermsPage;