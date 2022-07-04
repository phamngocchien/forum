export const PENDING = "PENDING";
export const GET_FILES = "GET_FILES";
export const GET_QUANTITY_FILE = "GET_QUANTITY_FILE";

export const CREATE_FILE = "CREATE_FILE";
export const DELETE_FILE = "DELETE_FILE";
export const GET_FILES_BY_DOC_TYPE = "GET_FILES_BY_DOC_TYPE";
export const REJECTED = "REJECTED";

export type ActionTypes =
  | { type: typeof PENDING }
  | { type: typeof GET_FILES; payload: [] }
  | { type: typeof CREATE_FILE; payload: [] }
  | { type: typeof DELETE_FILE; payload: string }
  | { type: typeof GET_QUANTITY_FILE; payload: number }
  | { type: typeof GET_FILES_BY_DOC_TYPE; payload: [] }
  | { type: typeof REJECTED };
