import { API_ENDPOINT } from "../../config/constants";
import { ActionTypes, TeamDispatch } from "./types"

export const fetchTeams = async(dispatch : TeamDispatch)   =>{

    try {
        const response = await fetch(
            `${API_ENDPOINT}/teams`,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
            console.log("Teams called")
          if (!response.ok) {
            throw new Error("Failed to fetch tasks");
          }
      
          // extract the response body as JSON data
          const data = await response.json();
          console.log(data.length)
          dispatch({type : ActionTypes.FETCH_SUCCESS, payload : data})
    } catch (error) {
        console.error("Operation failed:", error);
    }
}  