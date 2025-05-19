import type { UploadFile } from "antd/es/upload/interface";
import { useState, useEffect, useCallback } from "react";
import { MockData } from "@shared/lib/types";
import { cleanedJson } from "@shared/utils/jsonUtils";
import { Card, Space, Button, Modal, Upload, Flex } from "antd";
import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
import { StatusTag } from "@shared/ui/Status";
import { useMock } from "@shared/lib/mock/useMock";
import { MESSAGES } from "@shared/utils/constants";

export const ImportExportContent = () => {
  const { mocks, saveMocks, setMocks, status, setStatus } = useMock();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (status.type) {
      const timer = setTimeout(() => setStatus({ type: null }), 3000);
      return () => clearTimeout(timer);
    }
  }, [status, setStatus]);

  const handleExport = useCallback(() => {
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
  }, [mocks, setStatus]);

  const processImport = useCallback(
    (content: string) => {
      try {
        const importedMocks = JSON.parse(content);
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
            setIsModalOpen(false);
            return;
          }

          // Если дубликатов нет — сохраняем новые моки
          const updatedMocks = [...existingMocks, ...importedMocks];
          setMocks(updatedMocks);
          saveMocks(updatedMocks);
          setStatus({ type: "success", message: MESSAGES.SUCCESS_IMPORT });
          setFileList([]);
          setIsModalOpen(false);
        });
      } catch {
        setStatus({ type: "error", message: MESSAGES.FAILED_INVALID_IMPORT });
      }
    },
    [mocks, setMocks, saveMocks, setStatus]
  );

  const handleModalOk = useCallback(() => {
    const file = fileList[0]?.originFileObj;
    if (!file)
      return setStatus({
        type: "error",
        message: MESSAGES.FAILED_INVALID_IMPORT,
      });

    const reader = new FileReader();
    reader.onload = (event) => processImport(event.target?.result as string);
    reader.readAsText(file);
  }, [fileList, processImport]);

  return (
    <Card size="small" title="Mock Data Management">
      <Space>
        <Button icon={<DownloadOutlined />} onClick={handleExport}>
          Export Mocks
        </Button>
        <Button icon={<UploadOutlined />} onClick={() => setIsModalOpen(true)}>
          Import Mocks
        </Button>
      </Space>

      {status.type && (
        <Flex vertical style={{ marginTop: "8px", width: "max-content" }}>
          <StatusTag {...status} />
        </Flex>
      )}

      <Modal
        title="Import Mocks"
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={() => setIsModalOpen(false)}
        okText="Import"
        cancelText="Cancel"
      >
        <Upload
          accept=".json"
          maxCount={1}
          fileList={fileList}
          onChange={({ fileList }) => setFileList(fileList)}
          beforeUpload={() => false}
        >
          <Button icon={<UploadOutlined />}>Select JSON File</Button>
        </Upload>
      </Modal>
    </Card>
  );
};
