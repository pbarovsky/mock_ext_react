import { useState, useEffect } from "react";

export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (typeof chrome !== "undefined" && chrome.storage) {
      chrome.storage.local.get(["theme"], (result) => {
        setIsDarkMode(result.theme === "dark");
      });
    }
  }, []);

  const toggleTheme = (checked: boolean) => {
    setIsDarkMode(checked);
    if (typeof chrome !== "undefined" && chrome.storage) {
      chrome.storage.local.set({ theme: checked ? "dark" : "light" });
    }
  };

  return { isDarkMode, toggleTheme };
};
