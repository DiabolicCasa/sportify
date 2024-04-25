/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import {
  useArticleDispatch,
  useArticleState,
} from "../../context/articles/ArticleContext";
import { fetchArticles } from "../../context/articles/actions";
import ArticleDiv from "./ArticleDiv";
import {
  useSportDispatch,
  useSportState,
} from "../../context/sports/SportContext";
import { fetchSports } from "../../context/sports/actions";
import { useTeamDispatch, useTeamState } from "../../context/teams/TeamContext";
import { fetchTeams } from "../../context/teams/actions";
import {
  useMatchDispatch,
  useMatchState,
} from "../../context/matches/MatchContext";
import { fetchMatches } from "../../context/matches/actions";
import {
  API_ENDPOINT,
  ISLOGGED,
  PREFERRED_SPORTS,
  PREFERRED_TEAM,
} from "../../config/constants";
import { MatchSummary } from "../../context/matches/types";

const LandingPage: React.FC = () => {
  const { articles } = useArticleState();

  const { sports } = useSportState();

  const { teams } = useTeamState();

  const { matches } = useMatchState();
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedTabSport, setSelectedSportTab] = useState("");
  const [selectedSport, setSelectedSport] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [liveMatchScore, setLiveMatchScore] = useState<MatchSummary[]>([]);

  const fetchMatchScores = async () => {
    try {
      // Filter live matches
      console.log("matches : ", matches.length);
      const liveMatches = await matches.filter((item) => item.isRunning);
      console.log("Live matches : ", liveMatches.length);
      // Array to store match scores
      const matchScores: MatchSummary[] = [];

      // Fetch scores for each live match
      for (const match of liveMatches) {
        const response = await fetch(`${API_ENDPOINT}/matches/${match.id}`);
        const data = await response.json();
        // Assuming the API response contains the live match score
        console.log(data);
        matchScores.push(data);
      }

      // Process the match scores as needed (e.g., update state)
      console.log("Match Scores : ", matchScores);
      setLiveMatchScore(matchScores);
    } catch (error) {
      console.error("Error fetching match scores:", error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchMatchScores();
    }, 60000); // 2 minutes in milliseconds

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const pageLoad = () => {
    // Fetch initial data
    // fetchArticles(articleDispatch);
    // fetchSports(sportDispatch);
    // fetchTeams(teamDispatch);
    // fetchMatches(matchDispatch);
    fetchMatchScores();
  };

  useEffect(() => {
    pageLoad();
  }, []);

  const handleTabChange = (tabIndex: number, sportId: number) => {
    setSelectedTab(tabIndex);
    console.group(sportId);
    if (tabIndex > 0) {
      setSelectedSportTab(sports[tabIndex - 1].name);
    }
  };

  const preferredTeams = JSON.parse(
    localStorage.getItem(PREFERRED_TEAM) || "[]"
  );
  const preferredSports = JSON.parse(
    localStorage.getItem(PREFERRED_SPORTS) || "[]"
  );

  const handleSportChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSport(event.target.value);
    setSelectedTeam("");
  };

  const handleTeamChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTeam(event.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="w-5/6 mx-auto bg-offwhite">
        <div className="w-full h-52 m-2 ">
          <h1 className="text-xl text-black font-bold">Live Games</h1>
          <div className="h-5/6 flex w-9/10 rounded-md p-2 mx-auto shadow-md border overflow-auto">
            {/* Create todo div here */}
            {matches
              .filter((match) => match.isRunning)
              .map((match) => (
                <div
                  key={match.id}
                  className="bg-white w-1/3 border rounded-lg shadow-md p-4 m-2"
                >
                  <div className="flex w-full  justify-between">
                    <h1>{match.sportName}</h1>
                    <button onClick={fetchMatchScores}>
                      <i className="bx bx-refresh   text-xl"></i>
                    </button>
                  </div>
                  <h1 className="text-sm font-bold">
                    {match.name.split("at")[0]}
                  </h1>
                  <p className="text-gray-500 text-sm">{match.location}</p>

                  <div className="mt-2">
                    {match.teams.map((team) => (
                      <span
                        key={team.id}
                        className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                      >
                        {team.name}
                        {"  "}
                        {liveMatchScore
                          .filter((item) => item.id === match.id)
                          .map((item) => {
                            if (item.playingTeam === team.id)
                              return `(${item.score[team.name]})*`;
                            else return `(${item.score[team.name]})`;
                          })}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="w-full md:w-3/4 m-2">
            <h1 className="text-xl text-black font-bold">Trending News</h1>
            <div className="w-full border rounded-md p-2 mx-auto shadow-md mt-2 overflow-y-auto">
              <ul className="flex w-full p-2 justify-between">
                <li
                  key={0}
                  className={`cursor-pointer ${
                    selectedTab === 0 ? "font-bold" : ""
                  }`}
                  onClick={() => handleTabChange(0, 0)}
                >
                  {localStorage.getItem(ISLOGGED) ? "Your Choice" : "All"}
                </li>
                {sports.map((sport, index) => (
                  <li
                    key={index + 1}
                    className={`cursor-pointer ${
                      selectedTab === index + 1 ? "font-bold" : ""
                    }`}
                    onClick={() => handleTabChange(index + 1, sport.id)}
                  >
                    {sport.name}
                  </li>
                ))}
              </ul>
              {(() => {
                // Filter articles based on the selected tab and sport
                const filteredArticles = articles.filter((article) => {
                  if (selectedTab === 0) {
                    if (localStorage.getItem(ISLOGGED)) {
                      const strr = JSON.stringify(article);
                      return (
                        preferredSports.some((element: string) =>
                          strr.includes(element)
                        ) ||
                        preferredSports.some((element: string) =>
                          strr.includes(element)
                        )
                      );
                    }
                    // Show all articles if selectedTab is 0
                    else {
                      return true;
                    }
                  }
                  return article.sport.name === selectedTabSport; // Show articles for selected sport
                });

                // Check if there are any filtered articles
                if (filteredArticles.length > 0) {
                  // If there are filtered articles, map and display them
                  return filteredArticles.map((article) => (
                    <ArticleDiv key={article.id} item={article} />
                  ));
                } else {
                  // If there are no filtered articles, display "No Articles" message
                  return (
                    <div className="h-52 w-full flex justify-center items-center">
                      <h1 className="text-xl text-gray-500 font-semibold">
                        No Articles
                      </h1>
                    </div>
                  );
                }
              })()}
            </div>
          </div>
          <div className="w-full md:w-1/4 m-2">
            <h1 className="text-xl text-black font-bold">Your Favourites</h1>
            <div className="h-5/6 w-full border rounded-md p-2 mx-auto shadow-md mt-2">
              <div className="w-full border rounded-md p-2 shadow-md mb-5">
                <select
                  className="py-2 px-3 pe-9 block w-full border-gray-200 border rounded-lg text-sm "
                  value={selectedSport}
                  onChange={handleSportChange}
                >
                  <option value="">Select Sport</option>
                  {sports.map((sport) => {
                    if (localStorage.getItem(ISLOGGED)) {
                      if (preferredSports.includes(sport.name)) {
                        return (
                          <option key={sport.id} value={sport.name}>
                            {sport.name}
                          </option>
                        );
                      }

                      return null;
                    }

                    return (
                      <option key={sport.id} value={sport.name}>
                        {sport.name}
                      </option>
                    );
                  })}
                </select>
                <select
                  className="py-2 mt-2 px-3 pe-9 block w-full border-gray-200 border rounded-lg text-sm "
                  value={selectedTeam}
                  onChange={handleTeamChange}
                >
                  <option value="">Select Team</option>
                  {teams
                    .filter((team) => {
                      if (selectedSport === "") {
                        return false;
                      }
                      return team.plays === selectedSport;
                    })
                    .map((team) => {
                      if (localStorage.getItem(ISLOGGED)) {
                        if (preferredTeams.includes(team.name)) {
                          return (
                            <option key={team.id} value={team.name}>
                              {team.name}
                            </option>
                          );
                        }

                        return null;
                      }
                      return (
                        <option key={team.id} value={team.name}>
                          {team.name}
                        </option>
                      );
                    })}
                </select>
              </div>
              {(() => {
                const newArticles = articles.filter((article) => {
                  if (selectedSport === "") {
                    return true;
                  }
                  if (selectedSport !== "" && selectedTeam === "") {
                    return article.sport.name === selectedSport;
                  }
                  if (selectedSport !== "" && selectedTeam !== "") {
                    return (
                      article.sport.name === selectedSport &&
                      JSON.stringify(article).includes(selectedTeam)
                    );
                  }
                });

                return newArticles.length > 0 ? (
                  newArticles.map((article) => (
                    <div
                      className="w-full border p-2 m-1 rounded-md"
                      key={article.id}
                    >
                      <h1 className="text-normal mb-1 font-bold">
                        {article.title}
                      </h1>
                      <h4 className="text-gray-600 text-sm">
                        {article.summary}
                      </h4>
                      <button className="w-full bg-primarygreen text-white rounded-md py-1 mt-2 hover:bg-green-700">
                        Read more
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="h-52 w-full flex justify-center items-center">
                    <h1 className="text-xl text-gray-500 font-semibold">
                      No Articles
                    </h1>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
