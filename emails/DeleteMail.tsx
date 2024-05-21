import { Button, Html } from "@react-email/components";
import * as React from "react";

interface DeleteMailProps {
  email: string;
}

const DeleteMail: React.FC<DeleteMailProps> = ({ email }) => {
  return (
    <Html>
      <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center" }}>
        <h1
          style={{ fontWeight: "bold", fontSize: "24px", marginBottom: "16px" }}
        >
          Vous nous quittez ?
        </h1>
        <p style={{ fontSize: "16px", marginBottom: "12px" }}>
          Nous sommes désolés de vous voir partir. Nous tenons à vous remercier
          pour avoir utilisé notre application. Votre soutien et votre confiance
          nous ont été très précieux.
        </p>
        <p style={{ fontSize: "16px", marginBottom: "12px" }}>
          Si vous avez apprécié notre service, nous serions ravis que vous
          laissiez un avis sur les réseaux sociaux et sur les différentes
          plateformes. Vos commentaires nous aident à nous améliorer et à
          offrir un meilleur service à nos utilisateurs.
        </p>
        <div style={{ marginTop: "24px" }}>
            <p style={{ fontSize: "16px", marginBottom: "12px" }}>
                Si vous avez des questions ou des préoccupations, n&apos;hésitez pas à
                nous contacter à <a href="mailto:support@example.com">support@smartflow.fr</a>.
            </p>
        </div>
      </div>
    </Html>
  );
};

export default DeleteMail;
