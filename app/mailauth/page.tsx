"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";
import CardAppTitle from "../components/CardAppTitle";
import CardAppText from "../components/CardAppText";
import CardAppEmailInput from "../components/CardAppEmailInput";
import MainButton from "../components/MainButton";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const MailSignin = () => {
  const [email, setEmail] = useState("");
  const [cgu, setCgu] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("");

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangeCgu = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCgu(e.target.checked);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(`Sending request to /api/users?email=${email}`);

      const res = await fetch(`/api/users?email=${email}`);

      if (!res.ok) {
        console.log(`Request failed with status ${res.status}`);
        alert("Une erreur s'est produite lors de la vérification de l'e-mail");
        return;
      }

      const data = await res.json();
      console.log(`Received data: ${JSON.stringify(data)}`);
      const userExists = data.length > 0;
      console.log(`User exists: ${userExists}`);

      if (!cgu) {
        console.log("CGU not checked");
        alert("Vous devez accepter les CGU");
        return;
      }

      if (userExists && cgu) {
        console.log("Redirecting to /connexion");
        setRedirectUrl("/connexion");
      } else if (!userExists && cgu) {
        console.log("Redirecting to /inscription");
        setRedirectUrl("/inscription");
      } else if (!userExists && !cgu) {
        console.log("CGU not checked");
        alert("Vous devez accepter les CGU");
      }
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center h-screen"
    >
      <div className="flex flex-col items-center">
        <CardAppTitle title="Se connecter / S'inscrire" />
        <CardAppText
          text="Commencez par saisir votre email"
          icon={faEnvelope}
          size="large"
        />
      </div>
      <div className="mt-24"></div>
      <CardAppEmailInput onChange={handleChangeEmail} />
      <div className="flex items-center mt-4">
        <input onChange={handleChangeCgu} type="checkbox" id="cgu" name="cgu" />
        <label htmlFor="cgu" className="ml-2">
          {"J'accepte les conditions générales d'utilisation"}
        </label>
      </div>
      <Link href="/cgu">
        <p className="mt-2 mb-2 underline cursor-pointer">Consulter les CGU</p>
      </Link>
      <MainButton label="Suivant" type="normal" buttonType="submit" />
    </form>
  );
};

export default MailSignin;
