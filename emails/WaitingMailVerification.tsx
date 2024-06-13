/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Button, Html } from "@react-email/components";
import { Fullscreen } from "lucide-react";
import * as React from "react";
interface VerificationMailProps {
    email: string;
    link: string;
}

const VerificationMail: React.FC<VerificationMailProps> = ({ email, link }) => {
    return (
        <Html>
            <div style={{
                fontFamily: "Helvetica, Arial, sans-serif",
                background: "linear-gradient(180deg, rgba(6,182,212,1) 50%, rgba(14,116,144,1) 100%)",
                filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr='#075985',endColorstr='#082f49',GradientType=1)",
                padding: "40px 0",
                height: "100vh",
                width: "100vw"
            }}>
                <div
                    style={{
                        backgroundColor: "#06B6D4",
                        borderRadius: "24px",
                        maxWidth: "80%",
                        margin: "auto",
                        boxShadow: "0px 34px 80px 30px rgba(0, 0, 0, 0.25)"
                    }}
                >
                    <div style={{ maxWidth: "100%", maxHeight: "100%" }}>
                        <div id="header"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundImage: "url('http://localhost:3000/images/emailHeader.svg')",
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                borderRadius: "24px 24px 0 0",
                                height: "250px",
                            }}
                        >
                            <img
                                src="http://localhost:3000/images/LogoSmartFlowWhite.svg"
                                alt="Smartflow"
                                style={{ maxWidth: "300px", maxHeight: "100px" }}
                            />
                        </div>
                    </div>
                    <div>
                    </div>
                    <div id="confirmation" style={{
                        backgroundColor: "#FFFFFF",
                        padding: "48px",
                        borderRadius: "10px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        margin: "0 auto", // Centrer la div
                        maxWidth: "60%", // Largeur maximale de 60%
                        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                        position: "relative",
                        top: "-50px",
                    }}>
                        <img src="http://localhost:3000/images/EnvelopeEmail.svg"
                            alt="enveloppe"
                            style={{ maxWidth: "50px", maxHeight: "50px" }}
                        />
                        <h1 style={{ color: "#0E7490", fontSize: "24px", fontWeight: "600", marginLeft: "20px" }}>
                            Confirmation d'Email
                        </h1>
                        <div style={{ width: "90%", height: "1px", backgroundColor: "#9499A3", marginTop: "12px", opacity: "0.5" }}></div>
                        <p style={{ fontSize: "16px", color: "#666666" }}>
                            Bienvenue sur Smartflow, {email}!
                        </p>
                        <p style={{ fontSize: "16px", color: "#666666" }}>
                            Bonjour ! Merci de vous être inscrite sur SmartFlow, veuillez confirmer votre email en cliquant sur le bouton ci-dessous.
                        </p>
                        <p style={{ fontSize: "16px", color: "#666666" }}>
                            Si vous n'êtes pas à l'origine de cette demande, veuillez ignorer cet email et nous contacter.
                        </p>
                        <div style={{ marginTop: "24px" }}>
                            <Button
                                href={link}
                                style={{
                                    background: "#0E7490",
                                    color: "#FFFFFF",
                                    padding: "12px 24px",
                                    borderRadius: "14px",
                                    textDecoration: "none",
                                    display: "inline-block",
                                    fontSize: "16px",
                                    fontWeight: "600",
                                }}
                            >
                                Valider votre email
                            </Button>
                        </div>
                        <p style={{ fontSize: "14px", marginTop: "24px", color: "#666666" }}>
                            Ou cliquez sur le lien ci-dessous si le bouton ne fonctionne pas.
                        </p>
                        <a
                            href={link}
                            style={{
                                color: "#3182CE",
                                textDecoration: "none",
                                fontSize: "14px",
                                wordBreak: "break-all",
                            }}
                        >
                            {link}
                        </a>
                    </div>
                    <div style={{ textAlign: "center", padding: "14px" }}>
                        <p style={{ fontSize: "14px", color: "#FFFFFF" }}>Smartflow.com</p>
                        <p style={{ fontSize: "12px", color: "#FFFFFF" }}>Copyright © 2023 Smartflow. Tous droits réservés.</p>
                    </div>
                </div>

            </div>
        </Html>
    );
};

export default VerificationMail;