"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";

const FooterLanding = () => {
  const { theme } = useTheme();
  return (
    <div
      id="footerLandingMainContainer"
      className="w-full h-48 bg-cyan-500 dark:bg-cyan-950 relative"
    >
      <div
        id="textFooter"
        className="absolute inset-0 flex flex-row h-full w-full justify-center items-center font-title  text-center z-20"
      >
        <p className="text-md text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
          © 2024 SmartFlow.
          <br /> <Link href="https://vincent.desbrosses.net">
            Twenty Soft
          </Link>{" "}
          - Tous droits réservés.
          <br /> Made with ❤️ in Nantes
        </p>
      </div>
      <Image
        src={
          theme === "dark"
            ? "/LandingFooterDark.svg"
            : "/LandingFooterLight.svg"
        }
        alt="logo"
        layout="fill"
        objectFit="cover"
        className="absolute opacity-30 z-10"
      />
    </div>
  );
};

export default FooterLanding;
