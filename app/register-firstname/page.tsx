"use client";
import React, { useState, useEffect, useContext } from "react";
import CardAppText from "../components/CardAppText";
import CardAppTitle from "../components/CardAppTitle";
import MainButton from "../components/MainButton";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import InputName from "../components/InputName";
import { useRouter } from "next/navigation";
import { useUser } from "../context/UserContext";

const InscriptionPage = () => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string | null>(null);
  const { user, setUser, setEmail, setFirstname } = useUser();

  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFirstName(event.target.value);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");
      setToken(token);
      console.log("Token récupéré de l'URL:", token);
    }
  }, []);

  useEffect(() => {
    const verifyEmail = async () => {
      if (token) {
        console.log("Token:", token);
        try {
          const response = await fetch(`/api/emailverification?token=${token}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          console.log("Réponse de l'API:", response);
          const data = await response.json();
          console.log("Données de l'API:", data);
          setEmail(data.email);
          setUser({ ...user, email: data.email });
        } catch (error) {
          console.error(error);
          router.push('/mailauth');
        }
      }
    };
  
    verifyEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleContinue = () => {
    console.log("Prénom stocké:", firstName);
    if (firstName) {
      setFirstname(firstName);
    }

    if (user.email) {
      router.push("/register-birthay");
    } else {
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div>
        <Link href={"/register-inscription"}>
          <button type="button" className="absolute top-0 left-0 mt-12 ml-6">
            <FontAwesomeIcon icon={faChevronLeft} className="h-6" />
          </button>
        </Link>
      </div>
      <div className="flex flex-col">
        <CardAppTitle title="Votre Profil" />
        <CardAppText
          text="Quel est votre prénom ?"
          size="large"
          icon={faUser}
        />
      </div>
      <div>
        <InputName
          label="Prénom"
          inputType="text"
          onChange={handleFirstNameChange}
        />
      </div>
      <div className="mt-64 flex flex-col items-center">
        <div className="flex justify-center">
          <MainButton
            label="Continuer"
            type="normal"
            onClick={handleContinue}
          />{" "}
        </div>
      </div>
    </div>
  );
};

export default InscriptionPage;
