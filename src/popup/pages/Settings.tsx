import { Space } from "antd";
import { SettingAbout } from "../components/SettingAbout";
import { SettingsHowTo } from "../components/SettingsHowTo";
import { SettingsTheme } from "../components/SettingsTheme";

export const Settings = () => {
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <SettingsHowTo />
      <SettingsTheme />
      <SettingAbout />
    </Space>
  );
};
