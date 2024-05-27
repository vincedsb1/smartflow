"use client";

import { UserContext } from "../../context/UserContext";
import { Input, Button } from "@nextui-org/react";
import { useState, useContext } from "react";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CardAppTitle from "../../components/CardAppTitle";
import { useRouter } from "next/navigation";

import jwt from "jsonwebtoken";

const ClientFirstNameEditPage = () => {
  const userContext = useContext(UserContext);
  const [firstname, setFirstname] = useState(userContext?.firstname || "");
  const [displayMessage, setDisplayMessage] = useState("");
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstname(e.target.value);
  };

  const handleFirstnameChange = async () => {
    try {
      const nameRegex = /^[a-zA-Z\s]+$/;
      const trimmedFirstname = firstname ? firstname.trim() : '';
      if (!nameRegex.test(trimmedFirstname)) {
        setDisplayMessage("Le prénom ne doit contenir que des lettres et des espaces");
        return;
      }
      if (userContext) {
        const decodedToken = jwt.decode(userContext.token ?? "");
        const userId = decodedToken?.userId;

        if (!userId) {
          throw new Error("User ID not found in token");
        }

        const response = await fetch(`/api/users/firstname/${userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userContext.token}`,
          },
          body: JSON.stringify({ firstname: trimmedFirstname }),
        });

        if (response.ok) {
          const data = await response.json();
          userContext.setFirstname(data.firstname);
          router.push("/user");
        } else {
          const errorData = await response.json();
          throw new Error(errorData.error);
        }
      }
    } catch (error) {
      setDisplayMessage((error as Error).message);
    }
  };

  return (
    <div
      id="firstNamePageMainContainer"
      className="flex flex-col justify-between min-h-screen w-full"
    >
      <div
        id="firstNamePageTopContainer"
        className="flex flex-col justify-center w-full"
      >
        <div id="firstNameBackIcon" className="w-full flex flex-col mt-16">
          <button
            type="button"
            onClick={() => router.back()}
            className="text-neutral-800 dark:text-neutral-200 text-xs w-4 h-4 m-5"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        </div>
        <div
          id="firstNamePageHeaderContainer"
          className="flex flex-col justify-center items-center w-full"
        >
          <div id="firstNamePageTitle" className="flex flex-col mt-10 w-16/20">
            <CardAppTitle title="Prénom" size="small" />
          </div>
          <div
            id="firstNameInputContainer"
            className="flex flex-col justify-between items-center w-16/20"
          >
            <Input
              value={firstname}
              onChange={handleInputChange}
              className="mb-32 h-9 w-full"
            />
          </div>
        </div>
      </div>
      <div
        id="firstNamePageBottomContainer"
        className="flex flex-col justify-center items-center w-full mb-32"
      >
        <Button
          type="submit"
          color="primary"
          variant="solid"
          size="lg"
          className="w-80 font-bold font-text"
          onClick={handleFirstnameChange}
        >
          Modifier le prénom
        </Button>
        {displayMessage && <p>{displayMessage}</p>}
      </div>
    </div>
  );
};

export default ClientFirstNameEditPage;
