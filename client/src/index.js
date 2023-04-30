import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

//including tinmce
const script = document.createElement("script");
script.src = "https://cdn.tiny.cloud/1/3v41w8ys8i1wx4tbdhbiu2fn6t4to49aczlkjqr1xtu1b9ce/tinymce/6/tinymce.min.js";
document.head.appendChild(script);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
 