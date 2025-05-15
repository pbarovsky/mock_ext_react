import { useEffect, useState, ReactNode, FC } from "react";
import { ConfigProvider, theme } from "antd";
import { ThemeContext } from "../../../shared/lib/theme/ThemeContext";

export const Provider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    if (typeof chrome !== "undefined" && chrome.storage) {
      chrome.storage.local.get(["theme"], (result) => {
        setIsDarkMode(result.theme === "dark");
      });
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      if (typeof chrome !== "undefined" && chrome.storage) {
        chrome.storage.local.set({ theme: !prev ? "dark" : "light" });
      }
      return !prev;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <ConfigProvider
        theme={{
          algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};
