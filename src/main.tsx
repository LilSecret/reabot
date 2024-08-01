import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./css/reset.css";
import "./css/general.css";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster />
    <App />
  </React.StrictMode>
);
