import { AddMock } from "pages/addMock/AddMock";
import { MockListPage } from "pages/MockList";
import { SettingsPage } from "pages/Settings";
import { createMemoryRouter, RouterProvider } from "react-router";

const router = createMemoryRouter([
  {
    path: "/",
    element: <AddMock />,
  },
  {
    path: "/add-mock/:mockId",
    element: <AddMock />,
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
