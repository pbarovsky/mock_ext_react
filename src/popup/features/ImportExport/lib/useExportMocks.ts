import { useMock } from "@shared/lib/mock/useMock";
import { Status } from "@shared/lib/types";
import { MESSAGES } from "@shared/utils/constants";

type Props = {
  setStatus: (status: { type: Status["type"]; message: string }) => void;
};

export const useExportMocks = ({ setStatus }: Props) => {
  const { mocks } = useMock();

  const handleExport = () => {
    try {
      const dataStr = JSON.stringify(mocks, null, 2);
      const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
      const exportFileName = `mocks-${new Date().toISOString().split("T")[0]}.json`;

      const link = document.createElement("a");
      link.href = dataUri;
      link.download = exportFileName;
      link.click();

      setStatus({ type: "success", message: MESSAGES.SUCCESS_EXPORT });
    } catch {
      setStatus({ type: "error", message: MESSAGES.FAILED_EXPORT });
    }
  };

  return { handleExport };
};
