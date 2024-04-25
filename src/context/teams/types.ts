import React from "react";

type Team = {
    id: number;
    name: string;
    plays : string
  };
  
 
  
export type Teams = Team[]

export type State = {
    teams: Teams;
};
  
export enum ActionTypes {
    FETCH_SUCCESS
}
export type Action =
    | { type: ActionTypes.FETCH_SUCCESS; payload: Teams }
  
export type TeamDispatch = React.Dispatch<Action>;
  
export const initialState: State = {
        teams: [],
};
      