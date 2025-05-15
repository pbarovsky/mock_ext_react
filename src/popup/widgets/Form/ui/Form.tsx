import { useEffect, useState } from "react";
import { Form as AntForm, Input, Button } from "antd";
import { MockData, Status } from "../../../../types";
import { StatusTag } from "shared/ui/Status";
import { urlRules, responseRules } from "../../../shared/utils/validation";
import { formattedJson } from "shared/utils/jsonUtils";

interface MockFormProps {
  initialValues?: MockData;
  onSubmit: (values: { url: string; response: string }) => Promise<boolean>;
  onCancel?: () => void;
  isSubmitting: boolean;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  status: Status;
  setStatus: (status: Status) => void;
}

export const Form = ({
  initialValues,
  onSubmit,
  onCancel,
  isSubmitting,
  isEditing,
  setIsEditing,
  status,
  setStatus,
}: MockFormProps) => {
  const [form] = AntForm.useForm<{ url: string; response: string }>();
  const [formValues, setFormValues] = useState<{
    url: string;
    response: string;
  }>({
    url: initialValues?.url || "",
    response: formattedJson(initialValues?.response || ""),
  });

  useEffect(() => {
    if (initialValues) {
      setFormValues({
        url: initialValues.url,
        response: formattedJson(initialValues.response || ""),
      });
    }
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
      setFormValues({ url: "", response: "" });
      form.setFieldsValue({ url: "", response: "" });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setFormValues({ url: "", response: "" });
    form.setFieldsValue({ url: "", response: "" });
    setIsEditing(false);
    onCancel?.();
  };

  return (
    <AntForm
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={formValues}
    >
      <AntForm.Item name="url" label="URL" rules={urlRules}>
        <Input placeholder="https://mockapi.com/data" />
      </AntForm.Item>
      <AntForm.Item label="Response" name="response" rules={responseRules}>
        <Input.TextArea
          rows={5}
          placeholder='{"content": "mocked data", "data": {}}'
        />
      </AntForm.Item>
      <AntForm.Item>
        <Button type="primary" htmlType="submit" loading={isSubmitting}>
          {isEditing ? "Update" : "Add"} Mock
        </Button>
        {isEditing && (
          <Button style={{ marginLeft: 8 }} onClick={handleCancel}>
            Cancel
          </Button>
        )}
      </AntForm.Item>
      {status.type && <StatusTag {...status} />}
    </AntForm>
  );
};
