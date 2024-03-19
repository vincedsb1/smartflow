/* eslint-disable react/no-unescaped-entities */
import { Button, Html } from "@react-email/components";
import * as React from "react";

interface VerificationMailProps {
  email: string;
  link: string;
}

const VerificationMail: React.FC<VerificationMailProps> = ({ email, link }) => {

  return (
    <Html>
      <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center" }}>
        <h1
          style={{ fontWeight: "bold", fontSize: "24px", marginBottom: "16px" }}
        >
          Bienvenue sur Smartlow, {email}!
        </h1>
        <p style={{ fontSize: "16px", marginBottom: "12px" }}>
          Nous sommes ravis de vous accueillir dans notre communauté dédiée à&apos;
          l'apprentissage de la méthode Leithner.
        </p>
        <p style={{ fontSize: "16px", marginBottom: "12px" }}>
          Smartlow est une application conçue pour vous aider à maîtriser la
          méthode Leithner, une approche éprouvée pour la gestion
          d'investissements.
        </p>
        <p style={{ fontSize: "16px", marginBottom: "12px" }}>
          Maintenant, vous pouvez commencer votre voyage vers une meilleure
          compréhension des principes fondamentaux de l'investissement et de la
          gestion de portefeuille.
        </p>
        <div style={{ marginTop: "24px" }}>
          <Button
            href={link}
            style={{
              background: "#3182CE",
              color: "#FFFFFF",
              padding: "12px 24px",
              borderRadius: "9999px",
              textDecoration: "none",
              display: "inline-block",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            Se connecter à Smartlow
          </Button>
        </div>
      </div>
    </Html>
  );
};

export default VerificationMail;