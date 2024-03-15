import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface InputNameBirthdayProps {
  label: string;
  inputType: string;
}

const InputNameBirthday: React.FC<InputNameBirthdayProps> = (props) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
  };

  const handleCalendarToggle = () => {
    setShowCalendar(!showCalendar);
  };

  return (
    <div id="-main-conatiner" className="w-18/20 flex flex-col">
      <div id="title" className="mt-6">
        <p className="text-neutral-600 font-semibold">{props.label}</p>
      </div>
      <div id="input" className="relative">
        <input
          className="bg-white rounded-2xl p-2 w-80 h-12 mb-1 pr-10 relative z-10 text-6xl font-quicksand tracking-widest"
          type={passwordVisible ? "text" : "text"}
          onChange={handleInputChange}
          name="text"
          style={{
            fontSize: "20px",
            fontFamily: "Quicksand",
            letterSpacing: "0.1em",
          }}
        />
        <button
          className="absolute top-0 right-0 mt-2 mr-2"
          onClick={handleCalendarToggle}
        >
          Toggle Calendar
        </button>
        {showCalendar && (
          <div className="absolute top-14 left-0 z-20">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default InputNameBirthday;
