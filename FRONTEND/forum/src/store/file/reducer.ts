import {
  ActionTypes,
  CREATE_FILE,
  DELETE_FILE,
  GET_FILES,
  GET_FILES_BY_DOC_TYPE,
  GET_QUANTITY_FILE,
  PENDING,
  REJECTED
} from "./contant";

interface IInitialState {
  loading: boolean;
  files: any;
  quantityFile: number;
}
const initialState: IInitialState = {
  loading: false,
  files: [],
  quantityFile: 0
};

const FilesReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case PENDING:
      return { ...state, loading: true };
    case GET_FILES:
      return { ...state, files: action.payload, loading: false };
    case GET_FILES_BY_DOC_TYPE:
      return { ...state, files: action.payload, loading: false };
    case GET_QUANTITY_FILE:
      return { ...state, quantityFile: action.payload, loading: false };
    case CREATE_FILE:
      return {
        ...state,
        files: [...state.files, action.payload],
        loading: false
      };
    case DELETE_FILE: {
      const filterFile = state.files.filter(
        (item: any) => item._id !== action.payload
      );
      return { ...state, files: filterFile, loading: false };
    }
    case REJECTED:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default FilesReducer;
