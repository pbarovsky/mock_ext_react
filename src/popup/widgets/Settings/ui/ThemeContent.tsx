import { Card, Flex, Typography } from "antd";
import { Switch } from "shared/ui/Switch";
import { useTheme } from "../../../shared/lib/theme/useTheme";

export const ThemeContent = () => {
  const { toggleTheme, isDarkMode } = useTheme();
  return (
    <Card title="Theme">
      <Flex align="center" justify="space-between">
        <Typography.Text>Dark Theme</Typography.Text>
        <Switch
          checked={isDarkMode}
          onChange={toggleTheme}
          value={isDarkMode}
        />
      </Flex>
    </Card>
  );
};
