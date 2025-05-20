import { useEffect, useState } from "react";
import { Form as AntForm, Input, Button } from "antd";
import { StatusTag } from "@shared/ui/Status";
import { urlRules, responseRules } from "@shared/utils/validation";
import { MockData, Status } from "../../../shared/lib/types";
import { formattedJson } from "@shared/utils/jsonUtils";
import { TextArea } from "@shared/ui/TextArea";

interface Props {
  initialValues?: MockData;
  onSubmit: (values: {
    name: string;
    url: string;
    response: string;
  }) => Promise<boolean>;
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
}: Props) => {
  const [form] = AntForm.useForm<{
    name: string;
    url: string;
    response: string;
  }>();

  const [formValues, setFormValues] = useState<{
    name: string;
    url: string;
    response: string;
  }>({
    name: initialValues?.name || "",
    url: initialValues?.url || "",
    response: formattedJson(initialValues?.response || ""),
  });

  useEffect(() => {
    if (initialValues) {
      setFormValues({
        name: initialValues.name,
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
  }, [status]);

  const handleSubmit = async (values: {
    name: string;
    url: string;
    response: string;
  }) => {
    const success = await onSubmit(values);

    if (success) {
      setFormValues({ name: "", url: "", response: "" });
      form.setFieldsValue({ name: "", url: "", response: "" });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setFormValues({ name: "", url: "", response: "" });
    form.setFieldsValue({ name: "", url: "", response: "" });
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
      <AntForm.Item
        name="name"
        label="Name"
        rules={[
          { required: true, message: "Please enter a name for the mock" },
        ]}
      >
        <Input placeholder="Enter mock name" />
      </AntForm.Item>
      <AntForm.Item name="url" label="URL" rules={urlRules}>
        <Input placeholder="https://mockapi.com/data" />
      </AntForm.Item>
      <AntForm.Item label="Response" name="response" rules={responseRules}>
        <TextArea
          value={formValues.response}
          onChange={(value) =>
            setFormValues((prev) => ({ ...prev, response: value }))
          }
        />
      </AntForm.Item>
      <AntForm.Item>
        <Button
          style={{ cursor: "pointer" }}
          type="primary"
          htmlType="submit"
          loading={isSubmitting}
        >
          {isEditing ? "Update" : "Add"} Mock
        </Button>
        {isEditing && (
          <Button
            style={{ marginLeft: 8, cursor: "pointer" }}
            onClick={handleCancel}
          >
            Cancel
          </Button>
        )}
      </AntForm.Item>
      {status.type && <StatusTag {...status} />}
    </AntForm>
  );
};
