import SearchAllAPI from "apis/search";
import { Dispatch } from "redux";
import { ActionTypes, PENDING, REJECTED, SEARCH_ALL } from "./contant";

export const searchAll =
  (key: {}) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      const { data: value } = await SearchAllAPI.searchAll(key);
      dispatch({ type: SEARCH_ALL, payload: value });
    } catch (error) {
      dispatch({ type: REJECTED });
    }
  };
