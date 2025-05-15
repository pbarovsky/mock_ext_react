import { createRoot } from "react-dom/client";
import { App } from "@app/App";
import "@ant-design/v5-patch-for-react-19";

const root = createRoot(document.getElementById("app")!);
root.render(<App />);
