/* eslint-disable @typescript-eslint/no-unused-vars */
import { RouterProvider } from "react-router-dom";
import { mainRouter } from "./routes";
import { useArticleDispatch } from "./context/articles/ArticleContext";
import { useSportDispatch } from "./context/sports/SportContext";
import { useTeamDispatch } from "./context/teams/TeamContext";
import { useMatchDispatch } from "./context/matches/MatchContext";
import { fetchArticles } from "./context/articles/actions";
import { fetchSports } from "./context/sports/actions";
import { fetchTeams } from "./context/teams/actions";
import { fetchMatches } from "./context/matches/actions";
import { useEffect } from "react";



function App() {

  // const { articles } = useArticleState();
  const articleDispatch = useArticleDispatch();

  // const { sports } = useSportState();
  const sportDispatch = useSportDispatch();

  // const { teams } = useTeamState();
  const teamDispatch = useTeamDispatch();

  // const { matches } = useMatchState();
  const matchDispatch = useMatchDispatch();



  const pageLoad = () => {
    // Fetch initial data
    fetchArticles(articleDispatch);
    fetchSports(sportDispatch);
    fetchTeams(teamDispatch);
    fetchMatches(matchDispatch);
    // fetchMatchScores();
  };

  useEffect(() => {
    pageLoad();
  }, []);
  return (
    <div className="app">
      <RouterProvider router={mainRouter} />
    </div>
  );
}

export default App;