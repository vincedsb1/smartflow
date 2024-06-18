"use client";
import React from 'react'
import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const TermsPage = () => {
    const router = useRouter()

    return (
        <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto p-4 h-screen">
            <button
                type="button"
                onClick={() => router.back()}
                className="text-neutral-800 dark:text-neutral-200 text-xs w-4 h-4 m-5"
            >
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>

            <div className="bg-white rounded-lg p-4">
                <h1 className="text-3xl font-bold">Informations légales</h1>
                <p className="mt-4">
                    Bienvenue sur SmartFlow. Les présentes conditions générales d&apos;utilisation (&apos;CGU&apos;) ont pour objet l&apos;encadrement juridique des modalités de mise à disposition du site et des services par SmartFlow et de définir les conditions d&apos;accès et d&apos;utilisation des services par l&apos;Utilisateur.
                </p>
                <h2 className="text-2xl font-bold mt-4">Article 1 : Les mentions légales</h2>
                <p className="mt-4">
                    L&apos;édition du site SmartFlow est assurée par la Société Twenty Soft, société par actions simplifiée au capital de 1000 euros, immatriculée au Registre du Commerce et des Sociétés de Paris sous le numéro XXX XXX XXX, dont le siège social est situé au [adresse complète], numéro de téléphone [numéro], adresse e-mail : [adresse e-mail].
                </p>
                <h2 className="text-2xl font-bold mt-4">Article 2 : Accès au site</h2>
                <p className="mt-4">
                    Le site SmartFlow permet à l&apos;Utilisateur un accès gratuit aux services suivants : [liste des services]. L&apos;Utilisateur s&apos;engage à accéder au site en utilisant un équipement récent, ne contenant pas de virus et avec un navigateur de dernière génération mis à jour.
                </p>
                <h2 className="text-2xl font-bold mt-4">Article 3 : Collecte des données</h2>
                <p className="mt-4">
                    Le site assure à l&apos;Utilisateur une collecte et un traitement d&apos;informations personnelles dans le respect de la vie privée conformément à la loi n°78-17 du 6 janvier 1978 relative à l&apos;informatique, aux fichiers et aux libertés. Le site est déclaré à la CNIL sous le numéro XXXXXXX. Conformément à la réglementation applicable en matière de protection des données personnelles, l&apos;Utilisateur dispose d&apos;un droit d&apos;accès, de rectification, d&apos;effacement et d&apos;opposition concernant ses données personnelles. Pour exercer ses droits, l&apos;Utilisateur peut contacter le responsable du traitement à l&apos;adresse suivante : [adresse e-mail ou postale du responsable du traitement]. Pour plus d&apos;informations sur la manière dont vos données sont collectées et traitées, veuillez consulter notre Politique de Confidentialité.
                </p>
            </div>
        </div>

    )
}

export default TermsPage;