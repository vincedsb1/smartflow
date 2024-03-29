"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const FirstNameEditPage = () => {
  const [displayMessage, setDisplayMessage] = React.useState("");
  return (
    <div
      id="connexionMainContainer"
      className="flex flex-col justify-between min-h-screen w-full "
    >
      <div
        id="connexionTopContainer"
        className="flex flex-col justify-center w-full"
      >
        <div id="themeSwitcherBackIcon" className="w-full flex flex-col mt-16">
          <Link href="/user">
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="text-neutral-800 dark:text-neutral-200 text-xs w-4 h-4 m-5"
            />
          </Link>
        </div>
        <div
          id="connexionHeaderContainer"
          className="flex flex-col justify-center items-center w-full"
        >
          <div id="connexionTitle" className="flex flex-col mt-10 w-16/20 ">
            connexionTitle
          </div>
          <div
            id="connexionHint"
            className="flex flex-col items-center w-16/20"
          >
            connexionHint
          </div>
        </div>
      </div>
      <div
        id="connexionBottomContainer"
        className="flex flex-col justify-center items-center mb-14 "
      >
        <div className="flex flex-col justify-between items-center w-16/20">
          <div id="connexionInputContainer" className="w-full mb-1">
            <Input
              size="md"
              className="font-text"
              radius="lg"
              type="text"
              label="Prénom"
              // onChange={handlePasswordChange}
              fullWidth={true}
            />
          </div>
          <div id="connexionMessageContainer" className="mb-32 h-9 w-full ml-5">
            {displayMessage && (
              <p className="text-red-500 text-xs font-text">{displayMessage}</p>
            )}
          </div>
        </div>
        <div className="flex items-center w-16/20"></div>
        <div
          id="connexionCGUContainer"
          className="flex flex-row w-16/20 justify-start"
        ></div>
        <Button
          type="submit"
          color="primary"
          variant="solid"
          size="lg"
          className="w-80 font-bold font-text"
          // onClick={}
          // isDisabled={password === ""}
        >
          Modifier le prénom
        </Button>
      </div>
    </div>
  );
};

export default FirstNameEditPage;

//
// import CardAppTitle from "../components/CardAppTitle";
// import CardAppText from "../components/CardAppText";
// import { UserContext } from "../context/UserContext";
// import { faUnlock } from "@fortawesome/free-solid-svg-icons";
// import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
//

// const ConnexionPage = () => {
//   const [isVisible, setIsVisible] = React.useState(false);

//   const toggleVisibility = () => setIsVisible(!isVisible);

//   const userContext = useContext(UserContext);

//   if (!userContext) {
//     throw new Error("UserContext must be used within a UserContextProvider");
//   }

//   const { email, firstname, birthday, setUser } = userContext;

//   const [password, setPassword] = useState("");
//
//   const message = "Le mot de passe est incorrect, veuillez réessayer.";

//   const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setPassword(e.target.value);
//   };

//   const router = useRouter();

//   const handlePasswordCheck = async () => {
//     try {
//       const response = await fetch("/api/users/check-password", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       if (response.status === 401) {
//         setDisplayMessage(message);
//       } else {
//         const data = await response.json();

//         if (data.status === "ok") {
//           userContext.setToken(data.token);
//           setUser({ email, firstname, birthday, setUser });
//           router.push("/onboarding");
//         }
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (

//   );
// };

// export default ConnexionPage;
