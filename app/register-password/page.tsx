"use client";
import React, { ChangeEvent, useContext, useState } from "react";
import { Link as NextUILink } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import CardAppTitle from "../components/CardAppTitle";
import CardAppText from "../components/CardAppText";
import CardAppPasswordInput from "../components/CardAppPasswordInput";
import { UserContext } from "../context/UserContext";
import { Checkbox } from "@nextui-org/react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@nextui-org/react";

const ConnexionPage = () => {
  const userContext = useContext(UserContext);
  const { theme } = useTheme();
  const logo = theme === "dark" ? "/logo-dark.svg" : "/logo-light.svg";

  if (!userContext) {
    throw new Error("UserContext must be used within a UserContextProvider");
  }

  const { email, firstname, birthday, setUser } = userContext;
  const [password, setPassword] = useState("");
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleChangeCgu = (event: ChangeEvent<HTMLInputElement>) => {
    setHasAcceptedTerms(event.target.checked);
  };

  const router = useRouter();

  const handleSubmit = async () => {
    if (!password) {
      alert("Veuillez entrer un mot de passe");
      return;
    }

    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        firstname: firstname,
        birthday: birthday,
        lastname: "Default",
        onBoarding: false,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      userContext.setToken(data.token);

      const deleteResponse = await fetch(
        `/api/emailverification/delete-emailverification?email=${email}`,
        {
          method: "DELETE",
        }
      );

      if (deleteResponse.ok) {
        console.log(
          "Utilisateur enregistré et vérification par e-mail supprimée avec succès"
        );

        setTimeout(async () => {
          console.log("Tentative de connexion avec l'email et le mot de passe suivants :", email, password);
          const response = await fetch("/api/users/check-password", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            if (data.status === "ok") {
              console.log("Token reçu de l'API (Page connexion) :", data.token);
              userContext.setToken(data.token);
              console.log("Token défini dans userContext");
              router.push("/onboarding");
              console.log("Redirigé vers /onboarding");
              setUser({ email, firstname, birthday, setUser });
              console.log("Utilisateur défini");
            }
          }
        }, 1000);
      }
    }
  };
  const handleBack = () => {
    router.back();
  };

  return (
    <div
      id="mailAuthMainContainer"
      className="flex flex-col items-center justify-center w-full h-screen min-h-screen"
    >
      <div
        id="chevronContainer"
        className="sm:hidden fixed top-12 xs:top-4 xs:left-0 left-0 flex flex-row justify-start items-center h-16 w-full p-4 "
      >
        <FontAwesomeIcon
          icon={faChevronLeft}
          className="text-neutral-800 dark:text-neutral-200 text-xs w-4 h-4"
          onClick={handleBack}
        />
      </div>
      <div
        id="logoContainer"
        className="hidden sm:flex flex-row justify-start items-center h-16 w-full relative p-4"
      >
        <Image src={logo} alt="logo" width={151} height={38} priority={true} />
      </div>
      {/* Mobile */}
      <div id="mobileVersion" className="flex flex-col items-center justify-center w-full sm:hidden overflow-y-auto 3xs:h-auto xs:h-auto sm:h-auto  ">
        <div className="w-4/5 m-8 3xs:m-4 xs:mt-20">
          <CardAppTitle title="Votre profil" size="big" />
        </div>
        <div className="w-4/5 m-8 3xs:mt-1">
          <CardAppText
            text="Choisissez un mot de passe"
            icon={faUser}
          />
        </div>
        <div id="registerPasswordInputContainer" className="w-full">
          <CardAppPasswordInput onChange={handlePasswordChange} />
        </div>
        <div className="w-4/5 flex items-center mt-14">
          <Checkbox
            size="md"
            onChange={handleChangeCgu}
            className="font-text"
            isSelected={hasAcceptedTerms}
          >
            J&apos;accepte les conditions générales d&apos;utilisation
          </Checkbox>
        </div>
        <div className="w-4/5 flex flex-row justify-start mb-4 ml-4 mt-1 3xs:mt-0">
          <NextUILink href="/cgu">
            Consulter les CGU
          </NextUILink>
        </div>
        <div className="w-4/5 mt-4 3xs:mt-0 xs:mb-4">
          <Button
            color={(password && hasAcceptedTerms) ? "primary" : "default"}
            size="lg"
            disabled={!(password && hasAcceptedTerms)}
            onClick={handleSubmit}
            className="w-full mt-4 3xs:mt-0 font-bold"
          >
            Continuer
          </Button>
        </div>
      </div>

      {/* Version desktop */}
      <div id="desktopVersion" className="hidden sm:flex w-16/20 lg:w-16/20 h-3/4 bg-white shadow-lg rounded-2xl flex-row items-start justify-between border-neutral-200 mx-auto my-auto">
        <div className="hidden 3xs:flex w-1/2 h-full relative ">
          <Image
            src="/images/entryVisual.svg"
            alt="Entry Visual"
            width={400}
            height={600}
            className="object-cover w-full h-full rounded-tl-2xl rounded-bl-2xl"
          />
          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
            <h2 className="text-4xl font-bold font-quicksand text-cyan-900">Bienvenue</h2>
          </div>
        </div>
        <div className="flex flex-col items-center dark:bg-neutral-800 justify-center w-1/2 h-full p-8 overflow-auto dark:rounded-tr-2xl dark:rounded-br-2xl">
          <div className="w-full max-w-md  ">
            <CardAppTitle title="Votre profil" />
          </div>
          <div className="w-full max-w-md mt-4 lg:mt-4">
            <CardAppText
              text="Choissisez un mot de passe"
              icon={faUser}
            />
          </div>
          <div id="registerPasswordInputContainer" className="w-full max-w-md mt-4 ">
            <CardAppPasswordInput onChange={handlePasswordChange} />
          </div>
          <div className="w-full max-w-md flex items-center mt-12">
            <Checkbox
              size="md"
              onChange={handleChangeCgu}
              className="font-text"
              isSelected={hasAcceptedTerms}
            >
              J&apos;accepte les conditions générales d&apos;utilisation
            </Checkbox>
          </div>
          <div className="w-full max-w-md flex flex-row justify-start">
            <NextUILink href="/cgu">
              Consulter les CGU
            </NextUILink>
          </div>
          <div className="w-full max-w-md mt-2">
            <Button
              color={(password && hasAcceptedTerms) ? "primary" : "default"}
              size="lg"
              disabled={!(password && hasAcceptedTerms)}
              onClick={handleSubmit}
              className="w-full mt-4 max-w-full pr-14 pl-14 font-bold"
            >
              Continuer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConnexionPage;
