import FileAPI from "apis/file";
import { Dispatch } from "redux";
import {
  ActionTypes,
  CREATE_FILE,
  DELETE_FILE,
  GET_FILES,
  GET_FILES_BY_DOC_TYPE,
  GET_QUANTITY_FILE,
  PENDING,
  REJECTED
} from "./contant";

export const getFiles = () => async (dispatch: Dispatch<ActionTypes>) => {
  dispatch({ type: PENDING });
  try {
    const { data: files } = await FileAPI.getFiles();
    dispatch({ type: GET_FILES, payload: files });
  } catch (error) {
    dispatch({ type: REJECTED });
  }
};

export const getQuantityOfFile =
  () => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      const { data: files } = await FileAPI.getQuantityOfFile();
      dispatch({ type: GET_QUANTITY_FILE, payload: files });
    } catch (error) {
      dispatch({ type: REJECTED });
    }
  };
export const getFilesByDoc =
  (idDoctype: string) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      const { data: files } = await FileAPI.getFileByCategory(idDoctype);
      dispatch({ type: GET_FILES_BY_DOC_TYPE, payload: files });
    } catch (error) {
      dispatch({ type: REJECTED });
    }
  };
export const createFile =
  (idCategory: string, item: any) =>
  async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      const { data: Files } = await FileAPI.createFile(idCategory, item);
      dispatch({ type: CREATE_FILE, payload: Files });
    } catch (error) {
      dispatch({ type: REJECTED });
    }
  };
export const deleteFile =
  (id: string) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      await FileAPI.deleteFile(id);
      dispatch({ type: DELETE_FILE, payload: id });
    } catch (error) {
      dispatch({ type: REJECTED });
    }
  };
