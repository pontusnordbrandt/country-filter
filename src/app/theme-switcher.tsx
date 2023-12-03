import { useTheme } from "./hooks/use-theme";

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button className="select-none text-3xl" onClick={toggleTheme}>
      {theme === "dark" ? "🌔" : "🌞"}
    </button>
  );
};
