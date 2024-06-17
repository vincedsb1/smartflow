import { Button, Html } from "@react-email/components";
import * as React from "react";

interface VerificationMailProps {
  email: string;
  link: string;
}

const VerificationMail: React.FC<VerificationMailProps> = ({ email, link }) => {
  return (
    <html lang="fr">
      <body
        style={{
          fontFamily: "Helvetica, Arial, sans-serif",
          background: "#FFFFFF",
          padding: "40px 0",
          minHeight: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <table
          width="100%"
          border="0"
          cellSpacing="0"
          cellPadding="0"
          style={{
            background: "#FFFFFF",
            padding: "40px 0",
          }}
        >
          <tr>
            <td align="center">
              <table
                width="70%"
                border="0"
                cellSpacing="0"
                cellPadding="0"
                style={{
                  backgroundColor: "#06B6D4",
                  borderRadius: "24px",
                  boxShadow: "0px 34px 80px 30px rgba(0, 0, 0, 0.25)",
                  overflow: "hidden",
                }}
              >
                <tr
                  style={{
                    backgroundImage:
                      "url(https://www.smartflow-app.com/images/emailHeader.svg)",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    height: "222px",
                  }}
                >
                  <td></td>
                  <td
                    align="center"
                    style={{
                      height: "222px",
                    }}
                  >
                    <img
                      src="https://www.smartflow-app.com/images/LogoSmartFlowWhite.svg"
                      alt="Smartflow"
                      style={{
                        maxWidth: "150px",
                        maxHeight: "100px",
                        marginBottom: "25px",
                      }}
                    />
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td style={{ width: "40px" }}></td>
                  <td
                    align="center"
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderRadius: "10px",
                      padding: "40px 20px",
                      boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.25)",
                      transform: "translateY(-50px)",
                    }}
                  >
                    <table
                      width="90%"
                      border="0"
                      cellSpacing="0"
                      cellPadding="0"
                    >
                      <tr>
                        <td align="center" style={{ height: "100px" }}>
                          <img
                            src="https://www.smartflow-app.com/images/EnvelopeEmail.png"
                            alt="enveloppe"
                            style={{ maxWidth: "40px", maxHeight: "50px" }}
                          />
                          <h1
                            style={{
                              color: "#0E7490",
                              fontSize: "24px",
                              fontWeight: 600,
                              margin: "20px 0",
                            }}
                          >
                            Confirmation d'Email
                          </h1>
                        </td>
                      </tr>
                      <tr>
                        <td
                          align="center"
                          style={{
                            width: "90%",
                            height: "1px",
                            backgroundColor: "#9499A3",
                            opacity: 0.5,
                            margin: "20px 0",
                          }}
                        ></td>
                      </tr>
                      <tr
                        style={{
                          height: "60px",
                        }}
                      >
                        <td
                          align="center"
                          style={{
                            fontSize: "16px",
                            color: "#666666",
                            marginBottom: "20px",
                          }}
                        >
                          Bienvenue sur <b>SmartFlow </b> {email} !
                        </td>
                      </tr>
                      <tr
                        style={{
                          height: "60px",
                          verticalAlign: "top",
                        }}
                      >
                        <td
                          align="center"
                          style={{
                            fontSize: "16px",
                            color: "#666666",
                          }}
                        >
                          Bonjour ! Merci de vous être inscrit·e sur SmartFlow,
                          veuillez confirmer votre email en cliquant sur le
                          bouton ci-dessous :
                        </td>
                      </tr>
                      <tr
                        style={{
                          height: "68px",
                          verticalAlign: "top",
                        }}
                      >
                        <td align="center" style={{ margin: "24px 0" }}>
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
                              fontWeight: 600,
                              textAlign: "center",
                            }}
                          >
                            Valider mon email
                          </a>
                        </td>
                      </tr>
                      <tr
                        style={{
                          height: "60px",
                          verticalAlign: "top",
                        }}
                      >
                        <td
                          align="center"
                          style={{
                            fontSize: "16px",
                            margin: "34px 0 20px",
                            color: "#666666",
                          }}
                        >
                          Si le bouton ne fonctionne pas, cliquez ou
                          copiez-coller le lien ci-dessous <br />
                          dans votre navigateur :
                        </td>
                      </tr>
                      <tr
                        style={{
                          height: "60px",
                          verticalAlign: "top",
                        }}
                      >
                        <td
                          align="center"
                          style={{
                            color: "#3182CE",
                            textDecoration: "none",
                            fontSize: "14px",
                            wordBreak: "break-all",
                            marginBottom: "20px",
                          }}
                        >
                          <a href={link}>{link}</a>
                        </td>
                      </tr>
                      <tr>
                        <td
                          align="center"
                          style={{
                            fontSize: "16px",
                            color: "#666666",
                            marginBottom: "20px",
                          }}
                        >
                          Si vous n'êtes pas à l'origine de cette demande,
                          veuillez ignorer cet email.
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td style={{ width: "40px" }}></td>
                </tr>
                <tr>
                  <td></td>
                  <td
                    align="center"
                    style={{
                      textAlign: "center",
                      padding: "14px",
                      backgroundColor: "rgba(6, 182, 212, 0.8)",
                    }}
                  >
                    <a
                      href="https://www.smartflow-app.com/"
                      style={{ textDecoration: "none" }}
                    >
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: "bold",
                          color: "#FFFFFF",
                          margin: "1px",
                        }}
                      >
                        SmartFlow-app.com
                      </p>
                    </a>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#FFFFFF",
                        marginBottom: "30px",
                      }}
                    >
                      2024 - Twenty Soft
                    </p>
                  </td>
                  <td></td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  );
};

export default VerificationMail;
