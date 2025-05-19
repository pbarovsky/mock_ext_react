import { Card, Space, Button, message } from "antd";
import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
import { useMock } from "@shared/lib/mock/useMock";

export const MockDataContent = () => {
  const { mocks } = useMock();

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
    } catch {
      message.error("Failed to export mocks");
    }
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

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

    input.click();
  };

  return (
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
  );
};
