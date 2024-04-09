import React from "react";

interface ToggleProps {
  isOn: boolean;
  onToggle: () => void;
}

const Toggle: React.FC<ToggleProps> = ({ isOn, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none ${
        isOn ? "bg-cyan-600" : "bg-gray-200"
      }`}
      role="switch"
      aria-checked={isOn}
    >
      <span
        className={`transform transition-transform ${
          isOn ? "translate-x-6" : "translate-x-1"
        } inline-block w-4 h-4 transform bg-white rounded-full`}
      />
    </button>
  );
};

export default Toggle;
