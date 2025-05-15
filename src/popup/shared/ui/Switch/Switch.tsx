import { Switch as AntSwitch } from "antd";

type Props<T> = {
  checked: boolean;
  onChange: (value: T) => void;
  size?: "small" | "default";
  value: T;
};

export const Switch = <T,>({
  checked,
  onChange,
  size = "default",
  value,
}: Props<T>) => {
  return (
    <AntSwitch
      style={{ cursor: "pointer" }}
      checked={checked}
      onChange={() => onChange(value)}
      size={size}
    />
  );
};
