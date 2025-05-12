import { Layout as AntdLayout } from "antd";
import { useTheme } from "../hooks/useTheme";
import { FC, ReactNode } from "react";

type LayotProps = {
  children: ReactNode;
};

export const Layout: FC<LayotProps> = ({ children }) => {
  const { isDarkMode } = useTheme();

  return (
    <AntdLayout
      style={{ padding: "10px" }}
      className={isDarkMode ? "dark-theme" : "light-theme"}
    >
      {children}
    </AntdLayout>
  );
};
