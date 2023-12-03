import { useState } from "react";
import { getPreferredTheme } from "../utils";

export const useTheme = () => {
  const [theme, setTheme] = useState(getPreferredTheme());

  const toggleTheme = () => {
    const isDark = theme === "dark";
    const newTheme = isDark ? "light" : "dark";
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = newTheme;
      setTheme(newTheme);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = newTheme;
      setTheme(newTheme);
    }
  };
  return {
    theme,
    toggleTheme,
  };
};
