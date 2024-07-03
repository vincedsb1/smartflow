"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import DesktopMenu from "../../components/DesktopMenu";
import Cgu from "../../components/Cgu";

const TermsPage = () => {
    const router = useRouter();

    return (
        <div className="flex flex-row justify-center items-center">
            <div className="w-full sm:max-w-[1170px]  bg-neutral-200 dark:bg-neutral-700 sm:shadow-2xl sm:shadow-neutral-200 sm:dark:shadow-black flex flex-row ">
                <div className="hidden sm:block">
                    <DesktopMenu />
                </div>
                <div className="flex flex-col w-full sm:ml-48 md:ml-72 p-4 h-screen">
                    <Cgu />
                </div>
            </div>
        </div>
    );
};

export default TermsPage;
