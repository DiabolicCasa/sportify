import { API_ENDPOINT } from "../../config/constants";
import { ActionTypes, MatchDispatch } from "./types"

export const fetchMatches = async(dispatch : MatchDispatch)   =>{

    try {
        const response = await fetch(
            `${API_ENDPOINT}/matches`,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
      
          if (!response.ok) {
            throw new Error("Failed to fetch tasks");
          }
      
          // extract the response body as JSON data
          const data = await response.json();
          dispatch({type : ActionTypes.FETCH_SUCCESS, payload : data['matches']})
    } catch (error) {
        console.error("Operation failed:", error);
    }
}  