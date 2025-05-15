import { Layout as AntLayout } from "antd";
import { FC, ReactNode } from "react";
import { NavigationBar } from "shared/ui/Navigation";
import { NavType } from "../../../../types";
import { useLocation } from "react-router-dom";
import { theme } from "antd";

type Props = {
  children: ReactNode;
  activeNav: NavType;
  setActiveNav?: (value: NavType) => void;
};

export const PageLayout: FC<Props> = ({ children }) => {
  const { token } = theme.useToken();
  const location = useLocation();

  const navMapping: Record<string, NavType> = {
    "/": "add-mock",
    "/list": "list",
    "/settings": "settings",
  };

  return (
    <AntLayout
      style={{
        padding: "10px",
        width: "100%",
        height: "100%",
        backgroundColor: token.colorBgContainer,
      }}
    >
      <NavigationBar activeNav={navMapping[location.pathname] || "add-mock"} />
      {children}
    </AntLayout>
  );
};
