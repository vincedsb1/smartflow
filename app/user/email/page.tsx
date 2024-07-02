"use client";

import { UserContext } from "../../context/UserContext";
import { Input, Button } from "@nextui-org/react";
import { useState, useContext } from "react";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CardAppTitle from "../../components/CardAppTitle";
import { useRouter } from "next/navigation";
import DesktopMenu from "../../components/DesktopMenu";

const ClientEmailEditPage = () => {
  const userContext = useContext(UserContext);
  const [email, setEmail] = useState(userContext?.email || "");
  const [displayMessage, setDisplayMessage] = useState("");
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleEmailChange = async () => {
    console.log(`Current email: ${userContext?.email}`);
    console.log(`New email: ${email}`);

    // Simple validation for email
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setDisplayMessage("Veuillez entrer un email valide");
      return;
    }

    try {
      if (userContext) {
        const response = await fetch("/api/users/ServerEmailEditPage", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userContext.token}`,
          },
          body: JSON.stringify({
            currentEmail: userContext.email,
            newEmail: email,
          }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error);
        }

        const data = await response.json();
        userContext.setEmail(email);
        router.push("/user");
      }
    } catch (error) {
      setDisplayMessage((error as Error).message);
    }
  };

  return (
    <div className="flex flex-row justify-center items-center">
      <div className="w-full sm:max-w-[1170px]  bg-neutral-200 dark:bg-neutral-700 sm:shadow-2xl sm:shadow-neutral-200 sm:dark:shadow-black flex flex-row ">
        <div className="hidden sm:block">
          <DesktopMenu />
        </div>
        <div
          id="emailPageMainContainer"
          className="flex flex-col justify-between min-h-screen  w-full sm:ml-48 md:ml-72"
        >
          <div
            id="emailPageTopContainer"
            className="flex flex-col justify-center w-full"
          >
            <div id="emailBackIcon" className="w-full flex flex-col mt-16">
              <button
                type="button"
                onClick={() => router.back()}
                className="text-neutral-800 dark:text-neutral-200 text-xs w-4 h-4 m-5"
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
            </div>
            <div
              id="emailPageHeaderContainer"
              className="flex flex-col justify-center items-center w-full"
            >
              <div id="emailPageTitle" className="flex flex-col mt-10 w-16/20">
                <CardAppTitle title="Email" size="small" />
              </div>
              <div className="flex flex-col justify-between items-center w-16/20">
                <Input
                  value={email}
                  onChange={handleInputChange}
                  className="mb-32 h-9 w-full"
                />
              </div>
            </div>
          </div>
          <div
            id="emailPageBottomContainer"
            className="flex flex-col justify-center items-center w-full mb-32"
          >
            <Button
              type="submit"
              color="primary"
              variant="solid"
              size="lg"
              className="w-80 font-bold font-text"
              onClick={handleEmailChange}
            >
              Modifier l&apos;email
            </Button>
            {displayMessage && <p>{displayMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientEmailEditPage;
