import { Button, Html } from "@react-email/components";
import * as React from "react";

interface WelcomeMailProps {
  email: string;
}

const WelcomeMail: React.FC<WelcomeMailProps> = ({ email }) => {
  return (
    <Html>
      <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center" }}>
        <h1
          style={{ fontWeight: "bold", fontSize: "24px", marginBottom: "16px" }}
        >
          Bienvenue sur Smartlow, {email}!
        </h1>
        <p style={{ fontSize: "16px", marginBottom: "12px" }}>
          Vous êtes maintenant connecté à notre plateforme. Nous sommes ravis de vous avoir parmi nous.
        </p>
        <p style={{ fontSize: "16px", marginBottom: "12px" }}>
          Vous pouvez maintenant commencer à explorer toutes les fonctionnalités que nous avons à offrir.
        </p>
        <div style={{ marginTop: "24px" }}>
        <Button
            href="/"
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
            Aller à la page d&apos;accueil
        </Button>
        </div>
      </div>
    </Html>
  );
};

export default WelcomeMail;