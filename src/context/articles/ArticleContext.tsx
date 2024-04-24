import { createContext, ReactNode, useContext, useReducer } from "react";
import { ArticleDispatch, initialState, State } from "./types";
import { articleReducer } from "./reducer";

const ArticleStateContext = createContext<State | undefined>(undefined);
const ArticleDispatchContext = createContext<ArticleDispatch | undefined>(()=>{});


export const ArticleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(articleReducer, initialState);
  
    return (
      <ArticleStateContext.Provider value={state}>
        <ArticleDispatchContext.Provider value={dispatch}>
          {children}
        </ArticleDispatchContext.Provider>
      </ArticleStateContext.Provider>
    );
  };
  
  export const useArticleState = (): State => {
    const context = useContext(ArticleStateContext);
    if (context === undefined) {
      throw new Error('useArticleState must be used within a ArticleProvider');
    }
    return context;
  };
  
  export const useArticleDispatch = () => {
    const context = useContext(ArticleDispatchContext);
    if (context === undefined) {
      throw new Error('useArticleDispatch must be used within a ArticleProvider');
    }
    return context;
  };