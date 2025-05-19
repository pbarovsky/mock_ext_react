import { Card, Space, Tag, Button, Switch, Tooltip, Flex } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { MockData } from "@shared/lib/types";
import { useMock } from "@shared/lib/mock/useMock";
import { useNavigate } from "react-router-dom";
import { ComfirmDeleteMock } from "@features/ComfirmDeleteMock";
import { Hint } from "@shared/ui/Hint";

interface MockCardProps {
  mock: MockData;
}

export const MockCard = ({ mock }: MockCardProps) => {
  const { toggleMock } = useMock();
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/add-mock/${mock.id}`);
  };

  return (
    <Card size="small">
      <Flex style={{ width: "100%" }} justify="space-between">
        <Flex vertical>
          <div
            style={{
              fontWeight: "bold",
              fontSize: "16px",
              marginBottom: "8px",
            }}
          >
            {mock.name}
          </div>
          <Flex gap="8px">
            <Hint text={mock.url}>
              <Tag color="blue">URL</Tag>
            </Hint>
            <Hint text={mock.response}>
              <Tag color="green">JSON</Tag>
            </Hint>
          </Flex>
        </Flex>
        <Space align="center">
          <Switch
            checked={mock.isActive}
            onChange={() => toggleMock(mock.id)}
            size="small"
          />
          <Button type="text" icon={<EditOutlined />} onClick={handleEdit} />
          <ComfirmDeleteMock record={mock} />
        </Space>
      </Flex>
    </Card>
  );
};
