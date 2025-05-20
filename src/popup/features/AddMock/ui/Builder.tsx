import { Card } from "antd";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form } from "@widgets/Form";
import { useMockForm } from "@shared/lib/mock/useMockForm";

export const Builder = () => {
  const { mockId } = useParams<{ mockId: string }>();
  const [isEditing, setIsEditing] = useState(!!mockId);
  const navigate = useNavigate();

  const { editingMock, handleSubmit, isSubmitting, status, setStatus } =
    useMockForm(mockId);

  const handleCancel = () => {
    navigate("/saved");
  };

  return (
    <Card size="small" title={isEditing ? "Edit mock" : "Add new mock"}>
      <Form
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
