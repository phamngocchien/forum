import ITag from "types/tag";
import {
  ActionTypes,
  CREATE_TAG,
  GET_TAG,
  PENDING,
  REJECTED,
  DELETE_TAG,
  GET_TAG_BY_ID,
  EDIT_TAG,
  SEARCH_TAG,
  GET_QUANTITY_TAG
} from "./contant";

interface IInitialState {
  loading: boolean;
  tags: any;
  tagDetails: any;
  error: string;
  quantityTag: number;
}
const initialState: IInitialState = {
  loading: false,
  tags: [],
  error: "",
  tagDetails: [],
  quantityTag: 0
};

const TagsReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case PENDING:
      return { ...state, loading: true };
    case GET_TAG:
      return { ...state, tags: action.payload, loading: false };
    case GET_TAG_BY_ID:
      return { ...state, tagDetails: action.payload, loading: false };
    case GET_QUANTITY_TAG:
      return { ...state, quantityTag: action.payload, loading: false };
    case CREATE_TAG:
      return {
        ...state,
        tags: [...state.tags, action.payload],
        loading: false,
        error: ""
      };
    case SEARCH_TAG:
      return { ...state, tags: action.payload, loading: false };
    case DELETE_TAG: {
      const filterTag = state.tags.filter(
        (item: any) => item._id !== action.payload
      );
      return { ...state, tags: filterTag, loading: false };
    }
    case EDIT_TAG: {
      const { payload } = action;
      const newTags = state.tags.map((item: ITag) => {
        if (item._id === payload._id) {
          return action.payload;
        }
        return item;
      });
      return {
        ...state,
        tags: newTags,
        loading: false
      };
    }
    case REJECTED:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default TagsReducer;
