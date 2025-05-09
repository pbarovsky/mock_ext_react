import { Tooltip } from "antd";
import { CSSProperties } from "react";
import { formattedJson } from "../utils/jsonUtils";

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
  return (
    <Tooltip title={<pre style={HintStyles}>{formattedJson(text)}</pre>}>
      {text}
    </Tooltip>
  );
};
