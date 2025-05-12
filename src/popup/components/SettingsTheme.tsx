import { Card, Flex, Switch, Typography } from "antd";
import { useTheme } from "../hooks/useTheme";

export const SettingsTheme = () => {
  const { toggleTheme } = useTheme();
  return (
    <Card title="Theme">
      <Flex align="center" justify="space-between">
        <Typography.Text>Dark Theme</Typography.Text>
        <Switch onChange={toggleTheme} />
      </Flex>
    </Card>
  );
};
