"use client";
import { Button } from "@nextui-org/react";
import { useRouter } from 'next/navigation';

const ButtonConnexion = () => {
    const router = useRouter();

    const handleNavigation = () => {

        router.push("/login");
    }

    return (
        <div>
            <Button onClick={handleNavigation} id="buttonConnexion" color='primary' className='h-10 mr-4'>Connexion</Button>
        </div>
    );

}

export default ButtonConnexion;