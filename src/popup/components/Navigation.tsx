import { Segmented, Space } from "antd";
import {
  PlusCircleOutlined,
  SettingOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { NavType } from "../../types";

interface NavigationProps {
  activeNav: NavType;
  onNavChange: (value: NavType) => void;
}

const options = [
  {
    label: "Add Mock",
    value: "add-mock",
    icon: <PlusCircleOutlined />,
  },
  {
    label: "List of Mocks",
    value: "mock-list",
    icon: <UnorderedListOutlined />,
  },
  {
    label: "Settings",
    value: "settings",
    icon: <SettingOutlined />,
  },
];

export const Navigation = ({ activeNav, onNavChange }: NavigationProps) => {
  return (
    <Space direction="vertical" align="center">
      <Segmented
        options={options}
        value={activeNav}
        onChange={(value: string) => onNavChange(value as NavType)}
        size="large"
      />
    </Space>
  );
};
