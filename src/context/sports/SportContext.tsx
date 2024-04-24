import { createContext, ReactNode, useContext, useReducer } from "react";
import { SportDispatch, initialState, State } from "./types";
import { sportReducer } from "./reducer";

const SportStateContext = createContext<State | undefined>(undefined);
const SportDispatchContext = createContext<SportDispatch | undefined>(()=>{});


export const SportProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(sportReducer, initialState);
  
    return (
      <SportStateContext.Provider value={state}>
        <SportDispatchContext.Provider value={dispatch}>
          {children}
        </SportDispatchContext.Provider>
      </SportStateContext.Provider>
    );
  };
  
  export const useSportState = (): State => {
    const context = useContext(SportStateContext);
    if (context === undefined) {
      throw new Error('useArticleState must be used within a ArticleProvider');
    }
    return context;
  };
  
  export const useSportDispatch = () => {
    const context = useContext(SportDispatchContext);
    if (context === undefined) {
      throw new Error('useArticleDispatch must be used within a ArticleProvider');
    }
    return context;
  };