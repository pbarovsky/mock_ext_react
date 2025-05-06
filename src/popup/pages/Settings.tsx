import { Space } from "antd";
import { SettingAbout } from "../components/SettingAbout";
import { SettingsHowTo } from "../components/SettingsHowTo";
import { SettingsTheme } from "../components/SettingsTheme";
import { Theme } from "app/App.types";

export const Settings = ({ isDarkMode, onThemeChange }: Theme) => {
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <SettingsHowTo />
      <SettingsTheme isDarkMode={isDarkMode} onThemeChange={onThemeChange} />
      <SettingAbout />
    </Space>
  );
};
