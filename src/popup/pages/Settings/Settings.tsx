import { Space } from "antd";
import { SettingAbout } from "../../components/SettingAbout";
import { SettingsHowTo } from "../../components/SettingsHowTo";
import { SettingsTheme } from "../../components/SettingsTheme";
import { PageLayout } from "widgets/PageLayout";

export const Page = () => {
  return (
    <PageLayout activeNav="settings">
      <Space direction="vertical" style={{ width: "100%" }}>
        <SettingsHowTo />
        <SettingsTheme />
        <SettingAbout />
      </Space>
    </PageLayout>
  );
};
