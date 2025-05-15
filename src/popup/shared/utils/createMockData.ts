import { MockData } from "@types";

export const createMockData = (
  values: { url: string; response: string },
  editingMock?: MockData
): MockData => ({
  id: editingMock?.id || crypto.randomUUID(),
  url: values.url,
  response: values.response,
  isActive: editingMock?.isActive ?? true,
});
