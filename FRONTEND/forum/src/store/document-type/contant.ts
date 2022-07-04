import IDocumentType from "types/document-type";

export const PENDING = "PENDING";
export const GET_DOCUMENT_TYPE = "GET_DOCUMENT_TYPE";
export const GET_DOCUMENT_TYPE_BY_ID = "GET_DOCUMENT_TYPE_BY_ID";
export const DOCUMENT_TYPE_CREATE = "DOCUMENT_TYPE_CREATE";
export const DOCUMENT_TYPE_UPDATE = "DOCUMENT_TYPE_UPDATE";
export const DOCUMENT_TYPE_DELETE = "DOCUMENT_TYPE_DELETE";
export const DOCUMENT_TYPE_SEARCH = "DOCUMENT_TYPE_SEARCH";

export const REJECTED = "REJECTED";

export type ActionTypes =
  | { type: typeof PENDING }
  | { type: typeof GET_DOCUMENT_TYPE; payload: IDocumentType[] }
  | { type: typeof GET_DOCUMENT_TYPE_BY_ID; payload: IDocumentType }
  | { type: typeof DOCUMENT_TYPE_CREATE; payload: IDocumentType }
  | { type: typeof DOCUMENT_TYPE_UPDATE; payload: IDocumentType }
  | { type: typeof DOCUMENT_TYPE_DELETE; payload: string }
  | { type: typeof DOCUMENT_TYPE_SEARCH; payload: IDocumentType[] }
  | { type: typeof REJECTED };
