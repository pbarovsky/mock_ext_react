import { Card, Flex, Switch, Typography } from "antd";
import { useTheme } from "../hooks/useTheme";

export const SettingsTheme = () => {
  const { toggleTheme, isDarkMode } = useTheme();
  return (
    <Card title="Theme">
      <Flex align="center" justify="space-between">
        <Typography.Text>Dark Theme</Typography.Text>
        <Switch checked={isDarkMode} onChange={toggleTheme} />
      </Flex>
    </Card>
  );
};
