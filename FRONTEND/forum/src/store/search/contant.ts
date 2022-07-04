export const PENDING = "PENDING";
export const SEARCH_ALL = "SEARCH_ALL";
export const REJECTED = "REJECTED";

export type ActionTypes =
  | { type: typeof PENDING }
  | { type: typeof SEARCH_ALL; payload: [] }
  | { type: typeof REJECTED };
