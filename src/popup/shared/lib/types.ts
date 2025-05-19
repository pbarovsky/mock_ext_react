export type NavType = "add-mock" | "list" | "settings";

export interface Theme {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export interface MockData {
  id: string;
  name: string;
  url: string;
  response: string;
  isActive: boolean;
}

export interface Status {
  type: "success" | "error" | null;
  message?: string;
}

export interface MockContextType {
  mocks: MockData[];
  addMock: (mock: MockData) => Promise<void>;
  updateMock: (mock: MockData) => Promise<boolean>;
  deleteMock: (id: string) => Promise<void>;
  toggleMock: (id: string) => Promise<void>;
  status: Status;
  setStatus: (status: Status) => void;
  saveMocks: (mocks: MockData[]) => Promise<void>;
  setMocks: (mocks: MockData[]) => void;
}

export type ViewType = "list" | "table";

export interface MockUIItem {
  id: string;
  renderName: React.ReactNode;
  renderURL: React.ReactNode;
  renderResponse: React.ReactNode;
  renderSwitch: React.ReactNode;
  renderActions: React.ReactNode;
}
