import { Button, Html } from "@react-email/components";
import * as React from "react";

interface EmailChangeMailProps {
  email: string;
  link: string;
}

const EmailChangeMail: React.FC<EmailChangeMailProps> = ({ email, link }) => {
  return (
    <Html>
      <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center" }}>
        <h1
            style={{ fontWeight: "bold", fontSize: "24px", marginBottom: "16px" }}
        >
            Changement d&apos;adresse e-mail sur Smartlow, {email}!
        </h1>
        <p style={{ fontSize: "16px", marginBottom: "12px" }}>
          Vous avez demandé à changer votre adresse e-mail. Veuillez confirmer que cette nouvelle adresse e-mail est correcte en cliquant sur le lien ci-dessous.
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
            Confirmer le changement d&apos;adresse e-mail
        </Button>
        </div>
      </div>
    </Html>
  );
};

export default EmailChangeMail;