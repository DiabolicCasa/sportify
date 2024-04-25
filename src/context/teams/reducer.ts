import { Action, ActionTypes, State } from "./types";

export const teamReducer = (state: State, action: Action): State => {
    switch (action.type) {
      case ActionTypes.FETCH_SUCCESS:
        
      return {
        ...state,
        teams : action.payload
      }

      default:
        return state;
    }
};