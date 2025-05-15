import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { Theme } from "@types";

export const useTheme = (): Theme => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return {
    isDarkMode: context.isDarkMode,
    toggleTheme: context.toggleTheme,
  };
};
