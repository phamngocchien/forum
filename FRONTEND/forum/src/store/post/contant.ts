import IPost from "types/post";

export const PENDING = "PENDING";
export const GET_POST = "GET_POST";
export const GET_POST_BY_ID = "GET_POST_BY_ID";
export const GET_POST_BY_TITLE = "GET_POST_BY_TITLE";
export const GET_POST_BY_ADMIN = "GET_POST_BY_ADMIN";
export const GET_POST_BY_USER_ID = "GET_POST_BY_USER_ID";
export const GET_POST_BY_STUDENT_QUESTION = "GET_POST_BY_STUDENT_QUESTION";
export const GET_POST_BY_STUDENT_SHARE = "GET_POST_BY_STUDENT_SHARE";
export const GET_POST_BY_STUDENT_QUESTION_NOW =
  "GET_POST_BY_STUDENT_QUESTION_NOW";
export const GET_POST_BY_TRENDING = "GET_POST_BY_TRENDING";
export const GET_POST_BY_JOB = "GET_POST_BY_JOB";
export const GET_POST_BY_NEWEST = "GET_POST_BY_NEWEST";
export const GET_POST_BY_TAG_ID = "GET_POST_BY_TAG_ID";
export const GET_POST_BY_TAGS = "GET_POST_BY_TAGS";
export const GET_POST_BOOKMARK = "GET_POST_BOOKMARK";
export const HANDLE_VOTE = "HANDLE_VOTE";
export const HANDLE_VIEW = "HANDLE_VIEW";
export const DELETE_POST = "DELETE_POST";
export const CREATE_POST = "CREATE_POST";
export const GET_ANALYZE_POST_PER_MONTH = "GET_ANALYZE_POST_PER_MONTH";
export const EDIT_POST = "EDIT_POST";
export const FIND_POST = "FIND_POST";
export const FIND_POST_APPROVAL = "FIND_POST_APPROVAL";
export const GET_ANALYZE_POST = "GET_ANALYZE_POST";
export const HANDLE_IS_FINISH = "HANDLE_IS_FINISH";
export const HANDLE_POST_APPROVAL = "HANDLE_POST_APPROVAL";
export const REJECTED = "REJECTED";

export type ActionTypes =
  | { type: typeof PENDING }
  | { type: typeof GET_POST; payload: IPost[] }
  | { type: typeof GET_POST_BY_ADMIN; payload: IPost[] }
  | { type: typeof GET_POST_BY_TITLE; payload: string }
  | { type: typeof GET_POST_BY_STUDENT_QUESTION; payload: IPost[] }
  | { type: typeof GET_POST_BY_STUDENT_QUESTION_NOW; payload: IPost[] }
  | { type: typeof GET_POST_BY_STUDENT_SHARE; payload: IPost[] }
  | { type: typeof GET_POST_BY_TRENDING; payload: IPost[] }
  | { type: typeof GET_POST_BY_NEWEST; payload: IPost[] }
  | { type: typeof GET_POST_BY_USER_ID; payload: IPost[] }
  | { type: typeof GET_POST_BY_JOB; payload: IPost[] }
  | { type: typeof GET_ANALYZE_POST_PER_MONTH; payload: [] }
  | { type: typeof GET_ANALYZE_POST; payload: [] }
  | { type: typeof GET_POST_BY_ID; payload: IPost[] }
  | { type: typeof GET_POST_BY_TAG_ID; payload: IPost[] }
  | { type: typeof GET_POST_BY_TAGS; payload: IPost[] }
  | { type: typeof GET_POST_BOOKMARK; payload: IPost[] }
  | { type: typeof DELETE_POST; payload: string }
  | { type: typeof CREATE_POST; payload: IPost }
  | { type: typeof EDIT_POST; payload: string }
  | { type: typeof HANDLE_POST_APPROVAL; payload: string }
  | { type: typeof FIND_POST; payload: IPost[] }
  | { type: typeof HANDLE_VOTE; payload: IPost[] }
  | { type: typeof HANDLE_VIEW; payload: IPost }
  | { type: typeof FIND_POST_APPROVAL; payload: IPost[] }
  | { type: typeof HANDLE_IS_FINISH; payload: any }
  | { type: typeof REJECTED };
