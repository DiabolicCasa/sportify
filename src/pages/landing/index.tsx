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


  const handleTabChange = (index: number, id: number) => {
    setSelectedTab(index);
    console.log(`Tab changed to ${index}`);
    if (index === 0) {
      setArticlesCopy(articles);
    } else {
      let newArticles = articles.map((item) => ({ ...item }));
      newArticles = newArticles.filter((item) => item.sport.id === id);
      setArticlesCopy(newArticles);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        fetchArticles(articleDispatch),
        fetchSports(sportDispatch),
        fetchTeams(teamDispatch)
      ]);
    };

    fetchData().then(() => {
      setArticlesCopy([...articles]);
      console.log("Articles : ", articles);
    });
  }, []);

  const [articlesCopy, setArticlesCopy] = useState(articles);
  const [teamsCopy, setTeamsCopy] = useState(teams.filter((team)=>{return team.plays === 'Basketball'}));


  const [selectedSport, setSelectedSport] = useState("");

  const handleSportChange = (e : React.ChangeEvent<HTMLSelectElement>) => {

    console.log(e.target.value)
    setSelectedSport(e.target.value);

    const newTeams = teams.filter((team)=>{
        return team.plays === e.target.value;
    })
    console.log("New Teams : ",newTeams)
    setTeamsCopy(newTeams)
    setSelectedTeam(newTeams[0].name)
  }; 
   const [selectedTeam   , setSelectedTeam] = useState("");

  const handleTeamChange = (e :React.ChangeEvent<HTMLSelectElement> ) => {
    setSelectedTeam(e.target.value);
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
        <div className="flex justify-between">
          <div className="w-3/4 m-2">
            <h1 className="text-xl text-black font-bold">Trending News</h1>
            <div className="w-9/10 border rounded-md p-2 mx-auto shadow-md mt-2 overflow-y-auto">
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
              {articlesCopy.length > 0 ? (
                articlesCopy.map((item) => (
                  <ArticleDiv key={item.id} item={item} />
                ))
              ) : (
                <div className="h-52  w-full flex justify-center items-center">
                  <h1 className="text-xl text-gray-500 font-semibold">
                    No Articles
                  </h1>
                </div>
              )}
            </div>
          </div>
          <div className="w-1/4 m-2">
            <h1 className="text-xl text-black font-bold">Your Favourites</h1>
            <div className="h-5/6 w-9/10 border rounded-md p-2 mx-auto shadow-md mt-2">
              <div className="w-full border rounded-md p-2 shadow-md mb-5">
                <select
                  className="py-2 px-3 pe-9 block w-full border-gray-200 border rounded-lg text-sm "
                  value={selectedSport}
                  onChange={handleSportChange}
                >
                 
                  {
                    sports.map((sport)=>{
                    return   <option value={sport.name}>{sport.name}</option>
                    })
                  }
                
                </select><select
                  className="py-2 mt-2 px-3 pe-9 block w-full border-gray-200 border rounded-lg text-sm "
                  value={selectedTeam}
                  onChange={handleTeamChange}
                >
                 
                  {
                    teamsCopy.map((team)=>{
                    return   <option value={team.name}>{team.name}</option>
                    })
                  }
                
                </select>
                
              </div>

              hello
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
