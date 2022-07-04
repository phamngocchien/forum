import TagAPI from "apis/tag";
import { Dispatch } from "redux";
import ITag from "types/tag";
import {
  ActionTypes,
  GET_TAG,
  REJECTED,
  PENDING,
  CREATE_TAG,
  DELETE_TAG,
  GET_TAG_BY_ID,
  EDIT_TAG,
  GET_QUANTITY_TAG
} from "./contant";

export const getTags = () => async (dispatch: Dispatch<ActionTypes>) => {
  dispatch({ type: PENDING });
  try {
    const { data: tags } = await TagAPI.getAllTag();
    dispatch({ type: GET_TAG, payload: tags });
  } catch (error) {
    dispatch({ type: REJECTED });
  }
};

export const getQuantityOfTag =
  () => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      const { data: tags } = await TagAPI.getQuantityOfTag();
      dispatch({ type: GET_QUANTITY_TAG, payload: tags });
    } catch (error) {
      dispatch({ type: REJECTED });
    }
  };

export const searchTags =
  (keyword: {}) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      const { data: tags } = await TagAPI.searchTag(keyword);
      dispatch({ type: GET_TAG, payload: tags });
    } catch (error) {
      dispatch({ type: REJECTED });
    }
  };

export const addTag =
  (item: ITag) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      const response = await TagAPI.addTag(item);
      dispatch({ type: CREATE_TAG, payload: response.data });
    } catch (error) {
      dispatch({ type: REJECTED, payload: Object(error)?.response.data });
    }
  };

export const deleteTag =
  (id: string) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      await TagAPI.deleteTag(id);
      dispatch({ type: DELETE_TAG, payload: id });
    } catch (error) {
      dispatch({ type: REJECTED });
    }
  };

export const getTagById =
  (id: string) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      const { data: tag } = await TagAPI.getTagById(id);
      dispatch({ type: GET_TAG_BY_ID, payload: tag });
    } catch (error) {
      dispatch({ type: REJECTED });
    }
  };

export const editTag =
  (id: string, item: ITag) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      const response = await TagAPI.editTag(id, item);
      dispatch({ type: EDIT_TAG, payload: response.data });
    } catch (error) {
      dispatch({ type: REJECTED });
    }
  };
