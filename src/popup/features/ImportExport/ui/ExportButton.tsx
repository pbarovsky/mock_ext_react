import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { useExportMocks } from "../lib/useExportMocks";
import { Status } from "@shared/lib/types";

interface Props {
  setStatus: (status: { type: Status["type"]; message: string }) => void;
}

export const ExportButton = ({ setStatus }: Props) => {
  const { handleExport } = useExportMocks({ setStatus });

  return (
    <Button icon={<DownloadOutlined />} onClick={handleExport}>
      Export Mocks
    </Button>
  );
};
