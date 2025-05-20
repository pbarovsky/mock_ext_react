import { theme as antdTheme } from "antd";
import { useMemo } from "react";
import { createTheme } from "@uiw/codemirror-themes";
import { tags as t } from "@lezer/highlight";

export const useEditorTheme = () => {
  const { token } = antdTheme.useToken();

  const isDarkMode = useMemo(() => {
    return token.colorBgContainer === "#141414" || token.colorBgBase === "#000";
  }, [token]);

  const customTheme = useMemo(() => {
    const darkStyles = [
      { tag: t.comment, color: "#8b949e", fontStyle: "italic" },
      { tag: t.string, color: "#a5d6ff" },
      { tag: t.number, color: "#d2a8ff" },
      { tag: t.keyword, color: "#ff7b72", fontWeight: "bold" },
      { tag: t.variableName, color: "#ffa657" },
      { tag: t.function(t.variableName), color: "#d2a8ff" },
      { tag: t.definition(t.variableName), color: "#79c0ff" },
      { tag: t.propertyName, color: "#c9d1d9" },
      { tag: t.bool, color: "#ff7b72" },
      { tag: t.null, color: "#ff7b72" },
    ];

    const lightStyles = [
      { tag: t.comment, color: "#6a737d", fontStyle: "italic" },
      { tag: t.string, color: "#032f62" },
      { tag: t.number, color: "#005cc5" },
      { tag: t.keyword, color: "#d73a49", fontWeight: "bold" },
      { tag: t.variableName, color: "#e36209" },
      { tag: t.function(t.variableName), color: "#6f42c1" },
      { tag: t.definition(t.variableName), color: "#005cc5" },
      { tag: t.propertyName, color: "#24292e" },
      { tag: t.bool, color: "#d73a49" },
      { tag: t.null, color: "#d73a49" },
    ];

    return {
      theme: createTheme({
        theme: isDarkMode ? "dark" : "light",
        settings: {
          background: isDarkMode ? token.colorBgContainer : "#ffffff",
          foreground: token.colorText,
          caret: token.colorPrimary,
          selection: isDarkMode ? "#44475a" : "#d7d7d7",
          lineHighlight: isDarkMode ? "#2c2c2c" : "#f0f0f0",
        },
        styles: isDarkMode ? darkStyles : lightStyles,
      }),
      borderColor: `1px solid ${token.colorBorder}`,
    };
  }, [isDarkMode, token]);

  return customTheme;
};
