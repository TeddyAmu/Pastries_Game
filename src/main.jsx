import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { GetProviderStore } from "./store/routerStore.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GetProviderStore>
      <App />
    </GetProviderStore>
  </React.StrictMode>
);
