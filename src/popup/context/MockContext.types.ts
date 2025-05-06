import { MockData, Status } from "../app/App.types";

export interface MockContextType {
  mocks: MockData[];
  addMock: (mock: MockData) => Promise<void>;
  updateMock: (mock: MockData) => Promise<boolean>;
  deleteMock: (id: string) => Promise<void>;
  toggleMock: (id: string) => Promise<void>;
  status: Status;
  setStatus: (status: Status) => void;
}
