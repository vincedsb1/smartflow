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
        className="h-10 w-24 xs:w-28 2xs:w-32 sm:w-36 mr-2"
        size="lg"
        isDisabled={true}
      >
        {label}
      </Button>
    </div>
  );
};

export default ButtonConnexion;
