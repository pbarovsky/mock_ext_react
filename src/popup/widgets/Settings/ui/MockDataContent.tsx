import { Card, Space, Button, message, Modal, Upload } from "antd";
import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
import { useMock } from "@shared/lib/mock/useMock";
import { useState } from "react";
import type { UploadFile } from "antd/es/upload/interface";

export const MockDataContent = () => {
  const { mocks } = useMock();
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleImport = () => {
    setIsModalOpen(true);
  };

  const handleModalOk = () => {
    const file = fileList[0]?.originFileObj;
    if (!file) {
      message.error("Please select a file first");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const importedMocks = JSON.parse(content);

        // Validate imported data
        if (!Array.isArray(importedMocks)) {
          throw new Error("Invalid format: expected an array of mocks");
        }

        // Store imported mocks
        if (typeof chrome !== "undefined" && chrome.storage) {
          chrome.storage.local.set({ mocks: importedMocks }, () => {
            message.success("Mocks imported successfully");
            setIsModalOpen(false);
            setFileList([]);
            // Reload the page to reflect changes
            window.location.reload();
          });
        }
      } catch (err) {
        console.error("Import error:", err);
        message.error("Failed to import mocks: Invalid file format");
      }
    };
    reader.readAsText(file);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    setFileList([]);
  };

  return (
    <>
      <Card size="small" title="Mock Data Management">
        <Space>
          <Button icon={<DownloadOutlined />} onClick={handleExport}>
            Export Mocks
          </Button>
          <Button icon={<UploadOutlined />} onClick={handleImport}>
            Import Mocks
          </Button>
        </Space>
      </Card>

      <Modal
        title="Import Mocks"
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
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
    </>
  );
};
