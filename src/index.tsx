import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app";
import { BrowserRouter } from "react-router";
import "@yamori-design/styles/dist/global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename="issued-recipes">
      <App />
    </BrowserRouter>
  </StrictMode>
);
