import { Action, ActionTypes, State } from "./types";

export const sportReducer = (state: State, action: Action): State => {
    switch (action.type) {
      case ActionTypes.FETCH_SUCCESS:
        
      return {
        ...state,
        sports : action.payload
      }

      default:
        return state;
    }
};