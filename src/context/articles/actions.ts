import { API_ENDPOINT } from "../../config/constants";
import { ActionTypes, ArticleDispatch } from "./types"

export const fetchArticles = async(dispatch : ArticleDispatch)   =>{

    try {
        const response = await fetch(
            `${API_ENDPOINT}/articles`,
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
          dispatch({type : ActionTypes.FETCH_SUCCESS, payload : data})
    } catch (error) {
        console.error("Operation failed:", error);
    }
}  