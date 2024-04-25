import React from "react";


type Team = {
  id :number,
  name  : string
}
type Match  = {
  id : number,
  name  :  string,
  location :  string,
  sportName : string,
  endsAt : string,
  isRunning : boolean,
  teams : Team[],

}

export type State = {
    matches: Match[];
  };
  
export enum ActionTypes {
    FETCH_SUCCESS
}
export type Action =
    | { type: ActionTypes.FETCH_SUCCESS; payload: Match[] }
  
export type MatchDispatch = React.Dispatch<Action>;
  
export const initialState: State = {
        matches : [],
};
      

export type MatchSummary = {
  id: number;
  isRunning: boolean;
  name: string;
  location: string;
  startsAt: string;
  endsAt: string;
  score: { [teamName: string]: string };
  teams: { id: number; name: string }[];
  sportName: string;
  playingTeam: number;
  story: string;
};
