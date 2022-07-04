import IUser from "types/user";

export const PENDING = "PENDING";
export const GET_USER = "GET_USER";
export const GET_USER_BY_ID = "GET_USER_BY_ID";
export const GET_USER_LOGIN = "GET_USER_LOGIN";
export const GET_USER_FOLLOW = "GET_USER_FOLLOW";
export const GET_QUATITY_USER = "GET_QUATITY_USER";

export const DELETE_USER = "DELETE_USER";
export const CREATE_USER = "CREATE_USER";
export const CREATE_LIST_USER = "CREATE_LIST_USER";

export const SEARCH_USER = "SEARCH_USER";
export const EDIT_USER = "EDIT_USER";
export const EDIT_A_USER = "EDIT_A_USER";
export const HANDLE_MARK = "HANDLE_MARK";
export const HANDLE_FOLLOW = "HANDLE_FOLLOW";

export const LOGIN = "LOGIN";
export const LOG_OUT = "LOG_OUT";
export const REJECTED = "REJECTED";
export const REJECTED_ADD_LIST = "REJECTED_ADD_LIST";

export const GET_NOTIFICATION = "GET_NOTIFICATION";
export const PUSH_NOTIFICATION = "PUSH_NOTIFICATION";
export const HANDLE_NOTIFICATION = "HANDLE_NOTIFICATION";

export type ActionTypes =
  | { type: typeof PENDING }
  | { type: typeof GET_USER; payload: IUser[] }
  | { type: typeof GET_USER_BY_ID; payload: IUser }
  | { type: typeof GET_USER_LOGIN; payload: IUser }
  | { type: typeof GET_USER_FOLLOW; payload: IUser[] }
  | { type: typeof GET_QUATITY_USER; payload: number }
  | { type: typeof DELETE_USER; payload: string }
  | { type: typeof CREATE_USER; payload: IUser }
  | { type: typeof CREATE_LIST_USER; payload: any[] }
  | { type: typeof SEARCH_USER; payload: IUser[] }
  | { type: typeof EDIT_USER; payload: IUser }
  | { type: typeof HANDLE_MARK; payload: IUser }
  | { type: typeof HANDLE_FOLLOW; payload: IUser }
  | { type: typeof EDIT_A_USER; payload: IUser }
  | { type: typeof LOGIN; payload: [] }
  | { type: typeof LOG_OUT }
  | { type: typeof REJECTED; payload?: any }
  | { type: typeof REJECTED_ADD_LIST; payload?: any }
  | { type: typeof GET_NOTIFICATION; payload: [] }
  | { type: typeof HANDLE_NOTIFICATION; payload: any }
  | { type: typeof PUSH_NOTIFICATION; payload: {} };
