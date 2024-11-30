import React, { useEffect, useState } from "react";
import "./ToggleButton.css";

const ToggleButton = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      setDarkTheme();
    } else {
      setLightTheme();
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const setDarkTheme = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
    localStorage.setItem("selectedTheme", "dark");
  };

  const setLightTheme = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
    localStorage.setItem("selectedTheme", "light");
  };

  const selectedTheme = localStorage.getItem("selectedTheme");

  if (selectedTheme === "light") {
    setLightTheme();
  } else {
    setDarkTheme();
  }

  return (
    <div
      onClick={toggleTheme}
      className={`toggle-button ${isDarkMode ? "dark" : "light"}`}
    >
      {isDarkMode ? "🌙" : "☀️"}
    </div>
  );
};

export default ToggleButton;
