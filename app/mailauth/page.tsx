"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import CardAppTitle from "../components/CardAppTitle";
import CardAppText from "../components/CardAppText";
import CardAppEmailInput from "../components/CardAppEmailInput";
import MainButton from "../components/MainButton";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { UserContext } from "../context/UserContext";

const MailSignin = () => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("UserContext must be used within a UserContextProvider");
  }

  const { email, setEmail } = userContext;
  const [cgu, setCgu] = useState(false);
  const router = useRouter();

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setEmail) {
      setEmail(e.target.value);
    }
  };

  const handleChangeCgu = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCgu(e.target.checked);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/users/checkEmail?email=${email}`);
      const data = await res.json();
  
      // Vérifiez si l'e-mail existe déjà dans la base de données
      const emailExists = res.ok && data.message === "Email already exists";
  
      if (!emailExists) {
        // Si l'e-mail n'existe pas, redirigez l'utilisateur vers la page d'inscription
        router.push("/inscription");
        return;
      }
  
      if (!cgu) {
        alert("Vous devez accepter les CGU");
        return;
      }
  
      // Si l'e-mail existe et que l'utilisateur a accepté les CGU, redirigez-le vers la page de connexion
      router.push("/connexion");
    } catch (err) {
      console.log(`Error: ${err}`);
      alert("Une erreur s'est produite lors de la vérification de l'e-mail");
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
      <div className="mt-24">
        <CardAppEmailInput onChange={handleChangeEmail} />
      </div>
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
      <button onClick={() => router.push("/today")} className="mt-4 underline">
        Go to today
      </button>
    </form>
  );
};

export default MailSignin;