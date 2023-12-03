export const onlyLettersRegexp = /^[a-zA-Z\s]*$/;

export const getPreferredTheme = () => {
  const localStorageTheme = localStorage.theme;
  const matchMediaPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const currentTheme = localStorageTheme || (matchMediaPrefersDark ? "dark" : "light");
  currentTheme === "dark" && document.documentElement.classList.add(currentTheme);
  return currentTheme;
}