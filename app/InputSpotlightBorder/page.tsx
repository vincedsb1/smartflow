"use client";

import { useRef, useState } from "react";

const InputSpotlightBorder = () => {
  const divRef0 = useRef<HTMLDivElement>(null);
  const divRef1 = useRef<HTMLDivElement>(null);
  const [position0, setPosition0] = useState({ x: 0, y: 0 });
  const [position1, setPosition1] = useState({ x: 0, y: 0 });
  const [opacity0, setOpacity0] = useState(0);
  const [opacity1, setOpacity1] = useState(0);

  const handleMouseMove0 = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef0.current) return;
    const rect = divRef0.current.getBoundingClientRect();
    setPosition0({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseMove1 = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef1.current) return;
    const rect = divRef1.current.getBoundingClientRect();
    setPosition1({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter0 = () => setOpacity0(1);
  const handleMouseEnter1 = () => setOpacity1(1);
  const handleMouseLeave0 = () => setOpacity0(0);
  const handleMouseLeave1 = () => setOpacity1(0);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-neutral-950 gap-y-5">
      <div className="relative w-60">
        <div
          id="card-0"
          ref={divRef0}
          onMouseMove={handleMouseMove0}
          onMouseEnter={handleMouseEnter0}
          onMouseLeave={handleMouseLeave0}
          className="w-60 h-60 bg-neutral-950 cursor-default rounded-xl border-3 border-slate-800 p-3.5 text-slate-100 transition-colors duration-500 placeholder:select-none placeholder:text-neutral-500 focus:border-[#E47320] focus:outline-none"
        >
          <h3 className="text-lg font-semibold mb-5 text-neutral-700 dark:text-neutral-300 font-title">
            Gagnez un temps fou
          </h3>
          <p className="text-base font-title text-neutral-600 dark:text-neutral-300">
            Dites adieu aux longues heures de bachotage inefficaces. Avec
            SmartFlow, apprenez plus en moins de temps.
          </p>
          <div
            style={{
              border: "3px solid rgb(228 115 32)",
              opacity: opacity0,
              WebkitMaskImage: `radial-gradient(100% 200px at ${position0.x}px ${position0.y}px, black 45%, transparent)`,
            }}
            aria-hidden="true"
            className="w-60 h-60 pointer-events-none absolute left-0 top-0 z-10 cursor-default rounded-xl bg-[transparent] p-3.5 opacity-0 transition-opacity duration-500 placeholder:select-none"
          ></div>
        </div>
      </div>
      <div className="relative w-60">
        <div
          id="card-1"
          ref={divRef1}
          onMouseMove={handleMouseMove1}
          onMouseEnter={handleMouseEnter1}
          onMouseLeave={handleMouseLeave1}
          className="w-60 h-60 bg-neutral-950 cursor-default rounded-xl border-3 border-slate-800 p-3.5 text-slate-100 transition-colors duration-500 placeholder:select-none placeholder:text-neutral-500 focus:border-[#E47320] focus:outline-none"
        >
          <h3 className="text-lg font-semibold mb-5 text-neutral-700 dark:text-neutral-300 font-title">
            Gagnez un temps fou
          </h3>
          <p className="text-base font-title text-neutral-600 dark:text-neutral-300">
            Dites adieu aux longues heures de bachotage inefficaces. Avec
            SmartFlow, apprenez plus en moins de temps.
          </p>
          <div
            style={{
              border: "3px solid rgb(228 115 32)",
              opacity: opacity1,
              WebkitMaskImage: `radial-gradient(100% 200px at ${position1.x}px ${position1.y}px, black 45%, transparent)`,
            }}
            aria-hidden="true"
            className="w-60 h-60 pointer-events-none absolute left-0 top-0 z-10 cursor-default rounded-xl bg-[transparent] p-3.5 opacity-0 transition-opacity duration-500 placeholder:select-none"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default InputSpotlightBorder;
