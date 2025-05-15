import { Card, Space, Typography } from "antd";

export const HowToContent = () => {
  return (
    <Card title="How to use">
      <Space direction="vertical">
        <Typography.Text>
          1. Add a mock by specifying the URL and JSON response
        </Typography.Text>
        <Typography.Text>2. Activate the mock in the list</Typography.Text>
        <Typography.Text>
          3. All requests to the specified URL will be intercepted
        </Typography.Text>
      </Space>
    </Card>
  );
};
