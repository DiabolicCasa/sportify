import React from "react";

export type Sport = {
    id: number;
    name: string;
  };
  

  
export type State = {
    sports: Sport[];
  };
  
export enum ActionTypes {
    FETCH_SUCCESS
}
export type Action =
    | { type: ActionTypes.FETCH_SUCCESS; payload: Sport[] }
  
export type SportDispatch = React.Dispatch<Action>;
  
export const initialState: State = {
        sports : [],
};
      