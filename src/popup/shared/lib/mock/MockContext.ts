import { createContext } from "react";
import { MockContextType } from "@types";

const defaultContext: MockContextType = {
  mocks: [],
  addMock: async () => {},
  updateMock: async () => Promise.resolve(false),
  deleteMock: async () => Promise.resolve(),
  toggleMock: async () => Promise.resolve(),
  status: { type: null, message: "" },
  setStatus: () => {},
  saveMocks: async () => Promise.resolve(),
  setMocks: () => {},
};

export const MockContext = createContext<MockContextType>(defaultContext);
