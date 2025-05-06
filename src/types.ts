export interface MockData {
  id: string;
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
}

export type NavType = "add-mock" | "mock-list" | "settings";

export interface Theme {
  isDarkMode: boolean;
  onThemeChange: (checked: boolean) => void;
}
