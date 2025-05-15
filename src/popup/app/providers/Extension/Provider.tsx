import { MockContext } from "../../../context/MockContext";
import { useState, useEffect, FC, ReactNode, useCallback } from "react";
import { MockData, Status, MockContextType } from "../../../../types";
import { MESSAGES } from "../../../utils/constants";
import { cleanedJson } from "../../../utils/jsonUtils";

export const Provider: FC<{ children: ReactNode }> = ({ children }) => {
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

  const saveMocks = useCallback(
    async (newMocks: MockData[]) => {
      if (typeof chrome !== "undefined" && chrome.storage) {
        await chrome.storage.local.set({ mocks: newMocks });
        const result = await chrome.storage.local.get(["mocks"]);
        setMocks(result.mocks || []);
      }
    },
    [setMocks]
  );

  const addMock = useCallback(
    async (mock: MockData) => {
      if (mocks.some((m) => m.url === mock.url)) {
        setStatus({ type: "error", message: MESSAGES.MOCK_EXIST });
        return;
      }

      const cleanedMock: MockData = {
        ...mock,
        response: cleanedJson(mock.response),
      };

      await saveMocks([...mocks, cleanedMock]);
      setStatus({ type: "success", message: MESSAGES.MOCK_ADDED });
    },
    [mocks, setStatus, saveMocks]
  );

  const updateMock = useCallback(
    async (mock: MockData): Promise<boolean> => {
      const curMock = mocks.find((m) => m.id === mock.id);

      const cleanedMock = { ...mock, response: cleanedJson(mock.response) };

      const isSame =
        curMock &&
        curMock.url === cleanedMock.url &&
        cleanedJson(curMock.response) === cleanedMock.response;

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
    },
    [mocks, setStatus, saveMocks]
  );

  const deleteMock = useCallback(
    async (id: string) => {
      const newMocks = mocks.filter((m) => m.id !== id);
      await saveMocks(newMocks);
    },
    [mocks, saveMocks]
  );

  const toggleMock = useCallback(
    async (id: string) => {
      const newMocks = mocks.map((m) =>
        m.id === id ? { ...m, isActive: !m.isActive } : m
      );
      await saveMocks(newMocks);
    },
    [mocks, saveMocks]
  );

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
