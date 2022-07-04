import IReply from "types/reply";

export const PENDING = "PENDING";
export const GET_REPLY = "GET_REPLY";
export const GET_REPLY_BY_ID_POST = "GET_REPLY_BY_ID_POST";
export const GET_REPLY_BY_ID_USER = "GET_REPLY_BY_ID_USER";
export const DELETE_REPLY = "DELETE_REPLY";
export const DELETE_ALL_REPLY = "DELETE_ALL_REPLY";

export const CREATE_REPLY = "CREATE_REPLY";
export const EDIT_REPLY = "EDIT_REPLY";
export const REJECTED = "REJECTED";

export type ActionTypes =
  | { type: typeof PENDING }
  | { type: typeof GET_REPLY; payload: IReply[] }
  | { type: typeof GET_REPLY_BY_ID_POST; payload: [] }
  | { type: typeof GET_REPLY_BY_ID_USER; payload: [] }
  | { type: typeof DELETE_REPLY; payload: string }
  | { type: typeof DELETE_ALL_REPLY }
  | { type: typeof CREATE_REPLY; payload: IReply }
  | { type: typeof EDIT_REPLY; payload: IReply }
  | { type: typeof REJECTED };
