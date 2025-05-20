import { Flex, Segmented } from "antd";
import { UnorderedListOutlined, TableOutlined } from "@ant-design/icons";

type ViewType = "list" | "table";

type Props = {
  viewType: ViewType;
  onChange: (value: ViewType) => void;
};

export const ViewToggle = ({ onChange, viewType }: Props) => {
  return (
    <Flex justify="end">
      <Segmented
        options={[
          { label: <UnorderedListOutlined />, value: "cards" },
          { label: <TableOutlined />, value: "table" },
        ]}
        value={viewType}
        onChange={(value) => onChange(value as ViewType)}
      />
    </Flex>
  );
};
