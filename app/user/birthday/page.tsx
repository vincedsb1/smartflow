"use client";

import { UserContext } from "../../context/UserContext";
import { Input, Button } from "@nextui-org/react";
import React, { useState, useContext, useEffect } from "react";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CardAppTitle from "../../components/CardAppTitle";
import ServerBirthdayEditPage from "./ServerBirthdayEditPage";
import { useRouter } from "next/navigation";
import Datepicker from "react-tailwindcss-datepicker";

const ClientBirthdayEditPage = () => {
  const userContext = useContext(UserContext);
  const [birthday, setBirthday] = useState(userContext?.birthday || "");
  const [displayMessage, setDisplayMessage] = useState("");
  const router = useRouter();
  const [value, setValue] = useState<{
    startDate: string | null;
    endDate: string | null;
  }>({
    startDate: null,
    endDate: null,
  });

  useEffect(() => {
    if (userContext?.birthday) {
      setValue({
        startDate: new Date(userContext.birthday).toISOString().split("T")[0],
        endDate: new Date(userContext.birthday).toISOString().split("T")[0],
      });
    }
  }, [userContext?.birthday]);

  const handleValueChange = (newValue: any) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthday(e.target.value);
  };

  const handleBirthdayChange = async () => {
    try {
      if (userContext && value.startDate) {
        // Ajoutez l'heure à la date
        const fullDate = `${value.startDate}T00:00:00.000Z`;
        const updatedBirthday = await ServerBirthdayEditPage(
          fullDate,
          userContext.token ?? ""
        );
        userContext.setBirthday(updatedBirthday);
        router.push("/user");
      }
    } catch (error) {
      setDisplayMessage((error as Error).message);
    }
  };

  console.log("value:", value);
  console.log("startDate:", value.startDate);
  console.log("endDate:", value.endDate);
  return (
    <div
      id="birthdayPageMainContainer"
      className="flex flex-col justify-between min-h-screen w-full"
    >
      <div
        id="birthdayPageTopContainer"
        className="flex flex-col justify-center w-full"
      >
        <div id="birthdayBackIcon" className="w-full flex flex-col mt-16">
          <button
            type="button"
            onClick={() => router.back()}
            className="text-neutral-800 dark:text-neutral-200 text-xs w-4 h-4 m-5"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        </div>
        <div
          id="birthdayPageHeaderContainer"
          className="flex flex-col justify-center items-center w-full"
        >
          <div id="birthdayPageTitle" className="flex flex-col mt-10 w-16/20">
            <CardAppTitle title="Date de naissance" size="small" />
          </div>
          <div className="flex flex-col justify-between items-center w-16/20">
            <Datepicker
              i18n={"fr"}
              useRange={false}
              asSingle={true}
              value={value}
              onChange={handleValueChange}
              displayFormat={"DD/MM/YYYY"}
            />
          </div>
        </div>
      </div>
      <div
        id="birthdayPageBottomContainer"
        className="flex flex-col justify-center items-center w-full mb-32"
      >
        <Button
          type="submit"
          color="primary"
          variant="solid"
          size="lg"
          className="w-80 font-bold font-text"
          onClick={handleBirthdayChange}
        >
          Modifier la date de naissance
        </Button>
        {displayMessage && <p>{displayMessage}</p>}
      </div>
    </div>
  );
};

export default ClientBirthdayEditPage;
