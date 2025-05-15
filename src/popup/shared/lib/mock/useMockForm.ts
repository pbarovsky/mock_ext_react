import { useMock } from "./useMock";
import { useState } from "react";
import { createMockData } from "@shared/utils/createMockData";
import { MESSAGES } from "@shared/utils/constants";

export const useMockForm = (mockId?: string) => {
  const { mocks, addMock, updateMock, status, setStatus } = useMock();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const editingMock = mockId
    ? mocks.find((mock) => mock.id === mockId)
    : undefined;

  const handleSubmit = async (values: { url: string; response: string }) => {
    try {
      setIsSubmitting(true);
      const mockData = createMockData(values, editingMock);

      if (editingMock) {
        const isUpdated = await updateMock(mockData);
        return isUpdated;
      } else {
        await addMock(mockData);
        return true;
      }
    } catch {
      setStatus({ type: "error", message: MESSAGES.MOCK_SAVE_FAILED });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    editingMock,
    handleSubmit,
    isSubmitting,
    status,
    setStatus,
  };
};
