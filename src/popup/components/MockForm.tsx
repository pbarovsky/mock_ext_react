import { useEffect } from "react";
import { Form, Input, Button, FormInstance } from "antd";
import { MockData, Status } from "../app/App.types";
import { StatusTag } from "./StatusTag";
import { urlRules, responseRules } from "../utils/validation";

interface MockFormProps {
  initialValues?: MockData;
  onSubmit: (values: { url: string; response: string }) => Promise<void>;
  onCancel?: () => void;
  isSubmitting: boolean;
  isEditing: boolean;
  status: Status;
  setStatus: (status: Status) => void;
}

export const MockForm = ({
  initialValues,
  onSubmit,
  onCancel,
  isSubmitting,
  isEditing,
  status,
  form,
  setStatus,
}: MockFormProps & {
  form: FormInstance<{ url: string; response: string }>;
}) => {
  useEffect(() => {
    form.resetFields();
  }, [initialValues]);

  useEffect(() => {
    if (status.type) {
      const timer = setTimeout(() => {
        setStatus({ type: null });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status, setStatus]);

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onSubmit}
      initialValues={initialValues}
    >
      <Form.Item name="url" label="URL" rules={urlRules}>
        <Input placeholder="https://api.example.com/data" />
      </Form.Item>
      <Form.Item label="Response" name="response" rules={responseRules}>
        <Input.TextArea
          rows={5}
          placeholder='{"status": "success", "data": {}}'
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isSubmitting}>
          {isEditing ? "Update" : "Add"} Mock
        </Button>
        {isEditing && (
          <Button
            style={{ marginLeft: 8 }}
            onClick={() => {
              form.resetFields();
              onCancel?.();
            }}
          >
            Cancel
          </Button>
        )}
      </Form.Item>
      {status.type && <StatusTag type={status.type} message={status.message} />}
    </Form>
  );
};
