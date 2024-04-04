"use client";

import { UserContext } from "../../context/UserContext";
import { Input, Button } from "@nextui-org/react";
import { useState, useContext } from "react";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CardAppTitle from "../../components/CardAppTitle";
import ServerFirstNameEditPage from "./ServerFirstNameEditPage";
import { useRouter } from "next/navigation";

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
      if (userContext) {
        const updatedFirstname = await ServerFirstNameEditPage(
          firstname,
          userContext.token ?? ""
        );
        userContext.setFirstname(updatedFirstname);
        router.push("/user");
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
            <CardAppTitle title="Modifier le prénom" size="small" />
          </div>
          <div className="flex flex-col justify-between items-center w-16/20">
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
