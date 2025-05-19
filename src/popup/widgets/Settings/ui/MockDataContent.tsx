import { Card, Space, Button, message, Upload } from "antd";
import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
import { useMock } from "@shared/lib/mock/useMock";
import { useState } from "react";
import type { UploadFile } from "antd/es/upload/interface";

export const MockDataContent = () => {
  const { mocks } = useMock();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleExport = () => {
    try {
      const dataStr = JSON.stringify(mocks, null, 2);
      const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;

      const exportFileDefaultName = `mocks-${new Date().toISOString().split("T")[0]}.json`;

      const linkElement = document.createElement("a");
      linkElement.setAttribute("href", dataUri);
      linkElement.setAttribute("download", exportFileDefaultName);
      linkElement.click();

      message.success("Mocks exported successfully");
    } catch (err) {
      console.error("Export error:", err);
      message.error("Failed to export mocks");
    }
  };

  const handleImport = (file: UploadFile) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const importedMocks = JSON.parse(content);

        if (!Array.isArray(importedMocks)) {
          throw new Error("Invalid format: expected an array of mocks");
        }

        if (typeof chrome !== "undefined" && chrome.storage) {
          chrome.storage.local.set({ mocks: importedMocks }, () => {
            message.success("Mocks imported successfully");
            setFileList([]);
            window.location.reload();
          });
        }
      } catch (err) {
        console.error("Import error:", err);
        message.error("Failed to import mocks: Invalid file format");
      }
    };
    reader.readAsText(file.originFileObj!);
  };

  return (
    <Card size="small" title="Mock Data Management">
      <Space>
        <Button icon={<DownloadOutlined />} onClick={handleExport}>
          Export Mocks
        </Button>
        <Upload
          accept=".json"
          maxCount={1}
          fileList={fileList}
          onChange={({ file }) => handleImport(file)}
          beforeUpload={() => false}
          showUploadList={false}
        >
          <Button icon={<UploadOutlined />}>Import Mocks</Button>
        </Upload>
      </Space>
    </Card>
  );
};
