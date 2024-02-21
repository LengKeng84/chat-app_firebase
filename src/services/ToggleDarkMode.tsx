import { useEffect, useContext } from "react";
import { MainContext } from "../context/MainProvider";

const ToggleDarkMode = () => {
  const { darkMode } = useContext(MainContext);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-bs-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-bs-theme", "light");
    }
  }, [darkMode]);
  return null;
};

export default ToggleDarkMode;
