import { createContext } from "react";
import { MockContextType } from "../types";

const defaultContext: MockContextType = {
  mocks: [],
  addMock: async () => {},
  updateMock: async () => Promise.resolve(false),
  deleteMock: async () => {},
  toggleMock: async () => {},
  status: { type: null, message: "" },
  setStatus: () => {},
};

export const MockContext = createContext<MockContextType>(defaultContext);
