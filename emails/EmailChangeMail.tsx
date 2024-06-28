/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import { Html } from "@react-email/components";
import * as React from "react";

interface EmailChangeMailProps {
  email: string;
  link: string;
}

const EmailChangeMail: React.FC<EmailChangeMailProps> = ({ email, link }) => {
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
          border={0}
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
                width="90%"
                border={0}
                cellSpacing="0"
                cellPadding="0"
                style={{
                  backgroundColor: "#06B6D4",
                  borderRadius: "24px",
                  boxShadow: "0px 34px 80px 30px rgba(0, 0, 0, 0.25)",
                  overflow: "hidden",
                  maxWidth: "800px",
                }}
              >
                <tr
                  style={{
                    backgroundImage:
                      "url(https://www.smartflow-app.com/images/emailHeader.png)",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    height: "160px",
                  }}
                >
                  <td
                    align="center"
                    style={{
                      height: "222px",
                    }}
                  >
                    <img
                      src="https://www.smartflow-app.com/images/LogoSmartFlowWhite.png"
                      alt="Smartflow"
                      style={{
                        maxWidth: "180px",
                        maxHeight: "100px",
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td
                    align="center"
                    style={{
                      backgroundColor: "#FAFAFA",
                      borderRadius: "0px",
                      padding: "40px 20px",
                    }}
                  >
                    <table
                      width="90%"
                      border={0}
                      cellSpacing="0"
                      cellPadding="0"
                    >
                      <tr>
                        <td align="center" style={{ height: "100px" }}>
                          <h1
                            style={{
                              color: "#0E7490",
                              fontSize: "24px",
                              fontWeight: "bold",
                              marginBottom: "16px",
                            }}
                          >
                            Changement d'adresse e-mail sur SmartFlow {email}!
                          </h1>
                          <p
                            style={{
                              fontSize: "16px",
                              color: "#666666",
                              marginBottom: "12px",
                            }}
                          >
                            Vous avez demandé à changer votre adresse e-mail.
                            Veuillez confirmer que cette nouvelle adresse
                            e-mail est correcte en cliquant sur le lien
                            ci-dessous.
                          </p>
                        </td>
                      </tr>
                      <tr
                        style={{
                          verticalAlign: "middle",
                        }}
                      >
                        <td align="center" style={{}}>
                          <div
                            style={{
                              marginTop: "24px",
                              marginBottom: "32px",
                            }}
                          >
                            <a
                              href={link}
                              style={{
                                background: "#0E7490",
                                color: "#FFFFFF",
                                padding: "16px 40px",
                                borderRadius: "14px",
                                textDecoration: "none",
                                display: "inline-block",
                                fontSize: "18px",
                                fontWeight: 600,
                                textAlign: "center",
                              }}
                            >
                              Confirmer le changement d'adresse e-mail
                            </a>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td
                    align="center"
                    style={{
                      textAlign: "center",
                      backgroundColor: "#0E7490",
                      verticalAlign: "top",
                    }}
                  >
                    <div style={{ paddingBottom: "42px", paddingTop: "42px" }}>
                      <a
                        href="https://www.smartflow-app.com/"
                        style={{ textDecoration: "none" }}
                      >
                        <p
                          style={{
                            fontSize: "16px",
                            fontWeight: "bold",
                            color: "#FFFFFF",
                            margin: 0,
                          }}
                        >
                          smartflow-app.com
                          <br />
                          <span style={{ marginTop: "6px", display: "block" }}>
                            2024 - Twenty Soft
                          </span>
                        </p>
                      </a>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  );
};

export default EmailChangeMail;
