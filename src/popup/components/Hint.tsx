import { Tooltip } from "antd";

interface HintProps {
  text: string;
}

export const Hint = ({ text }: HintProps) => {
  let formattedText = text;
  try {
    const parsedJson = JSON.parse(text);
    formattedText = JSON.stringify(parsedJson, null, 2);
  } catch {
    formattedText = text;
  }

  return (
    <Tooltip
      title={
        <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
          {formattedText}
        </pre>
      }
    >
      {text}
    </Tooltip>
  );
};
