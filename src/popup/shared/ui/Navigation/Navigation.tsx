import { useNavigate, useLocation } from "react-router";
import { Flex, Segmented, Space } from "antd";
import {
  PlusCircleOutlined,
  SettingOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { NavType } from "@types";

interface Props {
  activeNav: NavType;
  onNavChange?: (value: NavType) => void;
}

const options = [
  {
    label: "Add Mock",
    value: "add-mock",
    icon: <PlusCircleOutlined />,
    path: "/",
  },
  {
    label: "List of Mocks",
    value: "list",
    icon: <UnorderedListOutlined />,
    path: "/list",
  },
  {
    label: "Settings",
    value: "settings",
    icon: <SettingOutlined />,
    path: "/settings",
  },
];

export const Navigation = ({ activeNav, onNavChange }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (v: string) => {
    const option = options.find((opt) => opt.value === v);
    if (option) {
      if (onNavChange) {
        onNavChange(v as NavType);
      }
      navigate(option.path);
    }
  };

  const currentValue = location.pathname.startsWith("/add-mock/")
    ? "add-mock"
    : activeNav;

  return (
    <Flex justify="center" style={{ marginBottom: "15px" }}>
      <Space direction="vertical" align="center">
        <Segmented
          options={options}
          value={currentValue}
          onChange={handleChange}
          size="large"
        />
      </Space>
    </Flex>
  );
};
