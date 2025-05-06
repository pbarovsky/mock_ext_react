import type { AlignType } from "rc-table/lib/interface";
import { Table, Button, Space, Switch, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useMock } from "../hooks/useMock";
import { MockData } from "../../types";
import { Hint } from "../components/Hint";

interface MockListProps {
  onEditMock: (mock: MockData) => void;
}

export const MockList = ({ onEditMock }: MockListProps) => {
  const { mocks, deleteMock, toggleMock } = useMock();

  const columns = [
    {
      title: "URL",
      dataIndex: "url",
      key: "url",
      width: "35%",
      ellipsis: true,
      render: (text: string) => <Hint text={text} />,
    },
    {
      title: "Response",
      dataIndex: "response",
      key: "response",
      width: "35%",
      ellipsis: true,
      render: (text: string) => <Hint text={text} />,
    },
    {
      title: "De/Activate",
      dataIndex: "isActive",
      key: "isActive",
      width: "15%",
      align: "center" as AlignType,
      render: (isActive: boolean, record: MockData) => (
        <Switch
          checked={isActive}
          size="small"
          onChange={() => toggleMock(record.id)}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: "15%",
      align: "center" as AlignType,
      render: (_: unknown, record: MockData) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => onEditMock(record)}
          />
          <Popconfirm
            title="Delete mock"
            description="Are you sure you want to delete this mock?"
            onConfirm={() => deleteMock(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
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
