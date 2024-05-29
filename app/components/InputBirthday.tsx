import React, { useState } from "react";
import { Input } from "@nextui-org/react";

interface InputBirthdayProps {
  label: string;
  inputType: string;
  onChange: (date: Date | null) => void;
}

const InputBirthday: React.FC<InputBirthdayProps> = (props) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(event.target.value);
    setSelectedDate(date);
    props.onChange(date);
  };

  return (
    <div id="-main-conatiner">
      <div id="title">
        <p className="text-neutral-600 font-semibold">{props.label}</p>
      </div>
      <div id="input" className="relative">
        <Input
          type="date"
          value={selectedDate ? selectedDate.toISOString().substring(0, 10) : ""}
          onChange={handleDateChange}
          className="w-80 mb-20 font-text"
        />
      </div>
    </div>
  );
};

export default InputBirthday;