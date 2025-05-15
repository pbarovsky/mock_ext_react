import { AddMock } from "pages/addMock/AddMock";
import { MockListPage } from "pages/MockList";
import { SettingsPage } from "pages/Settings";
import { createMemoryRouter, RouterProvider } from "react-router";
import { PageLayout } from "widgets/PageLayout";

const router = createMemoryRouter([
  {
    path: "/",
    element: (
      <PageLayout activeNav="add-mock">
        <AddMock />
      </PageLayout>
    ),
  },
  {
    path: "/add-mock/:mockId",
    element: (
      <PageLayout activeNav="add-mock">
        <AddMock />
      </PageLayout>
    ),
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
