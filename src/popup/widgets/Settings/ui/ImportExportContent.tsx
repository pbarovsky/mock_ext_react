import { Card, Space, Flex, Button } from "antd";
import { StatusTag } from "@shared/ui/Status";
import { useState, useEffect } from "react";
import { Status } from "@shared/lib/types";
import { ExportMockButton, ImportMockModal } from "@features/ImportExport";
import { UploadOutlined } from "@ant-design/icons";

export const ImportExportContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [localStatus, setLocalStatus] = useState<Status>({
    type: null,
    message: "",
  });

  useEffect(() => {
    if (localStatus.type) {
      const timer = setTimeout(() => setLocalStatus({ type: null }), 3000);
      return () => clearTimeout(timer);
    }
  }, [localStatus]);

  return (
    <Card size="small" title="Export / Import mocks">
      <Space>
        <ExportMockButton setStatus={setLocalStatus} />
        <Button icon={<UploadOutlined />} onClick={() => setIsModalOpen(true)}>
          Import Mocks
        </Button>
      </Space>

      {localStatus.type && (
        <Flex vertical style={{ marginTop: "8px", width: "max-content" }}>
          <StatusTag {...localStatus} />
        </Flex>
      )}

      <ImportMockModal
        setStatus={setLocalStatus}
        isModalOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
      />
    </Card>
  );
};
