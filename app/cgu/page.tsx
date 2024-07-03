"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Cgu from "../components/Cgu";

const TermsPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col w-full p-4 h-screen">
      <Cgu />
    </div>
  );
};

export default TermsPage;