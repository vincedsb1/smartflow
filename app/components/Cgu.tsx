"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

const Cgu = () => {
  const router = useRouter();

  return (
    <div className="h-screen overflow-hidden pb-16">
      <button
        type="button"
        onClick={() => router.back()}
        className="text-neutral-800 dark:text-neutral-200 text-xs w-4 h-4 m-5"
      >
        <FontAwesomeIcon icon={faChevronLeft} className="" />
      </button>

      <div className="h-full overflow-y-auto bg-neutral-200 dark:bg-neutral-700 sm:shadow-neutral-200 sm:dark:shadow-black rounded-lg p-4">
        <h1 className="text-3xl font-bold">
          Conditions Générales d&apos;Utilisation de SmartFlow
        </h1>
        <h2 className="text-2xl font-bold mt-4">Préambule</h2>
        <p className="mt-4">
          SmartFlow est un service fourni par la société Twenty Soft, SIRET :
          89039471100026, dont le propriétaire est Vincent DESBROSSES. Le site
          est hébergé par Vercel.
        </p>
        <h2 className="text-2xl font-bold mt-4">Présentation du service</h2>
        <p className="mt-4">
          1.1 SmartFlow est un site Web dédié à améliorer l&apos;apprentissage
          de ses utilisateurs. Nous proposons une plateforme interactive
          permettant aux utilisateurs de créer, gérer et réviser des fiches
          d&apos;apprentissage.
          <br />
          1.2 Pour utiliser le service, les utilisateurs ont pour obligation de
          créer un compte avec une adresse e-mail, et de fournir les
          informations suivantes : prénom et date de naissance.
        </p>
        <h2 className="text-2xl font-bold mt-4">
          Processus d&apos;inscription
        </h2>
        <p className="mt-4">
          2.1 SmartFlow est destiné à tout type de public, sans restriction
          d&apos;âge.
          <br />
          2.2 Lors de l&apos;inscription, les informations requises sont :
          e-mail, prénom et date de naissance.
          <br />
          2.3 L&apos;utilisateur est responsable de l&apos;exactitude des
          informations fournies lors de l&apos;inscription et s&apos;engage à
          les maintenir à jour.
        </p>
        <h2 className="text-2xl font-bold mt-4">
          Politique de confidentialité et protection des données
        </h2>
        <p className="mt-4">
          3.1 SmartFlow collecte les données suivantes : prénom, e-mail, date de
          naissance, ainsi que les données d&apos;utilisation telles que le
          titre et le contenu des fiches, et les dates de récit et de création.
          <br />
          3.2 Ces données sont collectées dans le but d&apos;assurer le bon
          fonctionnement du service.
          <br />
          3.3 Les données sont conservées sans limite de durée.
          <br />
          3.4 L&apos;utilisateur a la possibilité de supprimer son compte et les
          données associées depuis la page paramètres.
          <br />
          3.5 SmartFlow s&apos;engage à respecter le Règlement Général sur la
          Protection des Données (RGPD) pour les utilisateurs concernés.
        </p>
        <h2 className="text-2xl font-bold mt-4">Propriété intellectuelle</h2>
        <p className="mt-4">
          4.1 Le contenu du site SmartFlow, incluant mais non limité aux textes,
          graphiques, logos, images, et logiciels, est la propriété de SmartFlow
          ou de ses fournisseurs de contenu et est protégé par les lois sur la
          propriété intellectuelle.
          <br />
          4.2 Le contenu généré par les utilisateurs reste leur propriété. En
          utilisant SmartFlow, l&apos;utilisateur accorde à SmartFlow une
          licence non exclusive, transférable, sous-licenciable, gratuite et
          mondiale pour héberger, utiliser, distribuer, modifier, exécuter,
          copier, représenter publiquement ou afficher publiquement le contenu.
        </p>
        <h2 className="text-2xl font-bold mt-4">
          Règles d&apos;utilisation du service
        </h2>
        <p className="mt-4">
          5.1 Les comportements suivants sont strictement interdits sur
          SmartFlow :
          <br />
          Publier du contenu illégal, diffamatoire, harcelant ou obscène
          <br />
          Usurper l&apos;identité d&apos;une autre personne
          <br />
          Tenter d&apos;accéder de manière non autorisée aux systèmes de
          SmartFlow
          <br />
          Utiliser le service pour envoyer du spam ou des contenus publicitaires
          non sollicités
          <br />
          5.2 En cas de non-respect de ces règles, SmartFlow se réserve le droit
          de suspendre ou de supprimer le compte de l&apos;utilisateur sans
          préavis.
        </p>
        <h2 className="text-2xl font-bold mt-4">Responsabilités</h2>
        <p className="mt-4">
          6.1 SmartFlow s&apos;efforce de fournir un service de qualité, mais ne
          peut garantir que le service sera ininterrompu ou exempt
          d&apos;erreurs. SmartFlow ne saurait être tenu responsable des
          dommages directs ou indirects résultant de l&apos;utilisation du
          service.
          <br />
          6.2 L&apos;utilisateur est responsable de toutes les activités
          effectuées sous son compte et s&apos;engage à notifier immédiatement
          SmartFlow de toute utilisation non autorisée de son compte.
        </p>
        <h2 className="text-2xl font-bold mt-4">
          Modification et résiliation du service
        </h2>
        <p className="mt-4">
          7.1 SmartFlow se réserve le droit de modifier ces CGU à tout moment.
          Les utilisateurs seront informés des modifications importantes par
          e-mail ou via le site.
          <br />
          7.2 L&apos;utilisateur peut résilier son compte à tout moment depuis
          la page paramètres. SmartFlow se réserve le droit de résilier ou
          suspendre un compte en cas de violation des CGU.
        </p>
        <h2 className="text-2xl font-bold mt-4">
          Loi applicable et juridiction compétente
        </h2>
        <p className="mt-4">
          Ces CGU sont régies par le droit français. Tout litige relatif à
          l&apos;interprétation ou l&apos;exécution de ces CGU sera soumis aux
          tribunaux compétents de Paris, France.
        </p>
        <h2 className="text-2xl font-bold mt-4">
          Cookies et technologies similaires
        </h2>
        <p className="mt-4">
          SmartFlow utilise des cookies et des technologies similaires pour
          améliorer l&apos;expérience utilisateur et analyser l&apos;utilisation
          du service. L&apos;utilisateur peut gérer ses préférences en matière
          de cookies dans les paramètres de son navigateur.
        </p>
        <h2 className="text-2xl font-bold mt-4">Contact</h2>
        <p className="mt-4">
          Pour toute question ou réclamation concernant ces CGU ou le service
          SmartFlow, veuillez nous contacter à l&apos;adresse suivante :
          contact@smartflow-app.com
        </p>
        <h2 className="text-2xl font-bold mt-4">Informations légales</h2>
        <p className="mt-4">
          Éditeur du site : Twenty Soft
          <br />
          SIRET : 89039471100026
          <br />
          Propriétaire : Vincent DESBROSSES
          <br />
          Hébergeur : Vercel
        </p>
        <p className="mt-4">
          En utilisant SmartFlow, vous acceptez ces Conditions Générales
          d&apos;Utilisation.
          <br />
          Date de dernière mise à jour : 10/07/2024
        </p>
      </div>
    </div>
  );
};

export default Cgu;
