import { Switch as AntSwitch } from "antd";
import { FC } from "react";
import { MockData } from "../../../../types";
import { useMock } from "../../../hooks/useMock";

type Props = {
  isActive: boolean;
  record: MockData;
};

export const Switch: FC<Props> = ({ isActive, record }) => {
  const { toggleMock } = useMock();

  return (
    <AntSwitch
      checked={isActive}
      size="small"
      onChange={() => toggleMock(record.id)}
    />
  );
};
