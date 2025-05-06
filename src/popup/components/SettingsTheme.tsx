import { Card, Flex, Switch, Typography } from "antd";
import { Theme } from "app/App.types";

export const SettingsTheme = ({ isDarkMode, onThemeChange }: Theme) => {
  return (
    <Card title="Theme">
      <Flex align="center" justify="space-between">
        <Typography.Text>Dark Theme</Typography.Text>
        <Switch checked={isDarkMode} onChange={onThemeChange} />
      </Flex>
    </Card>
  );
};
