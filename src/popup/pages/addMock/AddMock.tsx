import { Card } from "antd";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MockForm } from "../../components/MockForm";
import { useMockForm } from "../../hooks/useMockForm";

export const AddMock = () => {
  const { mockId } = useParams<{ mockId: string }>();
  const [isEditing, setIsEditing] = useState(!!mockId);
  const navigate = useNavigate();

  const { editingMock, handleSubmit, isSubmitting, status, setStatus } =
    useMockForm(mockId);

  const handleCancel = () => {
    navigate("/list");
  };

  return (
    <Card title={isEditing ? "Edit mock" : "Add new mock"}>
      <MockForm
        initialValues={editingMock}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isSubmitting={isSubmitting}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        status={status}
        setStatus={setStatus}
      />
    </Card>
  );
};
