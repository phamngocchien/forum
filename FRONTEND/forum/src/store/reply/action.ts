import { Dispatch } from "redux";
import ReplyAPI from "apis/reply";
import IReply from "types/reply";
import {
  ActionTypes,
  CREATE_REPLY,
  DELETE_ALL_REPLY,
  DELETE_REPLY,
  EDIT_REPLY,
  GET_REPLY_BY_ID_POST,
  GET_REPLY_BY_ID_USER,
  PENDING,
  REJECTED
} from "./contant";

export const getReplyByIdPost =
  (id: string) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      const response = await ReplyAPI.getReplyByIdPost(id);
      dispatch({ type: GET_REPLY_BY_ID_POST, payload: response.data });
    } catch (error) {
      dispatch({ type: REJECTED });
    }
  };
export const getReplyByIdUser =
  (idUser: string) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      const response = await ReplyAPI.getReplyByUserId(idUser);
      dispatch({ type: GET_REPLY_BY_ID_USER, payload: response.data });
    } catch (error) {
      dispatch({ type: REJECTED });
    }
  };
export const addReply =
  (item: IReply) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      const response = await ReplyAPI.addReply(item);
      dispatch({ type: CREATE_REPLY, payload: response.data });
    } catch (error) {
      dispatch({ type: REJECTED });
    }
  };

export const editReply =
  (id: string, item: IReply) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      const response = await ReplyAPI.editReply(id, item);
      dispatch({ type: EDIT_REPLY, payload: response.data });
    } catch (error) {
      dispatch({ type: REJECTED });
    }
  };

export const deleteReply =
  (id: string) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      await ReplyAPI.removeReply(id);
      dispatch({ type: DELETE_REPLY, payload: id });
    } catch (error) {
      dispatch({ type: REJECTED });
    }
  };

export const deleteAllReply =
  (id: string) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      await ReplyAPI.removeAllReply(id);
      dispatch({ type: DELETE_ALL_REPLY });
    } catch (error) {
      dispatch({ type: REJECTED });
    }
  };
