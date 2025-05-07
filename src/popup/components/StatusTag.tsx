import { Tag } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Status } from "../../types";
import { MESSAGES } from "../utils/constants";

export const StatusTag = ({ type, message }: Status) => {
  const getStatusConfig = () => {
    if (type === "success") {
      return { color: "green", text: message, icon: <CheckCircleOutlined /> };
    } else if (type === "error") {
      return { color: "red", text: message, icon: <CloseCircleOutlined /> };
    }
    return { color: "blue", text: MESSAGES.MOCK_UNKNOWN, icon: null };
  };

  const { color, text, icon } = getStatusConfig();

  return (
    <Tag style={{ padding: "8px" }} color={color} icon={icon}>
      {text}
    </Tag>
  );
};
