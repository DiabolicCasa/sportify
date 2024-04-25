import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ArticleProvider } from "./context/articles/ArticleContext.tsx";
import { SportProvider } from "./context/sports/SportContext.tsx";
import { TeamProvider } from "./context/teams/TeamContext.tsx";
import { MatchProvider } from "./context/matches/MatchContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ArticleProvider>
      <SportProvider>
        <TeamProvider>
        <MatchProvider>
          <App />
        </MatchProvider>
        </TeamProvider>
      </SportProvider>
    </ArticleProvider>
  </React.StrictMode>
);
