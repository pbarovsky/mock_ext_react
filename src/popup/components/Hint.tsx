import { Tooltip } from "antd";
import { CSSProperties } from "react";

interface HintProps {
  text: string;
}

const HintStyles: CSSProperties = {
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
  lineHeight: "normal",
  fontSize: "12px",
};

export const Hint = ({ text }: HintProps) => {
  const formattedText = /^[{[]/.test(text)
    ? JSON.stringify(JSON.parse(text), null, 2)
    : text;

  return (
    <Tooltip title={<pre style={HintStyles}>{formattedText}</pre>}>
      {text}
    </Tooltip>
  );
};
