import MessengerAPI from "apis/messenger";
import { Dispatch } from "redux";
import {
  ActionTypes,
  CREATE_REPLY_IN_MESSAGE,
  GET_MESSAGES_BY_ID,
  GET_MESSAGES_BY_USER,
  HANDLE_LIST_MESSAGE,
  PENDING,
  REJECTED
} from "./contant";

export const getMessagesByUser =
  (id: string) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      const { data: messages } = await MessengerAPI.getMessages(id);

      dispatch({ type: GET_MESSAGES_BY_USER, payload: messages });
    } catch (error) {
      dispatch({ type: REJECTED });
    }
  };

export const getMessagesById =
  (id: string) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      const { data: messages } = await MessengerAPI.getMessagesById(id);

      dispatch({ type: GET_MESSAGES_BY_ID, payload: messages });
    } catch (error) {
      dispatch({ type: REJECTED });
    }
  };

export const createMessenger =
  (item: {}) => async (dispatch: Dispatch<ActionTypes>) => {
    await MessengerAPI.createMessage(item);
  };

export const createReplyInMessage =
  (item: any) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: CREATE_REPLY_IN_MESSAGE, payload: item });
  };

export const handleListMessage =
  (id: any, item: any) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: HANDLE_LIST_MESSAGE, payload: { id, item } });
  };
