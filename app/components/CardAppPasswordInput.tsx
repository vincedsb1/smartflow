import React, { useState, ChangeEvent } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface CardAppPasswordInputProps {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CardAppPasswordInput: React.FC<CardAppPasswordInputProps> = ({
  onChange,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasStartedTyping, setHasStartedTyping] = useState(false);

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHasStartedTyping(true);
    onChange && onChange(e);

    if (!passwordRegex.test(e.target.value)) {
      setErrorMessage(
        "Le mot de passe doit comporter au moins 8 caractères, dont des lettres majuscules et minuscules, des chiffres et des caractères spéciaux"
      );
    } else {
      setErrorMessage("");
    }
  };

  return (
    <div id="-main-conatiner" className="w-18/20 flex flex-col items-center">
      <div id="title">
        <p className="text-neutral-600 font-semibold">Mot de passe</p>
      </div>
      <div id="input" className="relative">
        <input
          className="bg-white rounded-2xl p-2 w-80 h-12 mb-1 pr-10 relative z-10 text-6xl font-quicksand tracking-widest"
          type={passwordVisible ? "text" : "password"}
          onChange={handlePasswordChange}
          name="password"
          style={{
            fontSize: "20px",
            fontFamily: "Quicksand",
            letterSpacing: "0.1em",
          }}
        />
        <div
          className="absolute right-0 pr-3 flex items-center text-gray-500 cursor-pointer"
          onClick={togglePasswordVisibility}
          style={{ marginTop: "-2rem", zIndex: 10 }}
        >
          {passwordVisible ? <FiEyeOff /> : <FiEye />}
        </div>
        {!hasStartedTyping && (
          <div className="flex justify-end text-blue-500 font-semibold">
            <p className="cursor-pointer">Mot de passe oublié ?</p>
          </div>
        )}
      </div>
      <div className="">
        {hasStartedTyping && (
          <p className="text-red-500 text-sm font-inter mx-2">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default CardAppPasswordInput;
