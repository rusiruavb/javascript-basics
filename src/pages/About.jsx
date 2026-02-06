import React from "react";
import { useTheme } from "../contexts/ThemeContext";

const About = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`about-page ${theme}`}>
      <h1>About Us</h1>
      <p>This is the about page of our application.</p>
      <button onClick={toggleTheme}>
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </button>
    </div>
  );
};
