import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app";
import "@yamori-design/styles/dist/global.css";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename="issued-recipes">
      <App />
    </BrowserRouter>
  </StrictMode>
);
