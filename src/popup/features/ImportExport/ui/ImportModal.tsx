import { Modal, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import { useState } from "react";
import { useImportMocks } from "../lib/useImportMocks";
import { Status } from "@shared/lib/types";

interface Props {
  setStatus: (status: { type: Status["type"]; message: string }) => void;
  isModalOpen: boolean;
  closeModal: () => void;
}

export const ImportModal = ({ setStatus, isModalOpen, closeModal }: Props) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { handleImport } = useImportMocks({
    setStatus,
    closeModal,
    clearFileList: () => setFileList([]),
  });

  return (
    <Modal
      title="Import Mocks"
      open={isModalOpen}
      onOk={() => handleImport(fileList)}
      onCancel={closeModal}
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
  );
};
