import { MockUIItem } from "@shared/lib/types";
import { Table as AntTable } from "antd";
import type { AlignType } from "rc-table/lib/interface";

type Props = {
  mocks: MockUIItem[];
};

export const Table = ({ mocks }: Props) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "renderName",
      key: "name",
      width: "25%",
      align: "center" as AlignType,
      ellipsis: true,
    },
    {
      title: "URL",
      dataIndex: "renderURL",
      key: "url",
      width: "15%",
      align: "center" as AlignType,
      ellipsis: true,
    },
    {
      title: "Response",
      dataIndex: "renderResponse",
      key: "response",
      width: "15%",
      align: "center" as AlignType,
      ellipsis: true,
    },
    {
      title: "On/off",
      dataIndex: "renderSwitch",
      key: "isActive",
      width: "15%",
      align: "center" as AlignType,
    },
    {
      title: "Actions",
      dataIndex: "renderActions",
      key: "actions",
      width: "20%",
      align: "center" as AlignType,
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
      scroll={{ y: 340 }}
      bordered
    />
  );
};
