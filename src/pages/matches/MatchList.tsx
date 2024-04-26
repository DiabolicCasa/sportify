import React from "react";
import { Match } from "../../context/matches/types";
import MatchDiv from "./MatchDiv";

type Props = {
  matches: Match[],
  
  openMatchModal : (item:Match)=>void
};

const MatchList: React.FC<Props> = ({ matches,openMatchModal }) => {
  return (
    <div className="w-full border rounded p-4 m-2 shadow-md">
      <div className="w-full grid grid-cols-3 gap-4">
      {
        matches.map((item)=>{
            return <MatchDiv openMatchModal={openMatchModal}   match={item}/>
        })
      }
      </div>
    </div>
  );
};

export default MatchList;
