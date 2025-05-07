import { Flex, Layout } from "antd";
import { useState } from "react";
import { useTheme } from "../hooks/useTheme";
import { AddMock } from "../pages/AddMock";
import { MockList } from "../pages/MockList";
import { Settings } from "../pages/Settings";
import { MockProvider } from "../providers/MockProvider";
import { Navigation } from "../components/Navigation";
import { NavType, MockData } from "../../types";
import { ThemeProvider } from "../providers/ThemeProvider";

export const App = () => {
  const [editingMock, setEditingMock] = useState<MockData | undefined>();
  const [activeNav, setActiveNav] = useState<NavType>("add-mock");
  const { isDarkMode, toggleTheme } = useTheme();

  const handleEditMock = (mock: MockData) => {
    setEditingMock(mock);
    setActiveNav("add-mock");
  };

  const handleCancelEdit = () => {
    setEditingMock(undefined);
  };

  const renderContent = () => {
    switch (activeNav) {
      case "add-mock":
        return (
          <AddMock editingMock={editingMock} onCancelEdit={handleCancelEdit} />
        );
      case "mock-list":
        return <MockList onEditMock={handleEditMock} />;
      case "settings":
        return <Settings isDarkMode={isDarkMode} onThemeChange={toggleTheme} />;
      default:
        return null;
    }
  };

  return (
    <ThemeProvider isDarkMode={isDarkMode}>
      <MockProvider>
        <Layout
          style={{ padding: "10px" }}
          className={isDarkMode ? "dark-theme" : "light-theme"}
        >
          <Flex justify="center" style={{ marginBottom: "15px" }}>
            <Navigation activeNav={activeNav} onNavChange={setActiveNav} />
          </Flex>
          {renderContent()}
        </Layout>
      </MockProvider>
    </ThemeProvider>
  );
};
