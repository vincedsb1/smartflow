import React, { useState, ChangeEvent } from "react";
import { Input } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

interface CardAppPasswordInputProps {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  showForgotPassword?: boolean;
}

const CardAppPasswordInput: React.FC<CardAppPasswordInputProps> = ({
  onChange,
  showForgotPassword = true,
}) => {
  const [password, setPassword] = useState("");
  // const [passwordVisible, setPasswordVisible] = useState(false);

  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

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

  // const togglePasswordVisibility = () => {
  //   setPasswordVisible(!passwordVisible);
  // };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setHasStartedTyping(true);
    onChange && onChange(e);
  };

  return (
    <div id="main-container" className="w-full flex flex-col items-center">
      <div id="input" className="relative w-full max-w-md">
        {/* <Input
          className="rounded-2xl p-2 w-full h-12 mb-1 pr-10 relative z-10 text-6xl font-quicksand tracking-widest dark:bg-yellow-400"
          color="default"
          type={passwordVisible ? "text" : "password"}
          value={password}
          onChange={handlePasswordChange}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? (
                <FontAwesomeIcon
                  icon={faEyeSlash}
                  className="text-2xl text-default-400 pointer-events-none mb-3"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faEye}
                  className="text-2xl text-default-400 pointer-events-none mb-3"
                />
              )}
            </button>
          }
          style={{
            fontSize: "20px",
            fontFamily: "Quicksand",
            letterSpacing: "0.1em",
          }}
        /> */}
        <Input
          label="Mot de passe"
          variant="bordered"
          onChange={handlePasswordChange}
          color="primary"
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <FontAwesomeIcon
                  icon={faEyeSlash}
                  className="text-2xl text-default-400 pointer-events-none"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faEye}
                  className="text-2xl text-default-400 pointer-events-none"
                />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
          className="w-full  rounded-xl"
        />
        <div className="flex justify-end text-cyan-500 font-semibold mt-2">
          <p className="cursor-pointer">Mot de passe oublié ?</p>
        </div>
      </div>
      <div className="mt-2 w-full max-w-md">
        {passwordCriteria.map((criteria, index) => (
          <div key={index} className="flex items-center">
            <div className="pr-2 w-6 h-6">
              {criteria.validate(password) ? (
                <FontAwesomeIcon
                  icon={faCheck}
                  className="text-green-500 w-full h-full"
                />
              ) : (
                <div className="w-full h-full"></div>
              )}
            </div>
            <p
              className={`text-xs ${
                criteria.validate(password) ? "text-green-500" : ""
              }`}
            >
              {criteria.message}
            </p>
          </div>
        ))}
      </div>
      <div className="w-full max-w-md">
        {hasStartedTyping && errorMessage && (
          <p className="text-red-500 text-sm font-inter mx-2">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default CardAppPasswordInput;
