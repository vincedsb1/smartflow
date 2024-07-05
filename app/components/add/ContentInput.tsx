import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect, useRef } from "react";
import CardAppText from "../CardAppText";
import CardAppTitle from "../CardAppTitle";
import { Textarea } from "@nextui-org/react";

interface ContentInputProps {
  onContentChange?: (content: string) => void;
}

const ContentInput: React.FC<ContentInputProps> = ({ onContentChange }) => {
  const [value, setValue] = useState("");

  const handleChange = (e: any) => {
    setValue(e.target.value);
    onContentChange && onContentChange(e.target.value);
  };

  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

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
          <div id="addTitle" className="flex flex-col w-16/20 sm:w-full ">
            <CardAppTitle title="Nouvelle fiche" size="big" />
          </div>
          <div
            id="addHint"
            className="flex flex-col items-center w-16/20 sm:w-full"
          >
            <CardAppText
              text="Quel est le contenu de cette fiche ?"
              icon={faFileLines}
            />
          </div>
        </div>
      </div>
      <div
        id="addMiddleContainer"
        className="flex flex-col justify-center items-center w-full flex-grow"
      >
        <div id="addInputContainer" className="w-16/20 mt-16 sm:w-full">
          <Textarea
            ref={inputRef}
            label="Description"
            placeholder="Votre réponse"
            className="w-full"
            onChange={handleChange}
            value={value}
          />
        </div>
      </div>
    </div>
  );
};

export default ContentInput;
