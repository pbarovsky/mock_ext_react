import { AddMockPage } from "@pages/addMock";
import { SavedMocksPage } from "@pages/SavedMocks";
import { SettingsPage } from "@pages/Settings";
import { createMemoryRouter, RouterProvider } from "react-router";

const router = createMemoryRouter([
  {
    path: "/",
    element: <AddMockPage />,
  },
  {
    path: "/add-mock/:mockId",
    element: <AddMockPage />,
  },
  {
    path: "/saved",
    element: <SavedMocksPage />,
  },
  {
    path: "/settings",
    element: <SettingsPage />,
  },
]);

export const Provider = () => {
  return <RouterProvider router={router} />;
};
