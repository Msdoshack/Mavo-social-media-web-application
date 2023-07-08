import { createContext, useEffect, useState } from "react";

export const darkModeContext = createContext();

export const DarkModeContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );
  const toggle = () => {
    setDarkMode(!darkMode);
  };
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);
  return (
    <darkModeContext.Provider value={{ darkMode, toggle }}>
      {children}
    </darkModeContext.Provider>
  );
};
