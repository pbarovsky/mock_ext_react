import { FC } from "react";
import { MockData } from "../../../shared/lib/types";
import { useMock } from "../../../shared/lib/mock/useMock";
import { Switch } from "shared/ui/Switch";

type Props = {
  isActive: boolean;
  record: MockData;
};

export const EnableSwitch: FC<Props> = ({ isActive, record }) => {
  const { toggleMock } = useMock();

  return (
    <Switch
      checked={isActive}
      onChange={toggleMock}
      size="small"
      value={record.id}
    />
  );
};
