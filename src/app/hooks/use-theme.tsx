import { useState } from "react";

export const useTheme = () => {
  const [theme, setTheme] = useState(localStorage.theme ?? "light");

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
