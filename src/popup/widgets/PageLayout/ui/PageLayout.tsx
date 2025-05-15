import { Layout as AntLayout } from "antd";
import { useTheme } from "../../../hooks/useTheme";
import { FC, ReactNode } from "react";
import { Navigation } from "shared/ui/Navigation/Navigation";
import { NavType } from "../../../../types";
import { useLocation } from "react-router-dom";

type Props = {
  children: ReactNode;
  activeNav: NavType;
  setActiveNav?: (value: NavType) => void;
};

export const PageLayout: FC<Props> = ({ children }) => {
  const { isDarkMode } = useTheme();
  const location = useLocation();

  const navMapping: Record<string, NavType> = {
    "/": "add-mock",
    "/list": "list",
    "/settings": "settings",
  };

  return (
    <AntLayout
      style={{ padding: "10px" }}
      className={isDarkMode ? "dark-theme" : "light-theme"}
    >
      <Navigation activeNav={navMapping[location.pathname] || "add-mock"} />
      {children}
    </AntLayout>
  );
};
