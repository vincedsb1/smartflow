"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon as farMoon, faSun } from '@fortawesome/free-regular-svg-icons'
import { useTheme } from 'next-themes';
import { Button } from "@nextui-org/react";


const ButtonTheme = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);


    const handleThemeChange = () => {
        if (mounted) {
            setTheme(theme === 'dark' ? 'light' : 'dark');
        }
    }

    if (!mounted) return null;

    return (
        <div id='headerContainer' className='flex items-center justify-between h-16 bg-white-100'>
            <div className='flex items-center'>
                <Button id='toggleTheme' className='mr-4' onClick={handleThemeChange} isIconOnly>
                    <FontAwesomeIcon
                        icon={theme === 'dark' ? faSun : farMoon}
                        className=""
                    />
                </Button>
            </div>
        </div>
    );
}

export default ButtonTheme;
