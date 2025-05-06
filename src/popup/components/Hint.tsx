import { Tooltip } from "antd";
import { FC } from "react";

interface HintProps {
  text: string;
}

export const Hint: FC<HintProps> = ({ text }) => {
  return (
    <Tooltip title={text}>
      <span>{text}</span>
    </Tooltip>
  );
};
