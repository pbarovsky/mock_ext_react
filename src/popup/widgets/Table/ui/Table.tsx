import type { AlignType } from "rc-table/lib/interface";
import { Table as AntTable, Space, Tag } from "antd";
import { EditButton } from "./EditButton";
import { ComfirmDeleteMock } from "@features/ComfirmDeleteMock";
import { EnableMockSwitch } from "@features/EnableMock";
import { Hint } from "@shared/ui/Hint";
import { useMock } from "@shared/lib/mock/useMock";
import { MockData } from "@shared/lib/types";

export const Table = () => {
  const { mocks } = useMock();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "25%",
      align: "center" as AlignType,
      ellipsis: true,
      render: (text: string) => (
        <Hint text={text}>
          <strong>{text}</strong>
        </Hint>
      ),
    },
    {
      title: "URL",
      dataIndex: "url",
      key: "url",
      width: "15%",
      align: "center" as AlignType,
      ellipsis: true,
      render: (text: string) => (
        <Hint text={text}>
          <Tag color="blue">URL</Tag>
        </Hint>
      ),
    },
    {
      title: "Response",
      dataIndex: "response",
      key: "response",
      width: "15%",
      align: "center" as AlignType,
      ellipsis: true,
      render: (text: string) => (
        <Hint text={text}>
          <Tag color="green">JSON</Tag>
        </Hint>
      ),
    },
    {
      title: "On/off",
      dataIndex: "isActive",
      key: "isActive",
      width: "15%",
      align: "center" as AlignType,
      render: (isActive: boolean, record: MockData) => (
        <EnableMockSwitch isActive={isActive} record={record} />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: "20%",
      align: "center" as AlignType,
      render: (_: unknown, record: MockData) => (
        <Space>
          <EditButton record={record} />
          <ComfirmDeleteMock record={record} />
        </Space>
      ),
    },
  ];

  return (
    <AntTable
      title={() => "Saved Mocks"}
      dataSource={mocks}
      columns={columns}
      rowKey="id"
      pagination={false}
      size="small"
      scroll={{ y: 400 }}
      bordered
    />
  );
};
