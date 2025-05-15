import { Space } from "antd";
import { PageLayout } from "widgets/PageLayout";
import { SettingAbout, SettingsHowTo, SettingsTheme } from "widgets/Settings";

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
