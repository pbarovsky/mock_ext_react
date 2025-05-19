import { ComfirmDeleteMock } from "@features/ComfirmDeleteMock";
import { EnableMockSwitch } from "@features/EnableMock";
import { useMock } from "@shared/lib/mock/useMock";
import { Hint } from "@shared/ui/Hint";
import { EditButton } from "@widgets/Table/ui/EditButton";
import { Flex, List as AntList, Skeleton, Tag } from "antd";

export const List = () => {
  const { mocks } = useMock();

  return (
    <AntList
      header="Saved Mocks"
      bordered
      className="scrollable"
      itemLayout="horizontal"
      dataSource={mocks}
      renderItem={(mock) => (
        <AntList.Item
          actions={[
            <EnableMockSwitch
              key="toggle"
              isActive={mock.isActive}
              record={mock}
            />,
            <EditButton key="edit" record={mock} />,
            <ComfirmDeleteMock key="delete" record={mock} />,
          ]}
        >
          <Skeleton avatar title={false} loading={false} active>
            <AntList.Item.Meta
              title={mock.name}
              description={
                <Flex gap="8px">
                  <Hint text={mock.url}>
                    <Tag color="blue">URL</Tag>
                  </Hint>
                  <Hint text={mock.response}>
                    <Tag color="green">JSON</Tag>
                  </Hint>
                </Flex>
              }
            />
          </Skeleton>
        </AntList.Item>
      )}
    />
  );
};
