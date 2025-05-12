import { Flex } from "antd";
import { useState } from "react";
import { AddMock } from "../pages/AddMock";
import { MockList } from "../pages/MockList";
import { Settings } from "../pages/Settings";
import { MockProvider } from "../providers/MockProvider";
import { Navigation } from "../components/Navigation";
import { NavType, MockData } from "../../types";
import { ThemeProvider } from "../providers/ThemeProvider";
import { Layout } from "../components/Layot";

export const App = () => {
  const [editingMock, setEditingMock] = useState<MockData | undefined>();
  const [activeNav, setActiveNav] = useState<NavType>("add-mock");

  const handleEditMock = (mock: MockData) => {
    setEditingMock(mock);
    setActiveNav("add-mock");
  };

  const handleCancelEdit = () => {
    setEditingMock(undefined);
  };

  const renderContent = () => {
    if (activeNav === "add-mock") {
      return (
        <AddMock editingMock={editingMock} onCancelEdit={handleCancelEdit} />
      );
    } else if (activeNav === "mock-list") {
      return <MockList onEditMock={handleEditMock} />;
    } else if (activeNav === "settings") {
      return <Settings />;
    }
  };

  return (
    <ThemeProvider>
      <MockProvider>
        <Layout>
          <Flex justify="center" style={{ marginBottom: "15px" }}>
            <Navigation activeNav={activeNav} onNavChange={setActiveNav} />
          </Flex>
          {renderContent()}
        </Layout>
      </MockProvider>
    </ThemeProvider>
  );
};
