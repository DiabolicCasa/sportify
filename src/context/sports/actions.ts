import { API_ENDPOINT } from "../../config/constants";
import { ActionTypes, SportDispatch } from "./types"

export const fetchSports = async(dispatch : SportDispatch)   =>{

    try {
        const response = await fetch(
            `${API_ENDPOINT}/sports`,
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
          dispatch({type : ActionTypes.FETCH_SUCCESS, payload : data['sports']})
    } catch (error) {
        console.error("Operation failed:", error);
    }
}  