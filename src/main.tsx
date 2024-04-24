import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ArticleProvider } from "./context/articles/ArticleContext.tsx";
import { SportProvider } from "./context/sports/SportContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ArticleProvider>
      <SportProvider>
        <App />
      </SportProvider>
    </ArticleProvider>
  </React.StrictMode>
);
