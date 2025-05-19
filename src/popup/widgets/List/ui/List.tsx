import { MockUIItem } from "@shared/lib/types";
import { List as AntList, Flex } from "antd";

type Props = {
  mocks: MockUIItem[];
};

export const List = ({ mocks }: Props) => {
  return (
    <AntList
      header="Saved Mocks"
      bordered
      className="scrollable"
      itemLayout="horizontal"
      dataSource={mocks}
      renderItem={(mock) => (
        <AntList.Item actions={[mock.renderSwitch, mock.renderActions]}>
          <AntList.Item.Meta
            title={mock.renderName}
            description={
              <Flex gap="8px">
                {mock.renderURL}
                {mock.renderResponse}
              </Flex>
            }
          />
        </AntList.Item>
      )}
    />
  );
};
