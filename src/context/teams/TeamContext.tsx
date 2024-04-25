/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useContext, useReducer } from "react";
import { TeamDispatch, initialState, State } from "./types";
import { teamReducer } from "./reducer";

const TeamStateContext = createContext<State | undefined>(undefined);
const TeamDispatchContext = createContext<TeamDispatch | undefined>(()=>{});


export const TeamProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(teamReducer, initialState);
  
    return (
      <TeamStateContext.Provider value={state}>
        <TeamDispatchContext.Provider value={dispatch}>
          {children}
        </TeamDispatchContext.Provider>
      </TeamStateContext.Provider>
    );
  };
  
  export const useTeamState = (): State => {
    const context = useContext(TeamStateContext);
    if (context === undefined) {
      throw new Error('useArticleState must be used within a ArticleProvider');
    }
    return context;
  };
  
  export const useTeamDispatch = () => {
    const context = useContext(TeamDispatchContext);
    if (context === undefined) {
      throw new Error('useArticleDispatch must be used within a ArticleProvider');
    }
    return context;
  };