import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import LiveMatches from "../../components/LiveMatches";
import { useMatchState } from "../../context/matches/MatchContext";
import MatchList from "./MatchList";
import { Match } from "../../context/matches/types";
import MatchModal from "./MatchModal";

const MatchIndex: React.FC = () => {
  const { matches } = useMatchState();

  const [isModalOpen, setOpenModal] = useState(false)
  const [currentMatch, setCurrentModalMatch] = useState<Match>(matches[0])
 
  const openMatchModal = (item : Match) =>{
    setCurrentModalMatch(item)
    setOpenModal(true)
  }

  const closeModal = () =>{
    setOpenModal(false)
  }
  return (
    <>
      <Navbar />
      <div className=" w-5/6 mx-auto">
        <LiveMatches matches={matches} />
        <MatchList openMatchModal={openMatchModal}  matches={matches} />
        <MatchModal closeModal={closeModal} isModalOpen={isModalOpen} match={currentMatch} />
      </div>
    </>
  );
};

export default MatchIndex;
