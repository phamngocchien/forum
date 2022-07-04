import IDocumentType from "types/document-type";
import {
  ActionTypes,
  GET_DOCUMENT_TYPE,
  GET_DOCUMENT_TYPE_BY_ID,
  DOCUMENT_TYPE_CREATE,
  DOCUMENT_TYPE_UPDATE,
  PENDING,
  REJECTED,
  DOCUMENT_TYPE_DELETE,
  DOCUMENT_TYPE_SEARCH
} from "./contant";

interface IInitialState {
  loading: boolean;
  documenttypes: IDocumentType[];
  doctypeDetail: IDocumentType;
}
const initialState: IInitialState = {
  loading: false,
  documenttypes: [],
  doctypeDetail: {
    _id: "",
    name: "",
    files: [],
    createAt: "",
    updateAt: ""
  }
};

const DocumentTypeReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case PENDING:
      return { ...state, loading: true };
    case GET_DOCUMENT_TYPE:
      return { ...state, documenttypes: action.payload, loading: false };
    case GET_DOCUMENT_TYPE_BY_ID:
      return { ...state, doctypeDetail: action.payload, loading: false };
    case DOCUMENT_TYPE_CREATE:
      return {
        ...state,
        documenttypes: [...state.documenttypes, action.payload],
        loading: false
      };
    case DOCUMENT_TYPE_UPDATE: {
      const { payload } = action;
      const newDT = state.documenttypes.map((item: IDocumentType) => {
        if (item._id === payload._id) {
          return payload;
        }
        return item;
      });
      return {
        ...state,
        documenttypes: newDT,
        loading: false
      };
    }
    case DOCUMENT_TYPE_DELETE: {
      const filterDT = state.documenttypes.filter(
        (item) => item._id !== action.payload
      );
      return { ...state, documenttypes: filterDT, loading: false };
    }
    case DOCUMENT_TYPE_SEARCH:
      return { ...state, documenttypes: action.payload, loading: false };
    case REJECTED:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default DocumentTypeReducer;
