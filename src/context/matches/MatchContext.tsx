import { createContext, ReactNode, useContext, useReducer } from "react";
import { MatchDispatch, initialState, State } from "./types";
import { sportReducer } from "./reducer";

const MatchStateContext = createContext<State | undefined>(undefined);
const MatchDispatchContext = createContext<MatchDispatch | undefined>(()=>{});


export const MatchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(sportReducer, initialState);
  
    return (
      <MatchStateContext.Provider value={state}>
        <MatchDispatchContext.Provider value={dispatch}>
          {children}
        </MatchDispatchContext.Provider>
      </MatchStateContext.Provider>
    );
  };
  
  export const useMatchState = (): State => {
    const context = useContext(MatchStateContext);
    if (context === undefined) {
      throw new Error('useArticleState must be used within a ArticleProvider');
    }
    return context;
  };
  
  export const useMatchDispatch = () => {
    const context = useContext(MatchDispatchContext);
    if (context === undefined) {
      throw new Error('useArticleDispatch must be used within a ArticleProvider');
    }
    return context;
  };