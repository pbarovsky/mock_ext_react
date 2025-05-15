import { Popconfirm as AntPopconfirm } from "antd";
import { FC, ReactNode } from "react";
import { MockData } from "../../../../types";
import { useMock } from "../../../hooks/useMock";

export const Popcomfirm: FC<{ record: MockData; children: ReactNode }> = ({
  record,
  children,
}) => {
  const { deleteMock } = useMock();
  return (
    <AntPopconfirm
      title="Delete mock"
      description="Are you sure you want to delete this mock?"
      onConfirm={() => deleteMock(record.id)}
      okText="Yes"
      cancelText="No"
    >
      {children}
    </AntPopconfirm>
  );
};
