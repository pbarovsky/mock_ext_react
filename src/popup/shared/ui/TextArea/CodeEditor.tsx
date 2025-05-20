import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { useEditorTheme } from "@shared/lib/theme/useEditorTheme";

type Props = {
  value: string;
  onChange: (v: string) => void;
};

export const CodeEditor = ({ value, onChange }: Props) => {
  const { theme, borderColor } = useEditorTheme();

  return (
    <CodeMirror
      value={value}
      extensions={[json()]}
      onChange={onChange}
      theme={theme}
      className="cm-scroller"
      style={{
        height: "140px",
        overflow: "auto",
        fontSize: 14,
        border: borderColor,
        borderRadius: 8,
      }}
    />
  );
};
