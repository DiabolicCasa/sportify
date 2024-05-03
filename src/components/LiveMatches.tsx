/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { API_ENDPOINT, ISLOGGED, PREFERRED_SPORTS } from '../config/constants';
import { Match, MatchSummary } from '../context/matches/types';

type Props = {
  matches: Match[]
}

const LiveMatches: React.FC<Props> = ({ matches }) => {
  const preferredSports = JSON.parse(localStorage.getItem(PREFERRED_SPORTS) || '[]')
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
    fetchMatchScores();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchMatchScores();
    }, 60000); // 2 minutes in milliseconds

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="w-full  m-2">
      <h1 className="text-xl text-black font-bold">Live Games</h1>
      <div className="flex border rounded-md flex-wrap justify-center">
        {(() => {
          const newMatches = matches.filter((match) => {
            if (localStorage.getItem(ISLOGGED)) {
              return (
                match.isRunning && preferredSports.includes(match.sportName)
              );
            } else {
              return match.isRunning;
            }
          });
          if (newMatches.length === 0) {
            return <p className="mx-auto my-auto font-semibold">No live matches available</p>;
          }
          return newMatches.map((match) => (
            <div key={match.id} className="bg-white border rounded-lg shadow-md p-4 m-2 max-w-sm w-full md:w-1/3 lg:w-1/4">
              <div className="flex w-full justify-between">
                <h1>{match.sportName}</h1>
                <button onClick={fetchMatchScores}>
                  <i className="bx bx-refresh text-xl"></i>
                </button>
              </div>
              <h1 className="text-sm font-bold">
                {match.name.split("at")[0]}
              </h1>
              <p className="text-gray-500 text-sm">{match.location}</p>
              <div className="mt-2">
                {match.teams.map((team) => (
                  <span key={team.id} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    {team.name}{" "}
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
          ));
        })()}
      </div>
    </div>
  )
}

export default LiveMatches