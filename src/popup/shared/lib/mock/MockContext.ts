import { createContext } from "react";
import { MockContextType, MockData } from "@types";

const defaultContext: MockContextType = {
  mocks: [],
  addMock: async (_mock: MockData) => Promise.resolve(false),
  updateMock: async (_mock: MockData) => Promise.resolve(false),
  deleteMock: async (_id: string) => Promise.resolve(),
  toggleMock: async (_id: string) => Promise.resolve(),
  status: { type: null, message: "" },
  setStatus: () => {},
  saveMocks: async (_mocks: MockData[]) => Promise.resolve(),
  setMocks: (_mocks: MockData[]) => {},
};

export const MockContext = createContext<MockContextType>(defaultContext);
