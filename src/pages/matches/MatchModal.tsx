import React, { useEffect, useState } from "react";
import { Match } from "../../context/matches/types";
import { API_ENDPOINT } from "../../config/constants";

interface MatchData {
  id: number;
  isRunning: boolean;
  name: string;
  location: string;
  startsAt: string;
  endsAt: string;
  score: {
    [team: string]: string;
  };
  teams: {
    id: number;
    name: string;
  }[];
  sportName: string;
  playingTeam: number;
  story: string;
}

type Props = {
  closeModal: () => void;
  match: Match;
  isModalOpen: boolean;
};

const MatchModal: React.FC<Props> = ({ isModalOpen, match, closeModal }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [matchData, setMatchData] = useState<MatchData>();

  useEffect(() => {
    if (isModalOpen) {
      setIsLoading(true);
      // Simulating API call with setTimeout
      setTimeout(() => {
        fetch(`${API_ENDPOINT}/matches/${match.id}`)
          .then((response) => response.json())
          .then((data) => {
            setMatchData(data);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
            setIsLoading(false);
          });
      }, 1000); // Simulating 1 second delay
    }
  }, [isModalOpen]);

  if(!isModalOpen){
    return null
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-x-hidden overflow-y-auto">
      <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
      <div className="bg-white w-full md:w-5/6 lg:w-1/2 xl:w-1/3 mx-auto p-4 rounded-lg shadow-lg z-50 max-h-full overflow-y-auto">
        <div className="flex justify-end">
          <button className="text-gray-500 hover:text-gray-700" onClick={closeModal}>
            <i className=' text-xl font-semibold text-white rounded-3xl px-2 py-1  bg-red-500 bx bx-x'></i>
          </button>
        </div>
        {isLoading ? (
          <div className="w-full flex justify-center m-10">
            <p className="font-semibold flex items-center mx-auto"><i className='mr-2 text-3xl bx bx-loader-alt bx-spin bx-rotate-90' ></i> Loading...</p>
          </div>
        ) : matchData ? (
          <>
            <h1 className="text-lg font-bold">{matchData.name}</h1>
            <p>{matchData.location}</p>
            <p>{matchData.sportName}</p>
            <p>Starts At: {new Date(matchData.startsAt).toLocaleString()}</p>
            <p>Ends At: {new Date(matchData.endsAt).toLocaleString()}</p>
            <h2 className="text-lg font-bold mt-4">Scores</h2>
            <p> 
              <span className="p-2 bg-gray-100 font-semibold text-gray-900 rounded-2xl m-2 shadow-md">{ `${matchData.teams[0].name} (${matchData.score[matchData.teams[0].name]})`} </span><br/><br/>
              <span className="p-2 bg-gray-100 font-semibold text-gray-900 rounded-2xl m-2 shadow-md">{ `${matchData.teams[1].name} (${matchData.score[matchData.teams[1].name]})`} </span>
            </p>
            <h2 className="text-lg font-bold mt-4">Story</h2>
            <p>{matchData.story}</p>
          </>
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
};

export default MatchModal;
