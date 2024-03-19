import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface InputBirthdayProps {
  label: string;
  inputType: string;
  onChange: (date: Date | null) => void;
}

const InputBirthday: React.FC<InputBirthdayProps> = (props) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    props.onChange(date);
  };

  return (
    <div id="-main-conatiner" className="w-18/20 flex flex-col">
      <div id="title" className="mt-6">
        <p className="text-neutral-600 font-semibold">{props.label}</p>
      </div>
      <div id="input" className="relative">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          className="bg-white rounded-2xl p-2 w-80 h-12 mb-1 pr-10 relative z-10  font-quicksand text-base font-quicksand tracking-wide"
        />
      </div>
    </div>
  );
};

export default InputBirthday;