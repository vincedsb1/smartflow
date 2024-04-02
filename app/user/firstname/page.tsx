"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import CardAppTitle from "../../components/CardAppTitle";
import { UserContext } from "../../context/UserContext";

const FirstNameEditPage = () => {
  const [displayMessage, setDisplayMessage] = React.useState("");
  const userContext = useContext(UserContext);
  console.log("userContext : ", userContext?.firstname);

  if (!userContext) {
    throw new Error("UserContext must be used within a UserContextProvider");
  }

  // const { email, firstname, birthday, setUser } = userContext;

  const [firstname, setFirstname] = useState(userContext.firstname);

  const handleFirstnameChange = async () => {
    try {
      const response = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstname }),
      });

      if (response.ok) {
        const data = await response.json();
        userContext.setFirstname(data.firstname);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      id="firstNamePageMainContainer"
      className="flex flex-col justify-between min-h-screen w-full"
    >
      <div
        id="firstNamePageTopContainer"
        className="flex flex-col justify-center w-full "
      >
        <div id="firstNameBackIcon" className="w-full flex flex-col mt-16">
          <Link href="/user">
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="text-neutral-800 dark:text-neutral-200 text-xs w-4 h-4 m-5"
            />
          </Link>
        </div>
        <div
          id="firstNamePageHeaderContainer"
          className="flex flex-col justify-center items-center w-full "
        >
          <div id="firstNamePageTitle" className="flex flex-col mt-10 w-16/20 ">
            <CardAppTitle title="Modifier le prénom" size="small" />
          </div>
          <div className="flex flex-col justify-between items-center w-16/20">
            <div id="firstNamePageInputContainer" className="w-full mb-1">
              <Input
                size="md"
                className="font-text"
                radius="lg"
                type="text"
                label="Prénom"
                value={userContext.firstname}
                // onChange={handlePasswordChange}
                fullWidth={true}
              />
            </div>
            <div
              id="firstNamePageMessageContainer"
              className="mb-32 h-9 w-full ml-5"
            >
              {displayMessage && (
                <p className="text-red-500 text-xs font-text">
                  {displayMessage}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        id="firstNamePageBottomContainer"
        className="flex flex-col justify-center items-center mb-32"
      >
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

//   const [password, setPassword] = useState("");
//
//   const message = "Le mot de passe est incorrect, veuillez réessayer.";

//   const router = useRouter();

//   return (

//   );
// };

// export default ConnexionPage;
