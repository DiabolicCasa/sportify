import React from "react";

type Sport = {
    id: number;
    name: string;
  };
  
  type Team = {
    id: number;
    name: string;
  };
  
export type Article = {
    id: number;
    title: string;
    thumbnail: string;
    sport: Sport;
    date: string;
    summary: string;
    teams: Team[];
  };
  
export type State = {
    articles: Article[];
  };
  
export enum ActionTypes {
    FETCH_SUCCESS
}
export type Action =
    | { type: ActionTypes.FETCH_SUCCESS; payload: Article[] }
  
export type ArticleDispatch = React.Dispatch<Action>;
  
export const initialState: State = {
        articles: [],
};
      