/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import { Button, Html } from "@react-email/components";
import * as React from "react";

interface WelcomeMailProps {
  email: string;
  link: string;
}

const WelcomeMail: React.FC<WelcomeMailProps> = ({ email, link }) => {
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
            id="welcomeContainer"
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
            <h1 style={{ color: "#0E7490", fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>
              Bienvenue sur Smartflow, {email}!
            </h1>
            <p style={{ fontSize: "16px", color: "#666666", marginBottom: "12px" }}>
              Vous êtes maintenant connecté à notre plateforme. Nous sommes ravis de vous avoir parmi nous.
            </p>
            <p style={{ fontSize: "16px", color: "#666666", marginBottom: "12px" }}>
              Vous pouvez maintenant commencer à explorer toutes les fonctionnalités que nous avons à offrir.
            </p>
            <div style={{ marginTop: "24px" }}>
              <a
                href={link}
                style={{
                  background: "#3182CE",
                  color: "#FFFFFF",
                  padding: "12px 24px",
                  borderRadius: "14px",
                  textDecoration: "none",
                  display: "inline-block",
                  fontSize: "16px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Aller à la page d'accueil
              </a>
            </div>
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

export default WelcomeMail;
