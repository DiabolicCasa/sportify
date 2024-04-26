import React from "react";
import Navbar from "../../components/Navbar";
import LiveMatches from "../../components/LiveMatches";
import { useMatchState } from "../../context/matches/MatchContext";


const MatchIndex : React.FC  = () =>{

    const {matches} = useMatchState()
return (

    <>
<Navbar/>
<div className=" w-5/6 mx-auto">
    <LiveMatches matches={matches}/>
</div>
    </>
)
}

export default MatchIndex;