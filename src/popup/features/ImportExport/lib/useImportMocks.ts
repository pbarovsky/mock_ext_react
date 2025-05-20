import { useMock } from "@shared/lib/mock/useMock";
import { cleanedJson } from "@shared/utils/jsonUtils";
import { MESSAGES } from "@shared/utils/constants";
import type { UploadFile } from "antd/es/upload/interface";
import { MockData, Status } from "@shared/lib/types";

type Props = {
  setStatus: (status: { type: Status["type"]; message: string }) => void;
  closeModal: () => void;
  clearFileList: () => void;
};

export const useImportMocks = ({
  setStatus,
  closeModal,
  clearFileList,
}: Props) => {
  const { setMocks, saveMocks } = useMock();

  const handleImport = (fileList: UploadFile[]) => {
    const file = fileList[0]?.originFileObj;
    if (!file) {
      setStatus({ type: "error", message: MESSAGES.FAILED_INVALID_IMPORT });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedMocks = JSON.parse(event.target?.result as string);
        if (!Array.isArray(importedMocks)) throw new Error("Invalid format");

        chrome.storage.local.get(["mocks"], (result) => {
          const existingMocks: MockData[] = result.mocks || [];

          // Проверяем, есть ли хотя бы один совпадающий мок по URL и нормализованному `response`
          const hasDuplicate = importedMocks.some((mock) =>
            existingMocks.some(
              (existingMock: MockData) =>
                existingMock.url === mock.url &&
                cleanedJson(existingMock.response) ===
                  cleanedJson(mock.response)
            )
          );

          if (hasDuplicate) {
            setStatus({
              type: "error",
              message: MESSAGES.MESSAGE_DUPLICATE_MOCK,
            });
            closeModal();
            return;
          }

          const updatedMocks = [...existingMocks, ...importedMocks];
          setMocks(updatedMocks);
          saveMocks(updatedMocks);
          setStatus({ type: "success", message: MESSAGES.SUCCESS_IMPORT });
          clearFileList();
          closeModal();
        });
      } catch {
        setStatus({ type: "error", message: MESSAGES.FAILED_INVALID_IMPORT });
      }
    };

    reader.readAsText(file);
  };

  return { handleImport };
};
