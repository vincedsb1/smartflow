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
                    Merci de valider votre mail pour accéder à notre liste d'attente.
                </p>
                <p style={{ fontSize: "16px", marginBottom: "12px" }}>
                    Si vous n'êtes pas à l'origine de cette demande, veuillez ignorer ce mail et nous contacter.
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
                        Valider votre mail
                    </Button>
                </div>
            </div>
        </Html>
    );
};

export default VerificationMail;
