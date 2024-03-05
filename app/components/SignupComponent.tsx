import React, { useState } from "react";

const SignupComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }
    const user = {
      email,
      password,
      firstname: "Default",
      lastname: "Default",
      birthday: new Date(),
      onBoarding: false,
      imageUrl: "default.jpg",
      languageId: 1,
    };

    // Faire une requête HTTP POST à l'endpoint de l'API
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      const createdUser = await response.json();
      console.log(createdUser);
    } else {
      console.error("Erreur lors de la création de l'utilisateur");
    }
  };

return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="flex flex-col items-center mb-4">
            <h1 className="text-2xl font-bold mb-2">Créer un compte</h1>
            <label htmlFor="email" className="block mb-2">
                Email
            </label>
            <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <div className="flex flex-col items-center mb-4">
            <label htmlFor="password" className="block mb-2">
                Mot de passe
            </label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <div className="flex flex-col items-center mb-4">
            <label htmlFor="confirmPassword" className="block mb-2">
                Confirmer le mot de passe
            </label>
            <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
            S&apos;inscrire
        </button>
    </form>
);
};

export default SignupComponent;
