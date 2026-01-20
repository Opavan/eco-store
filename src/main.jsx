import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { EcoPointsProvider } from "./context/EcoPointsContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <EcoPointsProvider>
      <App />
    </EcoPointsProvider>
  </React.StrictMode>
);
