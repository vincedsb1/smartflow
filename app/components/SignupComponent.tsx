import React, { useEffect, useState } from "react";

const SignupComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    console.log(passwordError);
  }, [passwordError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Le mot de passe doit comporter au moins 8 caractères, dont des lettres majuscules et minuscules, des chiffres et des caractères spéciaux"
      );
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError("Les mots de passe ne correspondent pas");
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

    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (errorData.error.includes("email")) {
        setEmailError(errorData.error);
      } else if (errorData.error.includes("mot de passe")) {
        setPasswordError(errorData.error);
      }
    } else {
      setEmailError("");
      setPasswordError("");
      const data = await response.json();
      console.log(data);
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
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
        {emailError && <p className="text-red-500">{emailError}</p>}
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
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
        {passwordError && <p className="text-red-500">{passwordError}</p>}
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
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600"
      >
        S&apos;inscrire
      </button>
    </form>
  );
};

export default SignupComponent;
