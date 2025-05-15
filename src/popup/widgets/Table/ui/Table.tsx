import { Table as AntTable, Space } from "antd";
import { Hint } from "shared/ui/Hint";
import { EditMockButton } from "features/EditMock";
import { DeleteMockButton } from "features/DeleteMock";
import { ComfirmDeleteMock } from "features/ComfirmDelete";
import { EnableMockSwitch } from "features/EnableMock";
import type { AlignType } from "rc-table/lib/interface";
import { useMock } from "../../../shared/lib/mock/useMock";
import { MockData } from "../../../shared/lib/types";

export const Table = () => {
  const { mocks } = useMock();

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
        <EnableMockSwitch isActive={isActive} record={record} />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: "15%",
      align: "center" as AlignType,
      render: (_: unknown, record: MockData) => (
        <Space>
          <EditMockButton record={record} />
          <ComfirmDeleteMock record={record}>
            <DeleteMockButton />
          </ComfirmDeleteMock>
        </Space>
      ),
    },
  ];

  return (
    <AntTable
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
