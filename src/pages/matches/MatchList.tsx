import React from "react";
import { Match } from "../../context/matches/types";
import MatchDiv from "./MatchDiv";
import { PREFERRED_SPORTS } from "../../config/constants";

type Props = {
  matches: Match[];
  openMatchModal: (item: Match) => void;
};

const MatchList: React.FC<Props> = ({ matches, openMatchModal }) => {
  const preferredSports = JSON.parse(localStorage.getItem(PREFERRED_SPORTS) || "[]");

  return (
    <div className="w-full border rounded p-4 m-2 shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {matches
          .filter((item) => preferredSports.includes(item.sportName))
          .map((item) => (
            <MatchDiv key={item.id} match={item} openMatchModal={openMatchModal} />
          ))}
      </div>
    </div>
  );
};

export default MatchList;
