"use client";

import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import React, { useState, ChangeEvent } from "react";
import CardAppText from "../CardAppText";
import CardAppTitle from "../CardAppTitle";

interface TitleCreationProps {
  onTitleChange: (title: string) => void;
}

const TitleCreation: React.FC<TitleCreationProps> = ({ onTitleChange }) => {
  const [title, setTitle] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    onTitleChange(e.target.value);
  };

  return (
    <div id="addMainContainer" className="flex flex-col justify-between w-full">
      <div
        id="addTopContainer"
        className="flex flex-col justify-center w-full "
      >
        <div
          id="addHeaderContainer"
          className="flex flex-col justify-center items-center w-full"
        >
          <div id="addTitle" className="flex flex-col w-16/20 ">
            <CardAppTitle title="Nouvelle fiche" size="big" />
          </div>
          <div id="addHint" className="flex flex-col items-center w-16/20">
            <CardAppText
              text="Quel est le sujet de cette fiche ?"
              icon={faFileLines}
            />
          </div>
        </div>
      </div>
      <div
        id="addMiddleContainer"
        className="flex flex-col justify-center items-center w-full flex-grow"
      >
        <div id="addInputContainer" className="w-16/20 mt-16">
          <Input
            isRequired
            size="md"
            type="text"
            label="Titre de la fiche"
            radius="lg"
            className="w-full font-text mb-16"
            value={title}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};
export default TitleCreation;
