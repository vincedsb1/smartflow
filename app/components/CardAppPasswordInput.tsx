import React, { useState, ChangeEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faCheck } from "@fortawesome/free-solid-svg-icons";

interface CardAppPasswordInputProps {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  showForgotPassword?: boolean;
}

const CardAppPasswordInput: React.FC<CardAppPasswordInputProps> = ({
  onChange,
  showForgotPassword = true,
}) => {
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasStartedTyping, setHasStartedTyping] = useState(false);

  const passwordCriteria = [
    {
      validate: (password: string) => password.length >= 8,
      message: "8 caractères minimum",
    },
    {
      validate: (password: string) => /[A-Z]/.test(password),
      message: "Contient des lettres MAJUSCULES",
    },
    {
      validate: (password: string) => /[a-z]/.test(password),
      message: "Contient des lettres minuscules",
    },
    {
      validate: (password: string) => /\d/.test(password),
      message: "Contient 1 chiffre minimum",
    },
    {
      validate: (password: string) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
      message: "Contient 1 caractère spécial minimum",
    },
  ];

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setHasStartedTyping(true);
    onChange && onChange(e);
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
          {passwordVisible ? (
            <FontAwesomeIcon icon={faEyeSlash} />
          ) : (
            <FontAwesomeIcon icon={faEye} />
          )}
        </div>
        {!hasStartedTyping && showForgotPassword && (
          <div className="flex justify-end text-cyan-500 font-semibold">
            <p className="cursor-pointer">Mot de passe oublié ?</p>
          </div>
        )}
      </div>
      <div className="mt-2">
        {passwordCriteria.map((criteria, index) => (
          <div key={index} className="flex items-center">
            {criteria.validate(password) && (
              <FontAwesomeIcon icon={faCheck} className="text-green-500" />
            )}
            <p className={criteria.validate(password) ? "text-green-500" : ""}>
              {criteria.message}
            </p>
          </div>
        ))}
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
