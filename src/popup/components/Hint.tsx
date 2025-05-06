import { Tooltip } from "antd";

interface HintProps {
  text: string;
}

export const Hint = ({ text }: HintProps) => {
  return (
    <Tooltip title={text}>
      <span>{text}</span>
    </Tooltip>
  );
};
