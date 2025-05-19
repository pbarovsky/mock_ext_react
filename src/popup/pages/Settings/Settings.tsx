import { Space } from "antd";
import { PageLayout } from "@widgets/PageLayout";
import { SettingAbout, SettingsHowTo, SettingsTheme } from "@widgets/Settings";
import { MockDataContent } from "@widgets/Settings/ui/MockDataContent";

export const Page = () => {
  return (
    <PageLayout activeNav="settings">
      <Space direction="vertical" style={{ width: "100%" }}>
        <MockDataContent />
        <SettingsHowTo />
        <SettingsTheme />
        <SettingAbout />
      </Space>
    </PageLayout>
  );
};
