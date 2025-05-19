import { Tag, Space } from "antd";
import { Hint } from "@shared/ui/Hint";
import { EditButton } from "@features/AddMock/ui/EditButton";
import { ComfirmDeleteMock } from "@features/ComfirmDeleteMock";
import { EnableMockSwitch } from "@features/EnableMock";
import { MockData } from "@shared/lib/types";

export const renderName = (text: string) => (
  <Hint text={text}>
    <strong>{text}</strong>
  </Hint>
);

export const renderURL = (text: string) => (
  <Hint text={text}>
    <Tag color="blue">URL</Tag>
  </Hint>
);

export const renderResponse = (text: string) => (
  <Hint text={text}>
    <Tag color="green">JSON</Tag>
  </Hint>
);

export const renderSwitch = (isActive: boolean, record: MockData) => (
  <EnableMockSwitch isActive={isActive} record={record} />
);

export const renderActions = (record: MockData) => (
  <Space>
    <EditButton record={record} />
    <ComfirmDeleteMock record={record} />
  </Space>
);
