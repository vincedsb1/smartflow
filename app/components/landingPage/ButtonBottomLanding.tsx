"use client";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

interface ButtonConnexionProps {
  label: string;
}

const ButtonConnexion: React.FC<ButtonConnexionProps> = ({ label }) => {
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
        className="w-56"
        size="lg"
      >
        {label}
      </Button>
    </div>
  );
};

export default ButtonConnexion;
