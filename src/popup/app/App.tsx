import {
  ExtensionApiProvider,
  RouterProvider,
  ThemeProvider,
} from "./providers";

export const App = () => {
  return (
    <ThemeProvider>
      <ExtensionApiProvider>
        <RouterProvider />
      </ExtensionApiProvider>
    </ThemeProvider>
  );
};
