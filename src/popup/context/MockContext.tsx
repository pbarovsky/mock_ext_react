import React, { createContext, useState, useEffect } from "react";
import { MockContextType } from "./MockContext.types";
import { MockData, Status } from "app/App.types";
import { MESSAGES } from "../utils/constants";

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

export const MockProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mocks, setMocks] = useState<MockData[]>([]);
  const [status, setStatus] = useState<Status>({ type: null, message: "" });

  useEffect(() => {
    if (typeof chrome !== "undefined" && chrome.storage) {
      chrome.storage.local.get(["mocks"], (result) => {
        if (result.mocks) {
          setMocks(result.mocks);
        }
      });
    }
  }, []);

  const saveMocks = async (newMocks: MockData[]) => {
    if (typeof chrome !== "undefined" && chrome.storage) {
      await chrome.storage.local.set({ mocks: newMocks });
      const result = await chrome.storage.local.get(["mocks"]);
      if (result.mocks) {
        setMocks(result.mocks);
      }
    }
  };

  const addMock = async (mock: MockData) => {
    if (mocks.some((m) => m.url === mock.url)) {
      setStatus({ type: "error", message: MESSAGES.MOCK_EXIST });
      return;
    }

    const newMocks = [...mocks, mock];
    await saveMocks(newMocks);
    setStatus({ type: "success", message: MESSAGES.MOCK_ADDED });
  };

  const updateMock = async (mock: MockData): Promise<boolean> => {
    const curMock = mocks.find((m) => m.id === mock.id);

    if (
      curMock &&
      curMock.url === mock.url &&
      curMock.response === mock.response
    ) {
      setStatus({ type: "error", message: MESSAGES.MOCK_UPDATED_FAILED });
      return false;
    }

    if (mocks.some((m) => m.url === mock.url && m.id !== mock.id)) {
      setStatus({ type: "error", message: MESSAGES.EDIT_MOCK_EXIST });
      return false;
    }

    const newMocks = mocks.map((m) => (m.id === mock.id ? mock : m));
    await saveMocks(newMocks);
    setStatus({ type: "success", message: MESSAGES.MOCK_UPDATED });

    return true;
  };

  const deleteMock = async (id: string) => {
    const newMocks = mocks.filter((m) => m.id !== id);
    await saveMocks(newMocks);
  };

  const toggleMock = async (id: string) => {
    const newMocks = mocks.map((m) =>
      m.id === id ? { ...m, isActive: !m.isActive } : m
    );
    await saveMocks(newMocks);
  };

  const value: MockContextType = {
    mocks,
    addMock,
    updateMock,
    deleteMock,
    toggleMock,
    status,
    setStatus,
  };

  return <MockContext.Provider value={value}>{children}</MockContext.Provider>;
};
