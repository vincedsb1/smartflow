import { Html } from "@react-email/components";
import * as React from "react";

interface DeleteMailProps {
  email: string;
}

const DeleteMail: React.FC<DeleteMailProps> = ({ email }) => {
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
                              marginTop: "20px",
                              marginBottom: "38px",
                            }}
                          >
                            Vous nous quittez ?
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
                      <tr style={{}}>
                        <td
                          align="center"
                          style={{
                            fontSize: "16px",
                            color: "#666666",
                            marginBottom: "20px",
                          }}
                        >
                          <div
                            style={{
                              marginTop: "32px",
                              marginBottom: "32px",
                            }}
                          >
                            Nous sommes désolés de vous voir partir, {email}.
                          </div>
                        </td>
                      </tr>
                      <tr
                        style={{
                          verticalAlign: "middle",
                        }}
                      >
                        <td
                          align="center"
                          style={{
                            fontSize: "16px",
                            color: "#666666",
                          }}
                        >
                          <div
                            style={{
                              marginBottom: "32px",
                            }}
                          >
                            Merci d`&apos;`avoir utilisé notre application. Votre soutien et votre confiance nous ont été très précieux.
                          </div>
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
                              marginBottom: "32px",
                              color: "#666666",
                            }}
                          >
                            Si vous avez apprécié notre service, nous serions ravis que vous laissiez un avis sur les réseaux sociaux et sur les différentes plateformes. Vos commentaires nous aident à nous améliorer et à offrir un meilleur service à nos utilisateurs.
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td
                          align="center"
                          style={{
                            fontSize: "16px",
                            color: "#666666",
                          }}
                        >
                          <div
                            style={{
                              marginBottom: "16px",
                            }}
                          >
                            Si vous avez des questions ou des préoccupations, n`&apos;`hésitez pas à nous contacter à <a href="mailto:support@example.com">support@smartflow.fr</a>.
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

export default DeleteMail;
