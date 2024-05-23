"use client";
import React, { useEffect, useState } from 'react';
import { Button } from "@nextui-org/react";
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon as farMoon, faSun } from '@fortawesome/free-regular-svg-icons'
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';

const Header = () => {
    const router = useRouter();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleNavigation = () => {
        router.push("/login");
    }

    const handleThemeChange = () => {
        if (mounted) {
            setTheme(theme === 'dark' ? 'light' : 'dark');
        }
    }

    if (!mounted) return null;

    return (
        <div id='headerContainer' className='flex items-center justify-between h-16 bg-white-100'>
            <Image id='logoHeader' src={theme === 'dark' ? "/logo-dark.svg" : "/logo-light.svg"} alt="Logo" className='h-10 ml-4' width={200} height={100} />
            <div className='flex items-center'>
                <Button onClick={handleNavigation} id="buttonConnexion" color='primary' className='h-10 mr-4'>Connexion</Button>
                <Button id='toggleTheme' className='mr-4' onClick={handleThemeChange} isIconOnly>
                    <FontAwesomeIcon icon={theme === 'dark' ? faSun : farMoon} />
                </Button>
            </div>
        </div>
    );
}

export default Header;