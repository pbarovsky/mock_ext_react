import { ConfigProvider, theme } from "antd";
import { FC, ReactNode } from "react";

interface ThemeProviderProps {
  children: ReactNode;
  isDarkMode: boolean;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({
  children,
  isDarkMode,
}) => {
  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      {children}
    </ConfigProvider>
  );
};
