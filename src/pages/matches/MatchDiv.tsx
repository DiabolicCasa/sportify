import React from "react";
import { Match } from "../../context/matches/types";

type Props = {
  match: Match;
  openMatchModal: (item: Match) => void;
};

const MatchDiv: React.FC<Props> = ({ match, openMatchModal }) => {
  return (
    <div className="col-span-1 border p-4 shadow-md rounded-md">
      <div className="flex flex-col md:flex-row items-center">
        <h2 className="text-lg font-semibold md:mr-4 md:mb-0 mb-2">
          {match.sportName}
        </h2>
        {match.isRunning && (
          <h1 className="ml-0 md:ml-4 bg-red-500 text-sm text-white p-1 rounded">
            Live
          </h1>
        )}
      </div>

      <p className="flex items-center">
        <img
          className="mr-2"
          width={35}
          src="https://pic.onlinewebfonts.com/thumbnails/icons_418591.svg"
          alt="sport icon"
        />
        {match.name.split("at")[0]}
      </p>
      <p className="flex items-center">
        <strong>
          <i className="bx text-2xl mr-2 bxs-map"></i>
        </strong>{" "}
        {match.location}
      </p>

      <p className="flex items-center">
        <strong>
          <i className="bx bxs-time text-2xl mr-2"></i>
        </strong>{" "}
        {match.endsAt}
      </p>

      <button
        onClick={() => {
          openMatchModal(match);
        }}
        className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Read More
      </button>
    </div>
  );
};

export default MatchDiv;
