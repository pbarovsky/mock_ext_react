import { CSSProperties, ReactNode } from "react";
import { Tooltip } from "antd";
import { formattedJson } from "@shared/utils/jsonUtils";

interface HintProps {
  text: string;
  children?: ReactNode;
}

const HintStyles: CSSProperties = {
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
  lineHeight: "normal",
  fontSize: "12px",
};

export const Hint = ({ text, children }: HintProps) => {
  return (
    <Tooltip title={<pre style={HintStyles}>{formattedJson(text)}</pre>}>
      {children}
    </Tooltip>
  );
};
