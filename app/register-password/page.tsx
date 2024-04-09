"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import CardAppTitle from "../components/CardAppTitle";
import CardAppText from "../components/CardAppText";
import CardAppPasswordInput from "../components/CardAppPasswordInput";
import MainButton from "../components/MainButton";
import { UserContext } from "../context/UserContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const ConnexionPage = () => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("UserContext must be used within a UserContextProvider");
  }

  const { email, firstname, birthday, setUser } = userContext;

  console.log("Email:", email);
  console.log("Prénom:", firstname);
  console.log("Date de naissance:", birthday);

  const [password, setPassword] = useState("");

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
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
  
      // Ajoutez cette ligne pour stocker le token dans le contexte utilisateur
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
        }
          , 1000);
      }
    }
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div>
        <Link href={"/register-birthday"}>
          <button type="button" className="absolute top-0 left-0 mt-12 ml-6">
            <FontAwesomeIcon icon={faChevronLeft} className="h-6" />
          </button>
        </Link>
      </div>
      <div className="flex flex-col">
        <CardAppTitle title="Votre profil" />
        <CardAppText text="Choissisez un mot de passe" icon={faUser} />
      </div>
      <div className="mt-6">
        <CardAppPasswordInput onChange={handlePasswordChange} />
      </div>

      <div className="mt-64">
        {" "}
        <MainButton
          label="Continuer"
          type={password ? "normal" : "disabled"}
          buttonType="submit"
          disabled={!password}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}

export default ConnexionPage;