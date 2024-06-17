/* eslint-disable @next/next/no-img-element */
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
            <div
                id="mainPage"
                style={{
                    fontFamily: "Helvetica, Arial, sans-serif",
                    background: "linear-gradient(180deg, rgba(6,182,212,1) 50%, rgba(14,116,144,1) 100%)",
                    filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr='#075985',endColorstr='#082f49',GradientType=1)",
                    padding: "40px 0",
                    minHeight: "100vh",
                    width: "100vw",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <div
                    id="mainContainer"
                    style={{
                        backgroundColor: "#06B6D4",
                        borderRadius: "24px",
                        maxWidth: "800px",
                        width: "90%",
                        boxShadow: "0px 34px 80px 30px rgba(0, 0, 0, 0.25)",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        paddingBottom: "14px",
                    }}
                >
                    <div
                        id="headerWithLogo"
                        style={{
                            backgroundImage: "url('http://localhost:3000/images/emailHeader.svg')",
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            borderRadius: "24px 24px 0 0",
                            height: "222px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "relative",
                        }}
                    >
                        <img
                            src="http://localhost:3000/images/LogoSmartFlowWhite.svg"
                            alt="Smartflow"
                            style={{
                                maxWidth: "150px",
                                maxHeight: "100px",
                                marginBottom: "25px",
                            }}
                        />
                    </div>
                    <div
                        id="confirmationContainer"
                        style={{
                            backgroundColor: "#FFFFFF",
                            borderRadius: "10px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            textAlign: "center",
                            margin: "0 auto",
                            width: "65%",
                            padding: "20px",
                            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.25)",
                            transform: "translateY(-50px)",
                        }}
                    >
                        <div id="envelopTitle" style={{ height: "100px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                            <img
                                src="http://localhost:3000/images/EnvelopeEmail.svg"
                                alt="enveloppe"
                                style={{ maxWidth: "40px", maxHeight: "50px" }}
                            />
                            <h1 style={{ color: "#0E7490", fontSize: "18px", fontWeight: "600" }}>
                                Confirmation d'Email
                            </h1>
                        </div>

                        <div style={{ width: "90%", height: "1px", backgroundColor: "#9499A3", opacity: "0.5", marginBottom: "12px" }}></div>
                        <p style={{ fontSize: "16px", color: "#666666" }}>
                            Bienvenue sur Smartflow {email}!
                        </p>
                        <p style={{ fontSize: "16px", color: "#666666" }}>
                            Bonjour ! Merci de vous être inscrit·e sur SmartFlow, veuillez confirmer votre email en cliquant sur le bouton ci-dessous.
                        </p>
                        <div style={{ marginTop: "24px" }}>
                            <a
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
                                    textAlign: "center",
                                }}
                            >
                                Valider votre email
                            </a>
                            <p style={{ fontSize: "16px", marginTop: "34px", color: "#666666" }}>
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
                            <p style={{ fontSize: "16px", color: "#666666" }}>
                                Si vous n'êtes pas à l'origine de cette demande,<br></br>
                                veuillez ignorer cet email.
                            </p>
                        </div>

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
                    <div
                        id="footer"
                        style={{
                            textAlign: "center",
                            padding: "14px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            backgroundColor: "rgba(6, 182, 212, 0.8)",
                            position: "relative",
                            top: "calc(50% - 40px)",
                        }}
                    >
                        <a href="https://www.smartflow-app.com/" style={{ textDecoration: "none" }}>
                            <p style={{ fontSize: "12px", fontWeight: "bold", color: "#FFFFFF", margin: 1 }}>
                                SmartFlow-app.com
                            </p>
                        </a>
                        <p style={{ fontSize: "12px", color: "#FFFFFF", marginBottom: "30px" }}>
                            2024 - Twenty Soft
                        </p>
                    </div>
                </div>
            </div>
        </Html>
    );
};

export default VerificationMail;
