export interface MockData {
  id: string;
  url: string;
  response: string;
  isActive: boolean;
}

export interface AppState {
  mocks: MockData[];
  isDarkMode: boolean;
}

export type NavType = "add-mock" | "mock-list" | "settings";

export interface Status {
  type: "success" | "error" | null;
  message?: string;
}

export interface Theme {
  isDarkMode: boolean;
  onThemeChange: (checked: boolean) => void;
}
