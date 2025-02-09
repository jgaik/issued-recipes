import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app";
import { HashRouter } from "react-router";
import { Provider } from "react-redux";
import { store } from "./store";
import "@yamori-design/styles/dist/global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  </StrictMode>
);
