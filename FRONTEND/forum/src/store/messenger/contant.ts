import IMessenger from "types/messenger";
import IMessengerUser from "types/messengerUser";

export const PENDING = "PENDING";
export const GET_MESSAGES_BY_USER = "GET_MESSAGES_BY_USER";
export const GET_MESSAGES_BY_ID = "GET_MESSAGES_BY_ID";
export const CREATE_MESSAGE = "CREATE_MESSAGE";
export const CREATE_REPLY_IN_MESSAGE = "CREATE_REPLY_IN_MESSAGE";
export const HANDLE_LIST_MESSAGE = "HANDLE_LIST_MESSAGE";
export const REJECTED = "REJECTED";

export type ActionTypes =
  | { type: typeof PENDING }
  | { type: typeof GET_MESSAGES_BY_USER; payload: IMessenger[] }
  | { type: typeof GET_MESSAGES_BY_ID; payload: IMessengerUser }
  | { type: typeof CREATE_MESSAGE }
  | { type: typeof CREATE_REPLY_IN_MESSAGE; payload: {} }
  | { type: typeof HANDLE_LIST_MESSAGE; payload: any }
  | { type: typeof REJECTED };
