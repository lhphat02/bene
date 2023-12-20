import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [fontSize, setFontSize] = useState(16);

  const theme = {
    colors: {
      primary: '#27374D',
      secondary: '#526D82',
      text: '#9DB2BF',
      background: '#DDE6ED',
    },
  };

  // Function to update font size
  const changeFontSize = (size) => {
    setFontSize(size);
  };

  // Function to handle dark mode toggling
  const changeDarkMode = (value) => {
    setIsDarkMode(Boolean(value));
  };

  return (
    <ThemeContext.Provider
      value={{ isDarkMode, changeDarkMode, fontSize, changeFontSize, theme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
