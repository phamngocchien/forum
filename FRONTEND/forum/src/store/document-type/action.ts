import { Dispatch } from "redux";
import DocumentTypeAPI from "apis/document-type";
import {
  ActionTypes,
  GET_DOCUMENT_TYPE,
  GET_DOCUMENT_TYPE_BY_ID,
  DOCUMENT_TYPE_CREATE,
  DOCUMENT_TYPE_UPDATE,
  PENDING,
  REJECTED,
  DOCUMENT_TYPE_DELETE,
  DOCUMENT_TYPE_SEARCH
} from "./contant";

export const getDocumentTypes =
  () => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      const { data: posts } = await DocumentTypeAPI.getAllDocumentType();
      dispatch({ type: GET_DOCUMENT_TYPE, payload: posts });
    } catch (error) {
      dispatch({ type: REJECTED });
    }
  };

export const getDocTypeById =
  (id: string) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      const { data: doctype } = await DocumentTypeAPI.getDocTypeById(id);
      dispatch({ type: GET_DOCUMENT_TYPE_BY_ID, payload: doctype });
    } catch (error) {
      dispatch({ type: REJECTED });
    }
  };
export const addDocType =
  (item: {}) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      const response = await DocumentTypeAPI.addDocType(item);
      dispatch({ type: DOCUMENT_TYPE_CREATE, payload: response.data });
    } catch (error) {
      dispatch({ type: REJECTED, payload: Object(error)?.response.data });
    }
  };
export const updateDocType =
  (id: string, item: {}) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      const response = await DocumentTypeAPI.editDocType(id, item);
      dispatch({ type: DOCUMENT_TYPE_UPDATE, payload: response.data });
    } catch (error) {
      dispatch({ type: REJECTED });
    }
  };
export const deleteDocType =
  (id: string) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      await DocumentTypeAPI.deleteDocType(id);
      dispatch({ type: DOCUMENT_TYPE_DELETE, payload: id });
    } catch (error) {
      dispatch({ type: REJECTED });
    }
  };
export const searchDocType =
  (item: {}) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      const { data: types } = await DocumentTypeAPI.searchDocType(item);
      dispatch({ type: DOCUMENT_TYPE_SEARCH, payload: types });
    } catch (error) {
      dispatch({ type: REJECTED });
    }
  };
