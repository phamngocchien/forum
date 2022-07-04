import ITag from "types/tag";

export const PENDING = "PENDING";
export const GET_TAG = "GET_TAG";
export const GET_QUANTITY_TAG = "GET_QUANTITY_TAG";
export const GET_TAG_BY_ID = "GET_TAG_BY_ID";
export const DELETE_TAG = "DELETE_TAG";
export const CREATE_TAG = "CREATE_TAG";
export const EDIT_TAG = "EDIT_TAG";
export const SEARCH_TAG = "SEARCH_TAG";
export const REJECTED = "REJECTED";

export type ActionTypes =
  | { type: typeof PENDING }
  | { type: typeof GET_TAG; payload: ITag[] }
  | { type: typeof GET_TAG_BY_ID; payload: ITag }
  | { type: typeof GET_QUANTITY_TAG; payload: number }
  | { type: typeof DELETE_TAG; payload: string }
  | { type: typeof CREATE_TAG; payload: ITag }
  | { type: typeof EDIT_TAG; payload: ITag }
  | { type: typeof SEARCH_TAG; payload: ITag }
  | { type: typeof REJECTED; payload?: any };
