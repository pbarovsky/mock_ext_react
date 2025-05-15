import { useContext } from "react";
import { MockContext } from "./MockContext";
import { MockContextType } from "../types";

export const useMock = (): MockContextType => {
  const context = useContext(MockContext);

  if (!context) {
    throw new Error("useMock must be used within a MockProvider");
  }

  return {
    mocks: context.mocks,
    addMock: context.addMock,
    updateMock: context.updateMock,
    deleteMock: context.deleteMock,
    toggleMock: context.toggleMock,
    status: context.status,
    setStatus: context.setStatus,
  };
};
