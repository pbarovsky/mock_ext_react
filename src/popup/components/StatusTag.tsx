import { Tag } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Status } from "app/App.types";
import { MESSAGES } from "../utils/constants";

export const StatusTag = ({ type, message }: Status) => {
  const getStatusConfig = () => {
    switch (type) {
      case "success":
        return { color: "green", text: message, icon: <CheckCircleOutlined /> };
      case "error":
        return { color: "red", text: message, icon: <CloseCircleOutlined /> };
      default:
        return {
          color: "red",
          text: MESSAGES.MOCK_UNKNOWN,
          icon: null,
        };
    }
  };

  const { color, text, icon } = getStatusConfig();

  return (
    <Tag style={{ padding: "8px" }} color={color} icon={icon}>
      {text}
    </Tag>
  );
};
