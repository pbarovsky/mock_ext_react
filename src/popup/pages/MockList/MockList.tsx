import { PageLayout } from "@widgets/PageLayout";
import { Card, Space } from "antd";
import { MockCard } from "@widgets/MockCard";
import { useMock } from "@shared/lib/mock/useMock";

export const Page = () => {
  const { mocks } = useMock();

  return (
    <PageLayout activeNav="list">
      <Card size="small" title="Mock List">
        <Space
          direction="vertical"
          style={{ width: "100%" }}
          className="scrollable"
        >
          {mocks.map((mock) => (
            <MockCard key={mock.id} mock={mock} />
          ))}
        </Space>
      </Card>
    </PageLayout>
  );
};
