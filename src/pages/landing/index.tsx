import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { useArticleState } from "../../context/articles/ArticleContext";
import ArticleDiv from "./ArticleDiv";
import { useSportState } from "../../context/sports/SportContext";
import { useMatchState } from "../../context/matches/MatchContext";
import {
  ISLOGGED,
  PREFERRED_SPORTS,
  PREFERRED_TEAM,
} from "../../config/constants";
import { useTeamState } from "../../context/teams/TeamContext";
import ViewArticle from "../../components/ViewArticle";
import LiveMatches from "../../components/LiveMatches";

const LandingPage: React.FC = () => {
  const { articles } = useArticleState();
  const { sports } = useSportState();
  const { teams } = useTeamState();
  const { matches } = useMatchState();

  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedTabSport, setSelectedSportTab] = useState("");
  const [selectedSport, setSelectedSport] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [currentArticle, setCurrentArticle] = useState(articles[0]);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu visibility

  
  const preferredTeams = JSON.parse(
    localStorage.getItem(PREFERRED_TEAM) || "[]"
  );
  const preferredSports = JSON.parse(
    localStorage.getItem(PREFERRED_SPORTS) || "[]"
  );

  const toggleViewModal = () => {
    setIsViewModalOpen(!isViewModalOpen);
  };

  const handleTabChange = (tabIndex: number) => {

    setSelectedTab(tabIndex);
    if (tabIndex > 0) {
      setSelectedSportTab(sports[tabIndex - 1].name);
    }
    setIsMenuOpen(false);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle menu visibility
  };

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
      <div className="w-11/12 md:w-5/6 lg:w-4/5 mx-auto bg-offwhite">
        <LiveMatches matches={matches} />
        <div className="flex flex-col md:flex-row justify-between">
          <div className="w-full md:w-3/4 m-2">
            <h1 className="text-xl text-black font-bold">Trending News</h1>
            <div className="w-full border rounded-md p-2 mx-auto shadow-md mt-2 overflow-y-auto">
<div className="block md:hidden"> 
          <button
            onClick={handleMenuToggle}
            className="block w-full p-2 flex items-center justify-around text-center border rounded"
          >
            {selectedTab === 0 ? "Your Choice" : selectedTabSport} <i className='bx text-2xl font-normal bxs-chevron-down' ></i>
          </button>
          {isMenuOpen && (
            <ul className="flex flex-col w-full p-2">
              <li
                key={0}
                className={`cursor-pointer ${
                  selectedTab === 0
                    ? "font-bold "
                    : ""
                }`}
                onClick={() => handleTabChange(0)}
              >
                {localStorage.getItem(ISLOGGED) ? "Your Choice" : "All"}
              </li>
              {sports.map((sport, index) => (
                <li
                  key={index + 1}
                  className={`cursor-pointer ${
                    selectedTab === index + 1
                      ? "font-bold underline underline-offset-8 decoration-4"
                      : ""
                  }`}
                  onClick={() => handleTabChange(index + 1)}
                >
                  {sport.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Regular horizontal menu for larger screens */}
        <div className="hidden md:block">
          <ul className="flex w-full p-2 justify-between">
            <li
              key={0}
              className={`cursor-pointer ${
                selectedTab === 0
                  ? "font-bold underline underline-offset-8 decoration-4"
                  : ""
              }`}
              onClick={() => handleTabChange(0)}
            >
              {localStorage.getItem(ISLOGGED) ? "Your Choice" : "All"}
            </li>
            {sports.map((sport, index) => (
              <li
                key={index + 1}
                className={`cursor-pointer ${
                  selectedTab === index + 1
                    ? "font-bold underline underline-offset-8 decoration-4"
                    : ""
                }`}
                onClick={() => handleTabChange(index + 1)}
              >
                {sport.name}
              </li>
            ))}
          </ul>
        </div>

              {(() => {
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
                    } else {
                      return true;
                    }
                  }
                  return article.sport.name === selectedTabSport;
                });

                if (filteredArticles.length > 0) {
                  return filteredArticles.map((article) => (
                    <ArticleDiv
                      setCurrentArticle={setCurrentArticle}
                      toggleViewModal={toggleViewModal}
                      key={article.id}
                      item={article}
                    />
                  ));
                } else {
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
            <h1 className="text-xl text-black font-bold">Favourites</h1>
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
                      <button
                        onClick={() => {
                          setCurrentArticle(article);
                          toggleViewModal();
                        }}
                        className="w-full bg-primarygreen text-white rounded-md py-1 mt-2 hover:bg-green-700"
                      >
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
      <ViewArticle
        article={currentArticle}
        isViewModalOpen={isViewModalOpen}
        toggleViewModal={toggleViewModal}
      />
    </>
  );
};

export default LandingPage;
