import React from "react";
import Link from "next/link";
import CardAppTitle from "../components/CardAppTitle";
import CardAppText from "../components/CardAppText";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const reception = () => {
  return (
    <div className="bg-custom-background bg-cover bg-center flex flex-col justify-center items-center w-[400px] h-screen">
      <div className="mt-[25vh] flex flex-col items-center">
        <CardAppTitle title="Connectez-vous" />
        <Link href="/mailauth">
          <CardAppText text="Par email" icon={faEnvelope} size="small"/>
        </Link>
      </div>
    </div>
  );
};

export default reception;