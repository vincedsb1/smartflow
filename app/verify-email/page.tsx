"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@nextui-org/button';

const VerifyEmail = () => {
    const [message, setMessage] = useState('Vérification de votre e-mail...');

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const email = urlParams.get('email');

        const verifyEmail = async () => {
            try {
                // Vérifiez le token et l'email
                const response = await fetch(`/api/users/verify-email?token=${token}&email=${email}`);
                const data = await response.json();
                if (data.error) {
                    if (data.error === 'Invalid token or email') {
                        setMessage('Votre e-mail a été vérifié avec succès.');
                    } else {
                        throw new Error(data.error);
                    }
                } else {
                    setMessage(data.message);
                }
            } catch (error) {
                console.error('Error:', error);
                setMessage('Une erreur est survenue lors de la vérification de votre e-mail.');
            }
        };

        if (token && email) {
            verifyEmail();
        }
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <div className="p-5 bg-white rounded shadow-xl w-80">
                <h1 className="text-2xl font-bold mb-4">{message}</h1>
                <Link href="/today">
                    <Button color="primary">
                        Retour à l&apos;accueil
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default VerifyEmail;