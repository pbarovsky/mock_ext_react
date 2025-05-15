import { Popconfirm as AntPopconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Button as AntButton } from "antd";
import { FC } from "react";
import { MockData } from "@shared/lib/types";
import { useMock } from "@shared/lib/mock/useMock";

export const Popcomfirm: FC<{ record: MockData }> = ({ record }) => {
  const { deleteMock } = useMock();
  return (
    <AntPopconfirm
      title="Delete mock"
      description="Are you sure you want to delete this mock?"
      onConfirm={() => {
        console.log("Удаление мок-данных:", record.id);
        deleteMock(record.id);
      }}
      okText="Yes"
      cancelText="No"
    >
      <AntButton type="text" danger icon={<DeleteOutlined />} />
    </AntPopconfirm>
  );
};
