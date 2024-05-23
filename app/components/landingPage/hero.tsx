import React from 'react';
import { Button } from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';


const Hero = () => {
    const router = useRouter();

    const handleNavigation = () => {
        router.push("/login");
    }

    return (
        <div id='containerHero' className="w-full">
            <video className="w-full opacity-65" autoPlay loop muted>
                <source src="/clipstudent.mp4" type="video/mp4" />
            </video>
            <div id="containerTitleTextButtun" className='flex flex-col justify-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-4'>
                <h1 className="text-cyan-950 text-5xl font-bold mb-4 text-center">
                    Passez moins de temps à apprendre mieux !
                </h1>
                <p className="text-cyan-950 text-2xl font-bold mb-4 text-center">SmartFlow vous fait apprendre à petites doses. La méthode la plus efficace, tout simplement.</p>
                <Button className="bg-cyan-950 text-white w-60" onClick={handleNavigation}>
                    <FontAwesomeIcon icon={faRocket} />
                    Let&apos;s go
                </Button>
            </div>
        </div>
    );
}

export default Hero;