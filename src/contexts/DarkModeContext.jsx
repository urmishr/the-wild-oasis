import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const systemTheme = window.matchMedia(`(prefers-color-scheme:dark)`).matches;
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    systemTheme,
    "isDarkMode",
  );
  const toggleDarkMode = () => setIsDarkMode((isDark) => !isDark);
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
      document.documentElement.classList.add("light-mode");
    }
  }, [isDarkMode]);
  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error("DarkModeContext is used outside of DarkModeProvider");
  return context;
}

export { useDarkMode, DarkModeProvider };
