import {
  GithubOutlined,
  MailOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { Space, Typography, Card } from "antd";

export const AboutContent = () => {
  return (
    <Card size="small">
      <Space direction="vertical">
        <Space direction="horizontal">
          <Typography.Text>Mock API Extension</Typography.Text>
          <Typography.Text type="secondary">Version 1.0.0</Typography.Text>
        </Space>
        <Space direction="vertical">
          <Space>
            <MailOutlined />
            <Typography.Text>pbarovsky@mail.ru</Typography.Text>
          </Space>
          <Space>
            <MessageOutlined />
            <Typography.Text>@pbarovsky</Typography.Text>
          </Space>
          <Space>
            <GithubOutlined />
            <Typography.Text>
              <a
                href="https://github.com/pbarovsky"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </Typography.Text>
          </Space>
        </Space>
      </Space>
    </Card>
  );
};
