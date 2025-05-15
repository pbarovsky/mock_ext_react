import { DeleteOutlined } from "@ant-design/icons";
import { Button as AntButton } from "antd";

export const DeleteButton = () => {
  return <AntButton type="text" danger icon={<DeleteOutlined />} />;
};
