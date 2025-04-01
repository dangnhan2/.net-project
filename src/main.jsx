import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { App as Application } from "antd";
import "./style/global.style.scss";
import { ContextProvider } from "./context/Context.jsx";
createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Application>
    <ContextProvider>
      <App />
    </ContextProvider>
  </Application>
  // </StrictMode>
);
