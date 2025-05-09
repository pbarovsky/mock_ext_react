import { MockContext } from "../context/MockContext";
import { useState, useEffect, FC, ReactNode } from "react";
import { MockData, Status, MockContextType } from "../../types";
import { MESSAGES } from "../utils/constants";
import { SaveCleanJson } from "../utils/jsonUtils";

export const MockProvider: FC<{ children: ReactNode }> = ({ children }) => {
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
      setMocks(result.mocks || []);
    }
  };

  const addMock = async (mock: MockData) => {
    if (mocks.some((m) => m.url === mock.url)) {
      setStatus({ type: "error", message: MESSAGES.MOCK_EXIST });
      return;
    }

    const cleanedMock: MockData = {
      ...mock,
      response: SaveCleanJson(mock.response),
    };

    await saveMocks([...mocks, cleanedMock]);
    setStatus({ type: "success", message: MESSAGES.MOCK_ADDED });
  };

  const updateMock = async (mock: MockData): Promise<boolean> => {
    const curMock = mocks.find((m) => m.id === mock.id);

    const cleanedMock = { ...mock, response: SaveCleanJson(mock.response) };

    const isSame =
      curMock &&
      curMock.url === cleanedMock.url &&
      SaveCleanJson(curMock.response) === cleanedMock.response;

    if (isSame) {
      setStatus({ type: "error", message: MESSAGES.MOCK_UPDATED_FAILED });
      return false;
    }

    if (mocks.some((m) => m.url === mock.url && m.id !== mock.id)) {
      setStatus({ type: "error", message: MESSAGES.EDIT_MOCK_EXIST });
      return false;
    }

    await saveMocks(mocks.map((m) => (m.id === mock.id ? cleanedMock : m)));
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
