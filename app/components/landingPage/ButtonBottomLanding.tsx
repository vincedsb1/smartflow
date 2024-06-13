"use client";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

interface ButtonConnexionProps {
  label: string;
  labelSmall: string;
}

const ButtonConnexion: React.FC<ButtonConnexionProps> = ({
  label,
  labelSmall,
}) => {
  const router = useRouter();

  const handleNavigation = () => {
    router.push("/login");
  };

  return (
    <div>
      <Button
        onClick={handleNavigation}
        id="buttonConnexion"
        color="primary"
        className="xs:hidden"
        size="lg"
      >
        {labelSmall}
      </Button>
      <Button
        onClick={handleNavigation}
        id="buttonConnexion"
        color="primary"
        className="hidden xs:block"
        size="lg"
      >
        {label}
      </Button>
    </div>
  );
};

export default ButtonConnexion;
