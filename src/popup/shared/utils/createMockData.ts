import { MockData } from "@types";

export const createMockData = (
  values: { name: string; url: string; response: string },
  editingMock?: MockData
): MockData => ({
  id: editingMock?.id || crypto.randomUUID(),
  name: values.name,
  url: values.url,
  response: values.response,
  isActive: editingMock?.isActive ?? true,
});
