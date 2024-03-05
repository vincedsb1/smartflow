"use client"
import React, { useEffect, useState } from "react";


import SignupComponent from "../components/SignupComponent";
import LoginComponent from "../components/LoginComponent";

const connexionPAge = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96">
        <SignupComponent />
        <LoginComponent />
      </div>
    </div>
  );
}

export default connexionPAge;