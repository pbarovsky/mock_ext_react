import { useEffect } from "react";
import { Form, Input, Button } from "antd";
import { MockData, Status } from "../../types";
import { StatusTag } from "./StatusTag";
import { urlRules, responseRules } from "../utils/validation";
import { formattedJson } from "../utils/jsonUtils";

interface MockFormProps {
  initialValues?: MockData;
  onSubmit: (values: { url: string; response: string }) => Promise<boolean>;
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
  setStatus,
}: MockFormProps) => {
  const [form] = Form.useForm<{ url: string; response: string }>();

  useEffect(() => {
    form.resetFields();
  }, [initialValues]);

  useEffect(() => {
    if (status.type) {
      const timer = setTimeout(() => setStatus({ type: null }), 3000);
      return () => clearTimeout(timer);
    }
  }, [status, setStatus]);

  const handleSubmit = async (values: { url: string; response: string }) => {
    const success = await onSubmit(values);

    if (success) {
      form.resetFields();
      if (isEditing) {
        onCancel?.();
      }
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{
        ...initialValues,
        response: formattedJson(initialValues?.response || ""),
      }}
    >
      <Form.Item name="url" label="URL" rules={urlRules}>
        <Input placeholder="https://mockapi.com/data" />
      </Form.Item>
      <Form.Item label="Response" name="response" rules={responseRules}>
        <Input.TextArea
          rows={5}
          placeholder='{"content": "mocked data", "data": {}}'
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isSubmitting}>
          {isEditing ? "Update" : "Add"} Mock
        </Button>
        {isEditing && (
          <Button
            style={{ marginLeft: 8 }}
            onClick={() => (form.resetFields(), onCancel?.())}
          >
            Cancel
          </Button>
        )}
      </Form.Item>
      {status.type && <StatusTag {...status} />}
    </Form>
  );
};
