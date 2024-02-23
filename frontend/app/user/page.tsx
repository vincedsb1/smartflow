import React from "react";
import ThemeSwitcher from "../ThemeSwitcher";

const add = () => {
  return (
    <div className="flex flex-col justify-center  h-screen align-middle items-center">
      <div>
        <p>Page user</p>
      </div>
      <div className="flex flex-row p-10">
        <div className=" pr-5">
          <p>Mode sombre </p>
        </div>
        <div className="">
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
};

export default add;
