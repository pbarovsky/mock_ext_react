import { Card, Form } from "antd";
import { useState } from "react";
import { useMock } from "../hooks/useMock";
import { MockData, Status } from "../app/App.types";
import { MockForm } from "../components/MockForm";
import { MESSAGES } from "../utils/constants";
import { createMockData } from "../utils/mockUtils";

interface AddMockProps {
  editingMock?: MockData;
  onCancelEdit?: () => void;
}

export const AddMock = ({ editingMock, onCancelEdit }: AddMockProps) => {
  const { addMock, updateMock, status, setStatus } = useMock();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form] = Form.useForm<{ url: string; response: string }>();

  const handleSubmit = async (values: { url: string; response: string }) => {
    try {
      setIsSubmitting(true);
      const mockData = createMockData(values, editingMock);

      if (editingMock) {
        const isUpdated = await updateMock(mockData);
        if (isUpdated) {
          form.resetFields();
          onCancelEdit?.();
        }
      } else {
        await addMock(mockData);
        form.resetFields();
      }
    } catch {
      setStatus({ type: "error", message: MESSAGES.MOCK_SAVE_FAILED });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card
      title={editingMock ? MESSAGES.EDIT_MOCK_TITLE : MESSAGES.ADD_MOCK_TITLE}
    >
      <MockForm
        form={form}
        initialValues={editingMock}
        onSubmit={handleSubmit}
        onCancel={onCancelEdit}
        isSubmitting={isSubmitting}
        isEditing={!!editingMock}
        status={status}
        setStatus={setStatus}
      />
    </Card>
  );
};
