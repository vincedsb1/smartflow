"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Toggle from "./components/Toggle";
import { Sun, Moon } from "lucide-react";

function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    queueMicrotask(() => setMounted(true));
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [mounted, theme]);

  if (!mounted) return null;

  const isDarkMode = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  return (
    <div className="flex items-center">
      <Toggle isOn={isDarkMode} onToggle={toggleTheme} />
    </div>
  );
}

export default ThemeSwitcher;
