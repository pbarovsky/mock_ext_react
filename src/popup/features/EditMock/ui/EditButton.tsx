import { EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { FC } from "react";
import { MockData } from "@shared/lib/types";

export const EditButton: FC<{ record: MockData }> = ({ record }) => {
  const navigate = useNavigate();

  const handleEdit = (mock: MockData) => {
    navigate(`/add-mock/${mock.id}`);
  };
  return (
    <>
      <Button
        type="text"
        icon={<EditOutlined />}
        onClick={() => handleEdit(record)}
      />
    </>
  );
};
