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

const LandingPage: React.FC = () => {
  const { articles } = useArticleState();
  const articleDispatch = useArticleDispatch();

  const { sports } = useSportState();
  const sportDispatch = useSportDispatch();

  const { teams } = useTeamState();
  const teamDispatch = useTeamDispatch();

  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedTabSport, setSelectedSportTab] = useState("");
  const [selectedSport, setSelectedSport] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");

  useEffect(() => {
    // Fetch initial data
    fetchArticles(articleDispatch);
    fetchSports(sportDispatch);
    fetchTeams(teamDispatch);
  }, []);

  useEffect(() => {
    // Update articlesCopy based on selectedTab, selectedSport, etc.
    // Use articles, selectedTab, selectedSport, etc. to filter and set articlesCopy
  }, [articles, selectedTab, selectedSport]);

  useEffect(() => {
    // Update teamsCopy based on selectedSport, etc.
    // Use teams, selectedSport, etc. to filter and set teamsCopy
  }, [teams, selectedSport]);

  const handleTabChange = (tabIndex: number, sportId: number) => {
    setSelectedTab(tabIndex);
    console.group(sportId);
    if (tabIndex > 0) {
      setSelectedSportTab(sports[tabIndex - 1].name);
    }
  };

  const handleSportChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSport(event.target.value);
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
          <div className="h-5/6 w-9/10 rounded-md p-2 mx-auto shadow-md border">
            {/* Create todo div here */}
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
                  All
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
                    return true; // Show all articles if selectedTab is 0
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
                  {sports.map((sport) => (
                    <option key={sport.id} value={sport.name}>
                      {sport.name}
                    </option>
                  ))}
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
<div className="w-full border p-2 m-1 rounded-md" key={article.id}>
  <h1 className="text-xl font-bold">{article.title}</h1>
  <h4 className="text-gray-600">{article.summary}</h4>
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
