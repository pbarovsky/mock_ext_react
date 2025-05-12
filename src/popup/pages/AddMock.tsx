import { Card } from "antd";
import { FC } from "react";
import { MockForm } from "../components/MockForm";
import { useMockForm } from "../hooks/useMockForm";

interface AddMockProps {
  mockId?: string;
  onCancelEdit?: () => void;
}

export const AddMock: FC<AddMockProps> = ({ mockId, onCancelEdit }) => {
  const { editingMock, handleSubmit, isSubmitting, status, setStatus } =
    useMockForm(mockId);

  return (
    <Card title={editingMock ? "Edit mock" : "Add new mock"}>
      <MockForm
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
