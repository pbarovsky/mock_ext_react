import { AddMockPage } from "@pages/addMock";
import { MockListPage } from "@pages/MockList";
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
    path: "/list",
    element: <MockListPage />,
  },
  {
    path: "/settings",
    element: <SettingsPage />,
  },
]);

export const Provider = () => {
  return <RouterProvider router={router} />;
};
