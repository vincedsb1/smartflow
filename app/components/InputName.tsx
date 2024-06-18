import React, { useState } from "react";
import { Input } from "@nextui-org/react";

interface InputNameProps {
  label: string;
  inputType: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; 
}

const InputName: React.FC<InputNameProps> = ({ label, inputType, onChange }) => {
  return (
    <div id="-main-conatiner" className="w-18/20 flex flex-col">
      <div id="title" className="mt-6">
        <p className="text-neutral-600 font-semibold">{label}</p>
      </div>
      <Input
        type={inputType}
        onChange={onChange} 
        className="bg-white rounded-2xl p-2 w-80 h-12 mb-1 pr-10 relative z-10  font-quicksand text-base font-quicksand tracking-wide"
      />
      <div id="input" className="relative"></div>
    </div>
  );
};

export default InputName;